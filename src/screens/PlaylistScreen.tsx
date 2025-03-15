import React, { useState, useEffect, useContext } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from "react-native";
import * as MediaLibrary from "expo-media-library";
import { AudioContext } from "../context/AudioContext";

const PlaylistScreen = () => {
    const { permissionGranted } = useContext(AudioContext);
    const [audioFiles, setAudioFiles] = useState<any[]>([]);

    useEffect(() => {
        if (permissionGranted) {
            getAudioFiles();
        }
    }, [permissionGranted]);

    const getAudioFiles = async () => {
        try {
            const { status } = await MediaLibrary.requestPermissionsAsync();
            if (status !== "granted") {
                Alert.alert("Permission refusée", "Impossible d'accéder aux fichiers audio.");
                return;
            }
            //  récupère uniquement les fichiers audio et limité le nombre maximum de fichiers récupérés
            let media = await MediaLibrary.getAssetsAsync({
                mediaType: "audio",
                first: 1000,
            });
            // Stocke la liste des fichiers audio
            setAudioFiles(media.assets);
        } catch (error) {
            console.error("Erreur lors de la récupération des fichiers audio", error);
            Alert.alert("Erreur", "Une erreur est survenue lors de la récupération des fichiers audio.");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>🎶 Musiques Locales</Text>
            <FlatList
                data={audioFiles}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.audioItem}>
                        <Text style={styles.audioTitle}>{item.filename}</Text>
                    </TouchableOpacity>
                )}
            />
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
});

export default PlaylistScreen;