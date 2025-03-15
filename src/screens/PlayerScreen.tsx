import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const PlayerScreen = () => {
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>🎵 Titre de la Musique</Text>
            <Text style={styles.artist}>Artiste inconnu</Text>

            <View style={styles.controls}>
                <TouchableOpacity>
                    <Ionicons name="play-skip-back-outline" size={40} color="white" />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setIsPlaying(!isPlaying)}>
                    <Ionicons name={isPlaying ? "pause-circle" : "play-circle"} size={80} color="#FFD700" />
                </TouchableOpacity>

                <TouchableOpacity>
                    <Ionicons name="play-skip-forward-outline" size={40} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
        alignItems: "center",
        justifyContent: "center",
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
    controls: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        width: "80%",
    },
});

export default PlayerScreen;
