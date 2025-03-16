import React, { useEffect, useContext, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { AudioContext } from "../context/AudioContext";

interface PlaylistScreenProps {
    activeIndex: number;
    onSelectAudio: (audio: any) => void; // Fonction pour gérer la sélection d'un fichier audio
}

const PlaylistScreen = ({ activeIndex, onSelectAudio }: PlaylistScreenProps) => {
    const { audioFiles, permissionGranted } = useContext(AudioContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (permissionGranted) {
            setLoading(false);
        }
    }, [audioFiles]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>🎶 Local Music</Text>

            {loading ? (
                <ActivityIndicator size="large" color="#FFD700" />
            ) : audioFiles.length === 0 ? (
                <Text style={styles.noMusicText}>No music found.</Text>
            ) : (
                <FlatList
                    data={audioFiles}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.audioItem} onPress={() => onSelectAudio(item)}>
                            <Text style={styles.audioTitle}>{item.filename}</Text>
                        </TouchableOpacity>
                    )}
                />
            )}

            {/* Indicateurs de Navigation */}
            <View style={styles.pagination}>
                <View style={[styles.paginationDot, activeIndex === 0 ? styles.inactiveDot : styles.inactiveDot]} />
                <View style={[styles.paginationDot, activeIndex === 1 ? styles.activeDot : styles.inactiveDot]} />
                <View style={[styles.paginationDot, activeIndex === 2 ? styles.inactiveDot : styles.inactiveDot]} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#FFD700",
        marginBottom: 20,
        textAlign: "center",
    },
    noMusicText: {
        color: "#b3b3b3",
        fontSize: 16,
        textAlign: "center",
        marginTop: 20,
    },
    audioItem: {
        backgroundColor: "#222",
        padding: 15,
        marginVertical: 8,
        borderRadius: 8,
    },
    audioTitle: {
        color: "#FFF",
        fontSize: 16,
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

export default PlaylistScreen;
