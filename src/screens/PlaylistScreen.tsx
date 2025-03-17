import React, { useEffect, useContext, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, TextInput } from "react-native";
import { AudioContext } from "../context/AudioContext";
import { useNavigation } from "@react-navigation/native";

interface PlaylistScreenProps {
    activeIndex?: number;
}

const PlaylistScreen: React.FC<PlaylistScreenProps> = ({ activeIndex }) => {
    const { audioFiles } = useContext(AudioContext);
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState(""); // Etat pour le texte de recherche
    const [filteredAudioFiles, setFilteredAudioFiles] = useState(audioFiles); // Etat pour les fichiers audio filtrés
    const navigation = useNavigation();

    useEffect(() => {
        if (audioFiles.length > 0) {
            setLoading(false);
        }
    }, [audioFiles]);

    // Filtrer les fichiers audio en fonction du texte de recherche
    useEffect(() => {
        if (searchText === "") {
            setFilteredAudioFiles(audioFiles);
        } else {
            const filtered = audioFiles.filter(item =>
                item.filename.toLowerCase().includes(searchText.toLowerCase())
            );
            setFilteredAudioFiles(filtered);
        }
    }, [searchText, audioFiles]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>🎶 Local Music</Text>

            {/* Champ de Recherche */}
            <TextInput
                style={styles.searchInput}
                placeholder="Search Songs..."
                placeholderTextColor="#b3b3b3"
                value={searchText}
                onChangeText={setSearchText} // Mettre à jour l'état du texte de recherche
            />

            {loading ? (
                <ActivityIndicator size="large" color="#FFD700" />
            ) : filteredAudioFiles.length === 0 ? (
                <Text style={styles.noMusicText}>No music found.</Text>
            ) : (
                <FlatList
                    data={filteredAudioFiles}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity
                            style={styles.audioItem}
                            onPress={() => navigation.navigate("Player", { trackIndex: index })}
                        >
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
        padding: 20
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#FFD700",
        marginBottom: 20,
        textAlign: "center"
    },
    searchInput: {
        width: "85%",
        height: 50,
        backgroundColor: "#fff",
        borderRadius: 25,
        paddingLeft: 20,
        fontSize: 16,
        color: "#000",
        marginBottom: 20, // Ajouter un espacement pour le champ de recherche
    },
    noMusicText: {
        color: "#b3b3b3",
        fontSize: 16,
        textAlign: "center",
        marginTop: 20
    },
    audioItem: {
        backgroundColor: "#222",
        padding: 15,
        marginVertical: 8,
        borderRadius: 8
    },
    audioTitle: {
        color: "#FFF",
        fontSize: 16
    },
    pagination: {
        position: "absolute",
        bottom: 20,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: "100%"
    },
    paginationDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        marginHorizontal: 5
    },
    activeDot: {
        backgroundColor: "#FFD700",
        width: 14,
        height: 14
    },
    inactiveDot: {
        backgroundColor: "#fff"
    },
});

export default PlaylistScreen;
