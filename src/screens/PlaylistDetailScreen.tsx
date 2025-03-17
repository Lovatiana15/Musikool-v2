import React, { useState, useContext, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput, ActivityIndicator, Alert } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native"; 
import { usePlaylist } from "../context/PlaylistContext";
import { AudioContext } from "../context/AudioContext";
import { Audio } from "expo-av";  
import AsyncStorage from "@react-native-async-storage/async-storage"; 
import { Ionicons } from '@expo/vector-icons'; 

const PlaylistDetailScreen = () => {
  const { playlists, setPlaylists } = usePlaylist();
  const { audioFiles } = useContext(AudioContext);
  const route = useRoute();
  const navigation = useNavigation();  
  const { playlistId } = route.params;
  const [playlist, setPlaylist] = useState<any>(null);
  const [searchText, setSearchText] = useState("");
  const [filteredSongs, setFilteredSongs] = useState(audioFiles);
  const [loading, setLoading] = useState(true);
  const [sound, setSound] = useState<any>(null); 
  const [showAddSong, setShowAddSong] = useState(true); 

  useEffect(() => {
    const currentPlaylist = playlists.find((pl) => pl.id === playlistId);
    setPlaylist(currentPlaylist);
  }, [playlists, playlistId]);

  useEffect(() => {
    if (audioFiles.length > 0) {
      setLoading(false);
      if (searchText === "") {
        setFilteredSongs(audioFiles);
      } else {
        const filtered = audioFiles.filter((song) =>
          song.filename.toLowerCase().includes(searchText.toLowerCase())
        );
        setFilteredSongs(filtered);
      }
    }
  }, [audioFiles, searchText]);

  const addSongToPlaylist = (song: any) => {
    if (!playlist) return;
    // Vérifier si la chanson est déjà dans la playlist
    if (playlist.songs.find((s: any) => s.uri === song.uri)) return;
    const updatedPlaylist = { ...playlist, songs: [...playlist.songs, song] };
    setPlaylist(updatedPlaylist);
    setPlaylists(playlists.map((pl) => (pl.id === playlist.id ? updatedPlaylist : pl)));
  };

  const playSong = async (song: any) => {
    const { sound } = await Audio.Sound.createAsync({ uri: song.uri });
    setSound(sound);
    await sound.playAsync();
  };

  const stopSong = async () => {
    if (sound) {
      await sound.stopAsync();
      setSound(null);
    }
  };

  // Fonction pour sauvegarder la playlist
  const savePlaylist = async () => {
    try {
      const updatedPlaylists = playlists.map((pl) =>
        pl.id === playlist.id ? playlist : pl
      );
      await AsyncStorage.setItem('playlists', JSON.stringify(updatedPlaylists)); 
      setPlaylists(updatedPlaylists); 
      alert('Playlist sauvegardée avec succès');
      
      // Rediriger vers la page de la playlist de démarrage (par exemple, "PlaylistScreen")
      navigation.navigate('PlaylistScreen'); 
    } catch (error) {
      console.error('Erreur lors de la sauvegarde de la playlist:', error);
    }
  };

  // Fonction pour naviguer vers l'écran d'ajout de chanson
  const navigateToAddSong = () => {
    setShowAddSong(false); 
    navigation.navigate('AddSongScreen'); 
  };

  // Fonction pour revenir à l'écran précédent
  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {playlist ? (
        <>
          <Text style={styles.header}>{playlist.name}</Text>
          <View style={styles.back}>
            {/* Bouton Retour avec icône */}
            <TouchableOpacity onPress={goBack} style={styles.backButton}>
                <Ionicons name="arrow-back" size={24} color="#000" />
            </TouchableOpacity>

            {/* Bouton Ajouter une chanson avec icône */}
            <TouchableOpacity onPress={navigateToAddSong} style={styles.addButton}>
                <Ionicons name="add" size={24} color="#FFF" />
            </TouchableOpacity>
          </View>

          <Text style={styles.subHeader}>Chansons dans la playlist :</Text>
          {playlist.songs.length === 0 ? (
            <Text style={styles.emptyText}>Aucune chanson dans cette playlist.</Text>
          ) : (
            <FlatList
              data={playlist.songs}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View style={styles.itemContainer}>
                  <Text style={styles.itemText}>{item.filename}</Text>
                  <TouchableOpacity onPress={() => playSong(item)}>
                    <Text style={styles.playButton}>Jouer</Text>
                  </TouchableOpacity>
                </View>
              )}
            />
          )}
          
          {/* Si showAddSong est vrai, afficher la section pour sélectionner une chanson */}
          {showAddSong && (
            <>
              <Text style={styles.subHeader}>Ajouter une chanson :</Text>
              <TextInput
                style={styles.searchInput}
                placeholder="Rechercher une chanson..."
                placeholderTextColor="#b3b3b3"
                value={searchText}
                onChangeText={setSearchText}
              />
              {loading ? (
                <ActivityIndicator size="large" color="#FFD700" />
              ) : (
                <FlatList
                  data={filteredSongs}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (
                    <TouchableOpacity style={styles.itemContainer} onPress={() => addSongToPlaylist(item)}>
                      <Text style={styles.itemText}>{item.filename}</Text>
                    </TouchableOpacity>
                  )}
                  ListEmptyComponent={<Text style={styles.emptyText}>Aucune chanson trouvée.</Text>}
                />
              )}
            </>
          )}

          <TouchableOpacity onPress={savePlaylist} style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Sauvegarder la Playlist</Text>
          </TouchableOpacity>
          
        </>
      ) : (
        <Text style={styles.emptyText}>Playlist non trouvée.</Text>
      )}
      
      <TouchableOpacity onPress={stopSong} style={styles.stopButton}>
        <Text style={styles.stopButtonText}>Arrêter la lecture</Text>
      </TouchableOpacity>
        
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000", padding: 20 },
  header: { fontSize: 26, fontWeight: "bold", color: "#FFD700", textAlign: "center", marginBottom: 20 },
  subHeader: { fontSize: 20, fontWeight: "bold", color: "#FFD700", marginVertical: 10 },
  emptyText: { color: "#b3b3b3", textAlign: "center", marginTop: 20, fontSize: 16 },
  searchInput: {
    width: "100%",
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    color: "#000",
    marginBottom: 20,
  },
  back:{
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 15,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#222",
    padding: 15,
    borderRadius: 8,
    marginVertical: 5,
  },
  itemText: { color: "#FFF", fontSize: 16 },
  playButton: { color: "#FFD700", fontSize: 16 },
  stopButton: {
    backgroundColor: "#FF4500",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    alignItems: "center",
  },
  stopButtonText: { color: "#FFF", fontWeight: "bold" },
  saveButton: {
    backgroundColor: "#32CD32",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
  addButton: {
    backgroundColor: "#1E90FF",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    alignItems: "center",
  },
  backButton: {
    backgroundColor: "#FFD700",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    alignItems: "center",
  },
});

export default PlaylistDetailScreen;
