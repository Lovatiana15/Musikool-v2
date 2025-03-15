import React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native";

export default function HomeScreen() {
    return (
        <View style={styles.container}>
            {/* En-tête : Titre et Description */}
            <View style={styles.header}>
                <Text style={styles.title}>Find Your Music</Text>
                <Text style={styles.description}>Explore your favorite music, artists, and playlists.</Text>
            </View>

            {/* Champ de Recherche */}
            <TextInput
                style={styles.searchInput}
                placeholder="Artist, Song or Playlist..."
                placeholderTextColor="#b3b3b3"
            />

            {/* Section des Boutons Circulaires */}
            <View style={styles.buttonsContainer}>
                <TouchableOpacity style={[styles.button, styles.newSong]}>
                    <Text style={styles.buttonText}>New Song</Text>
                    <Text style={styles.buttonDescription}>Discover new songs</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.playlist]}>
                    <Text style={styles.buttonText}>Playlist</Text>
                    <Text style={styles.buttonDescription}>Your favorite playlists</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity style={[styles.button, styles.favorite]}>
                    <Text style={styles.buttonText}>Favorite</Text>
                    <Text style={styles.buttonDescription}>Saved songs</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.pop]}>
                    <Text style={styles.buttonText}>Pop</Text>
                    <Text style={styles.buttonDescription}>Top Pop songs</Text>
                </TouchableOpacity>
            </View>

            {/* Indicateurs de Navigation */}
            <View style={styles.pagination}>
                <View style={[styles.paginationDot, styles.activeDot]} />
                <View style={styles.paginationDot} />
                <View style={styles.paginationDot} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 50,
    },
    header: {
        alignItems: "center",
        marginBottom: 30,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#FFD700",
    },
    description: {
        fontSize: 16,
        color: "#b3b3b3",
        marginTop: 5,
    },
    searchInput: {
        width: "80%",
        height: 50,
        backgroundColor: "#fff",
        borderRadius: 25,
        paddingLeft: 20,
        marginBottom: 30,
        fontSize: 16,
        color: "#000",
    },
    buttonsContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",
        marginBottom: 20,
    },
    button: {
        justifyContent: "center",
        alignItems: "center",
        width: 120,
        height: 120,
        borderRadius: 60,
        marginHorizontal: 10
    },
    buttonText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#000",
    },
    buttonDescription: {
        fontSize: 12,
        color: "#333",
        marginTop: 5,
    },
    newSong: {
        backgroundColor: "#FFC107",
    },
    playlist: {
        backgroundColor: "#DAA520",
    },
    favorite: {
        backgroundColor: "#DAA520",
    },
    pop: {
        backgroundColor: "#FFC107",
    },
    pagination: {
        flexDirection: "row",
        marginBottom: 20,
    },
    paginationDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: "#fff",
        marginHorizontal: 5,
    },
    activeDot: {
        width: 14,
        height: 14,
        backgroundColor: "#FFD700",
    },
});
