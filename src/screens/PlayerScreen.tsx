import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Slider from "@react-native-community/slider";
import { Ionicons } from "@expo/vector-icons";
interface PlayerScreenProps {
    activeIndex: number;
}
const PlayerScreen = ({ activeIndex }: PlayerScreenProps) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(240);

    const togglePlayPause = () => {
        setIsPlaying(!isPlaying);
    };

    const handleSliderChange = (value: number) => {
        setCurrentTime(value);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>🎵 Music title</Text>
            <Text style={styles.artist}>Unknown artist</Text>

            {/* Affichage du temps */}
            <View style={styles.timeContainer}>
                <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
                <Text style={styles.timeText}>{formatTime(duration)}</Text>
            </View>

            {/* Slider de progression */}
            <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={duration}
                value={currentTime}
                onValueChange={handleSliderChange}
                minimumTrackTintColor="#FFD700"
                maximumTrackTintColor="#b3b3b3"
                thumbTintColor="#FFD700"
            />

            {/* Contrôles */}
            <View style={styles.controls}>
                <TouchableOpacity>
                    <Ionicons name="play-skip-back-outline" size={40} color="white" />
                </TouchableOpacity>

                <TouchableOpacity onPress={togglePlayPause}>
                    <Ionicons name={isPlaying ? "pause-circle" : "play-circle"} size={80} color="#FFD700" />
                </TouchableOpacity>

                <TouchableOpacity>
                    <Ionicons name="play-skip-forward-outline" size={40} color="white" />
                </TouchableOpacity>
            </View>

            {/* Indicateurs de navigation */}
            <View style={styles.pagination}>
                <View style={[styles.paginationDot, activeIndex === 0 ? styles.activeDot : styles.inactiveDot]} />
                <View style={[styles.paginationDot, activeIndex === 1 ? styles.activeDot : styles.inactiveDot]} />
                <View style={[styles.paginationDot, activeIndex === 2 ? styles.activeDot : styles.inactiveDot]} />
            </View>
        </View>
    );
};

// Formater le temps de manière lisible
const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
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
});

export default PlayerScreen;
