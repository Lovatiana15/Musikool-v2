import React, { useContext } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { AudioContext } from "../context/AudioContext";

export default function HomeScreen() {
    const { audioFiles, permissionGranted } = useContext(AudioContext);

    if (!permissionGranted) {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Permission non accordée 📵</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>🎵 Musiques disponibles</Text>
            <FlatList
                data={audioFiles}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.item}>
                        <Text style={styles.text}>{item.filename}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
        padding: 20,
    },
    title: {
        color: "gold",
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 10,
    },
    item: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: "gold",
    },
    text: {
        color: "white",
        fontSize: 16,
    },
});
