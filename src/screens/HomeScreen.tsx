import React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
interface HomeScreenProps {
    activeIndex: number;
}
export default function HomeScreen({ activeIndex }: HomeScreenProps) {
    return (
        <ScrollView contentContainerStyle={styles.container}>
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
                <View style={[styles.paginationDot, activeIndex === 0 ? styles.activeDot : styles.inactiveDot]} />
                <View style={[styles.paginationDot, activeIndex === 1 ? styles.activeDot : styles.inactiveDot]} />
                <View style={[styles.paginationDot, activeIndex === 2 ? styles.activeDot : styles.inactiveDot]} />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: "#000",
        alignItems: "center",
        paddingTop: 50,
        paddingBottom: 20,
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
        textAlign: "center",
        paddingHorizontal: 20,
    },
    searchInput: {
        width: "85%",
        height: 50,
        backgroundColor: "#fff",
        borderRadius: 25,
        paddingLeft: 20,
        fontSize: 16,
        color: "#000",
        marginBottom: 30,
    },
    buttonsContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    button: {
        justifyContent: "center",
        alignItems: "center",
        width: 120,
        height: 120,
        borderRadius: 60,
        marginHorizontal: 10,
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
        textAlign: "center",
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
