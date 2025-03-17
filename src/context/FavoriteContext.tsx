import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Song {
  id: string;
  filename: string;
  uri: string;
}

interface FavoriteContextType {
  favorites: Song[];
  addFavorite: (song: Song) => void;
  removeFavorite: (songId: string) => void;
}

const FavoriteContext = createContext<FavoriteContextType | undefined>(undefined);

export const FavoriteProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<Song[]>([]);

  const addFavorite = (song: Song) => {
    setFavorites((prev) => {
      // Empêcher les doublons
      if (prev.find(item => item.id === song.id)) return prev;
      return [...prev, song];
    });
  };

  const removeFavorite = (songId: string) => {
    setFavorites((prev) => prev.filter(item => item.id !== songId));
  };

  return (
    <FavoriteContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoriteContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoriteProvider");
  }
  return context;
};
