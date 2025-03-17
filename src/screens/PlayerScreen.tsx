import React, { useState, useEffect, useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import Slider from "@react-native-community/slider";
import { Ionicons } from "@expo/vector-icons";
import { Audio } from "expo-av";
import { AudioContext } from "../context/AudioContext";
import { useRoute } from "@react-navigation/native";

import coverImage from '../assets/images/cover_image.jpg'; 

interface PlayerScreenProps {
    activeIndex?: number;
}

const PlayerScreen = ({ activeIndex }: PlayerScreenProps) => {
    const { audioFiles } = useContext(AudioContext);
    const route = useRoute();
    const initialTrackIndex = route.params?.trackIndex || 0;

    const [sound, setSound] = useState<Audio.Sound | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(1);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(initialTrackIndex);

    // Gestion des favoris
    const [favorites, setFavorites] = useState<number[]>([]); // Tableau d'index de chansons favorites

    useEffect(() => {
        loadAndPlayAudio(initialTrackIndex);
        return () => {
            if (sound) {
                sound.unloadAsync();
            }
        };
    }, [initialTrackIndex]);

    const loadAndPlayAudio = async (index: number) => {
        if (audioFiles.length === 0) return;

        try {
            if (sound) {
                await sound.unloadAsync();
            }

            const { sound: newSound, status } = await Audio.Sound.createAsync(
                { uri: audioFiles[index].uri },
                { shouldPlay: true },
                onPlaybackStatusUpdate
            );

            setSound(newSound);
            setIsPlaying(true);
            setDuration(status.durationMillis || 1);
            setCurrentTrackIndex(index);
        } catch (error) {
            console.log("Erreur lors du chargement de l'audio :", error);
        }
    };

    const onPlaybackStatusUpdate = (status: any) => {
        if (status.isLoaded) {
            setCurrentTime(status.positionMillis || 0);
            setDuration(status.durationMillis || 1);
            setIsPlaying(status.isPlaying);

            if (status.didJustFinish) {
                playNextTrack();
            }
        } else {
            console.log("Audio non chargé :", status);
        }
    };

    const togglePlayPause = async () => {
        if (!sound) {
            await loadAndPlayAudio(currentTrackIndex);
            return;
        }

        try {
            if (isPlaying) {
                await sound.pauseAsync();
            } else {
                await sound.playAsync();
            }
            setIsPlaying(!isPlaying);
        } catch (error) {
            console.log("Erreur lors du changement de lecture :", error);
        }
    };

    const playNextTrack = () => {
        if (audioFiles.length === 0) return;
        const nextIndex = (currentTrackIndex + 1) % audioFiles.length;
        loadAndPlayAudio(nextIndex);
    };

    const playPreviousTrack = () => {
        if (audioFiles.length === 0) return;
        const prevIndex = currentTrackIndex - 1 < 0 ? audioFiles.length - 1 : currentTrackIndex - 1;
        loadAndPlayAudio(prevIndex);
    };

    const handleSliderChange = async (value: number) => {
        if (sound) {
            await sound.setPositionAsync(value);
        }
    };

    // Fonction pour ajouter ou enlever un favori
    const toggleFavorite = () => {
        setFavorites((prevFavorites) => {
            if (prevFavorites.includes(currentTrackIndex)) {
                return prevFavorites.filter((index) => index !== currentTrackIndex);
            } else {
                return [...prevFavorites, currentTrackIndex];
            }
        });
    };

    return (
        <View style={styles.container}>
            {/* Image de couverture de la chanson */}
            <Image
                source={coverImage} // Local image
                style={styles.coverImage}
            />

            <Text style={styles.title}>{audioFiles[currentTrackIndex]?.filename || "No Track"}</Text>
            <Text style={styles.artist}>Unknown Artist</Text>

            <View style={styles.timeContainer}>
                <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
                <Text style={styles.timeText}>{formatTime(duration)}</Text>
            </View>

            <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={duration}
                value={currentTime}
                onSlidingComplete={handleSliderChange}
                minimumTrackTintColor="#FFD700"
                maximumTrackTintColor="#b3b3b3"
                thumbTintColor="#FFD700"
            />

            <View style={styles.controls}>
                <TouchableOpacity onPress={playPreviousTrack}>
                    <Ionicons name="play-skip-back-outline" size={40} color="white" />
                </TouchableOpacity>

                <TouchableOpacity onPress={togglePlayPause}>
                    <Ionicons name={isPlaying ? "pause-circle" : "play-circle"} size={80} color="#FFD700" />
                </TouchableOpacity>

                <TouchableOpacity onPress={playNextTrack}>
                    <Ionicons name="play-skip-forward-outline" size={40} color="white" />
                </TouchableOpacity>
            </View>

            {/* Icone des favoris */}
            <TouchableOpacity onPress={toggleFavorite} style={styles.favoriteButton}>
                <Ionicons
                    name={favorites.includes(currentTrackIndex) ? "heart" : "heart-outline"}
                    size={30}
                    color="#FFD700"
                />
            </TouchableOpacity>
        </View>
    );
};

const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 20,
    },
    coverImage: {
        width: "100%",
        height: 200,
        borderRadius: 10,
        marginBottom: 30,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#FFD700",
        marginBottom: 10,
    },
    artist: {
        fontSize: 18,
        color: "white",
        marginBottom: 30,
    },
    timeContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        paddingHorizontal: 10,
    },
    timeText: {
        color: "white",
        fontSize: 14,
    },
    slider: {
        width: "80%",
        height: 40,
        marginBottom: 30,
    },
    controls: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        width: "80%",
    },
    pagination: {
        position: "absolute",
        bottom: 20,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
    },
    paginationDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        marginHorizontal: 5,
    },
    activeDot: {
        backgroundColor: "#FFD700",
        width: 14,
        height: 14,
    },
    inactiveDot: {
        backgroundColor: "#fff",
    },
    favoriteButton: {
        position: 'absolute',
        bottom: 230,
        right: 20,
    },
});

export default PlayerScreen;
