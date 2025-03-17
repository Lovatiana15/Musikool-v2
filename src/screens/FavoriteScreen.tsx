import React from 'react';
import { View, Text, StyleSheet, FlatList } from "react-native";

export default function FavoriteScreen() {
  // Liste des favoris (cela devrait être géré par un contexte ou un store, mais pour la démo on l'initialise avec un tableau vide)
  const favoriteTracks = []; // Remplacer par un état ou un store si nécessaire.

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mes Favoris</Text>
      <FlatList
        data={favoriteTracks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.trackItem}>
            <Text style={styles.trackText}>{item.filename}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#000',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 20,
  },
  trackItem: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#333',
    borderRadius: 5,
  },
  trackText: {
    color: 'white',
    fontSize: 18,
  },
});
