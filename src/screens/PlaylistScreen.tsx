import React, { useState, useEffect, useContext } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from "react-native";
import * as MediaLibrary from "expo-media-library";
import { AudioContext } from "../context/AudioContext";
interface PlayListScreenProps {
    activeIndex: number;
}
const PlaylistScreen = ({ activeIndex }:PlayListScreenProps) => {
    const { permissionGranted } = useContext(AudioContext);
    const [audioFiles, setAudioFiles] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (permissionGranted) {
            getAudioFiles();
        }
    }, [permissionGranted]);

    const getAudioFiles = async () => {
        try {
            setLoading(true);
            let media = await MediaLibrary.getAssetsAsync({
                mediaType: "audio",
                first: 1000,
            });

            setAudioFiles(media.assets);
        } catch (error) {
            console.error("Erreur lors de la récupération des fichiers audio", error);
            Alert.alert("Erreur", "Une erreur est survenue lors de la récupération des fichiers audio.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>🎶 Local music</Text>

            {loading ? (
                <ActivityIndicator size="large" color="#FFD700" />
            ) : audioFiles.length === 0 ? (
                <Text style={styles.noMusicText}>No music found.</Text>
            ) : (
                <FlatList
                    data={audioFiles}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.audioItem}>
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
