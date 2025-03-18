import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

export default function FavoriteScreen() {
  const [favoriteTracks, setFavoriteTracks] = useState<any[]>([]);

  const loadFavorites = async () => {
    try {
      const favJSON = await AsyncStorage.getItem("favorites");
      if (favJSON) {
        setFavoriteTracks(JSON.parse(favJSON));
      } else {
        setFavoriteTracks([]);
      }
    } catch (error) {
      console.log("Erreur lors du chargement des favoris :", error);
    }
  };

  // Recharge les favoris à chaque fois que l'écran devient actif
  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, [])
  );

  // Fonction pour supprimer un favori et mettre à jour AsyncStorage
  const removeFavorite = async (id: string) => {
    try {
      const updatedFavorites = favoriteTracks.filter(item => item.id !== id);
      setFavoriteTracks(updatedFavorites);
      await AsyncStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    } catch (error) {
      console.log("Erreur lors de la suppression du favori :", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Favorite</Text>
      {favoriteTracks.length === 0 ? (
        <Text style={styles.emptyText}>Aucun favori ajouté.</Text>
      ) : (
        <FlatList
          data={favoriteTracks}
          keyExtractor={(item, index) =>
            item.id ? item.id.toString() : index.toString()
          }
          renderItem={({ item }) => (
            <View style={styles.trackItem}>
              <Text style={styles.trackText}>{item.filename}</Text>
              <TouchableOpacity onPress={() => removeFavorite(item.id)}>
                <Ionicons name="trash-bin" size={20} color="red" />
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#000",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFD700",
    marginBottom: 20,
    textAlign: "center",
  },
  emptyText: {
    color: "#b3b3b3",
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
  trackItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#333",
    borderRadius: 5,
  },
  trackText: {
    color: "white",
    fontSize: 18,
  },
});
