import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function PlaylistScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Gestion des playlists 📂</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000"
    },
    text: {
        color: "gold",
        fontSize: 20,
        fontWeight: "bold"
    }
});
