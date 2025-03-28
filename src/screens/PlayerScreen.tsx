import React, { useState, useEffect, useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import Slider from "@react-native-community/slider";
import { Ionicons } from "@expo/vector-icons";
import { Audio } from "expo-av";
import { AudioContext } from "../context/AudioContext";
import { useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const coverImage = require("../assets/images/cover_image.jpg");

// Définition manuelle des constantes si elles ne sont plus exportées par expo-av
const INTERRUPTION_MODE_IOS_DO_NOT_MIX = 1;
const INTERRUPTION_MODE_ANDROID_DO_NOT_MIX = 1;

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
  const [favorites, setFavorites] = useState<any[]>([]);

  // Configure le mode audio pour continuer en arrière-plan (Android)
  useEffect(() => {
    async function setAudioMode() {
      try {
        await Audio.setAudioModeAsync({
          staysActiveInBackground: true,
          playsInSilentModeIOS: true,
          interruptionModeIOS: INTERRUPTION_MODE_IOS_DO_NOT_MIX,
          shouldDuckAndroid: false,
          interruptionModeAndroid: INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
          playThroughEarpieceAndroid: false,
        });
      } catch (error) {
        console.log("Erreur lors de la configuration du mode audio :", error);
      }
    }
    setAudioMode();
  }, []);

  useEffect(() => {
    loadAndPlayAudio(initialTrackIndex);
    loadFavorites();
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
    const prevIndex =
      currentTrackIndex - 1 < 0 ? audioFiles.length - 1 : currentTrackIndex - 1;
    loadAndPlayAudio(prevIndex);
  };

  const handleSliderChange = async (value: number) => {
    if (sound) {
      await sound.setPositionAsync(value);
    }
  };

  // Charger les favoris depuis AsyncStorage
  const loadFavorites = async () => {
    try {
      const favJSON = await AsyncStorage.getItem("favorites");
      if (favJSON) {
        setFavorites(JSON.parse(favJSON));
      }
    } catch (error) {
      console.log("Erreur lors du chargement des favoris :", error);
    }
  };

  // Fonction pour ajouter ou enlever un favori et le sauvegarder dans AsyncStorage
  const toggleFavorite = async () => {
    const currentSong = audioFiles[currentTrackIndex];
    const isFav = favorites.find((fav) => fav.id === currentSong.id);
    let updatedFavorites;
    if (isFav) {
      updatedFavorites = favorites.filter((fav) => fav.id !== currentSong.id);
    } else {
      updatedFavorites = [...favorites, currentSong];
    }
    setFavorites(updatedFavorites);
    try {
      await AsyncStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    } catch (error) {
      console.log("Erreur lors de la sauvegarde des favoris :", error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Image de couverture de la chanson */}
      <Image source={coverImage} style={styles.coverImage} />

      <Text style={styles.title}>
        {audioFiles[currentTrackIndex]?.filename || "No Track"}
      </Text>
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
          <Ionicons
            name={isPlaying ? "pause-circle" : "play-circle"}
            size={80}
            color="#FFD700"
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={playNextTrack}>
          <Ionicons name="play-skip-forward-outline" size={40} color="white" />
        </TouchableOpacity>
      </View>

      {/* Icône des favoris */}
      <TouchableOpacity onPress={toggleFavorite} style={styles.favoriteButton}>
        <Ionicons
          name={
            favorites.find((fav) => fav.id === audioFiles[currentTrackIndex].id)
              ? "heart"
              : "heart-outline"
          }
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
    marginBottom: 10,
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
    marginBottom: 10,
  },
  controls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "80%",
  },
  favoriteButton: {
    position: "absolute",
    bottom: 200,
    right: 20,
  },
});

export default PlayerScreen;
