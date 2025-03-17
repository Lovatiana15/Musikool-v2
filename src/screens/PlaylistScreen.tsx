import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Modal, TextInput } from "react-native";
import { usePlaylist } from "../context/PlaylistContext";
import { useNavigation } from "@react-navigation/native";

const PlaylistScreen = () => {
  const { playlists, setPlaylists } = usePlaylist();
  const [modalVisible, setModalVisible] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const navigation = useNavigation();

  const addNewPlaylist = () => {
    if (newPlaylistName.trim() === "") return;
    const newPlaylist = {
      id: Date.now().toString(),
      name: newPlaylistName,
      songs: [],
    };
    setPlaylists([...playlists, newPlaylist]);
    setNewPlaylistName("");
    setModalVisible(false);
  };

  const deletePlaylist = (playlistId: string) => {
    setPlaylists(playlists.filter(pl => pl.id !== playlistId));
  };

  const openPlaylist = (playlist: any) => {
    navigation.navigate("PlaylistDetail", { playlistId: playlist.id });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Playlists</Text>
      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.buttonText}>Add new playlist</Text>
      </TouchableOpacity>

      <FlatList
        data={playlists}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.playlistItem} onPress={() => openPlaylist(item)}>
            <Text style={styles.playlistName}>{item.name}</Text>
            <TouchableOpacity style={styles.deleteButton} onPress={() => deletePlaylist(item.id)}>
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>Aucune playlist créée.</Text>}
      />

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Nouvelle Playlist</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Nom de la playlist"
              placeholderTextColor="#999"
              value={newPlaylistName}
              onChangeText={setNewPlaylistName}
            />
            <View style={styles.modalButtons}>
                <TouchableOpacity
                    style={[styles.modalButton, styles.cancelButton]}
                    onPress={() => setModalVisible(false)}
                >
                    <Text style={styles.modalButtonText}>Annuler</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalButton} onPress={addNewPlaylist}>
                    <Text style={styles.modalButtonText}>Créer</Text>
                </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 20,
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#FFD700",
    textAlign: "center",
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: "gray",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  playlistItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#222",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  playlistName: {
    color: "#FFF",
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: "#FF4500",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: "#FFF",
    fontSize: 14,
  },
  emptyText: {
    color: "#b3b3b3",
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    width: "80%",
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  modalInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  modalButton: {
    backgroundColor: "#1E90FF",
    padding: 10,
    borderRadius: 5,
    width: "40%",
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#FF4500",
  },
  modalButtonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
});

export default PlaylistScreen;
