import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Playlist {
  id: string;
  name: string;
  songs: any[];
}

interface PlaylistContextData {
  playlists: Playlist[];
  setPlaylists: React.Dispatch<React.SetStateAction<Playlist[]>>;
}

const PlaylistContext = createContext<PlaylistContextData | undefined>(undefined);

export const PlaylistProvider = ({ children }: { children: ReactNode }) => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);

  useEffect(() => {
    const loadPlaylists = async () => {
      const storedPlaylists = await AsyncStorage.getItem("playlists");
      if (storedPlaylists) {
        setPlaylists(JSON.parse(storedPlaylists));
      }
    };
    loadPlaylists();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem("playlists", JSON.stringify(playlists));
  }, [playlists]);

  return (
    <PlaylistContext.Provider value={{ playlists, setPlaylists }}>
      {children}
    </PlaylistContext.Provider>
  );
};

export const usePlaylist = () => {
  const context = useContext(PlaylistContext);
  if (!context) {
    throw new Error("usePlaylist must be used within a PlaylistProvider");
  }
  return context;
};
