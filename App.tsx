import React, { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/navigation/AppNavigator";
import AudioProvider from "./src/context/AudioContext";
import { PlaylistProvider } from "./src/context/PlaylistContext";

// Empêche le splash screen de se cacher automatiquement
SplashScreen.preventAutoHideAsync();

export default function App() {
  useEffect(() => {
    const prepareApp = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 3000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Une fois le chargement terminé, on cache le splash screen
        await SplashScreen.hideAsync();
      }
    };
    prepareApp();
  }, []);

  return (
    <AudioProvider>
      <PlaylistProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </PlaylistProvider>
    </AudioProvider>
  );
}
