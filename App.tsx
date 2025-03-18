import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/navigation/AppNavigator";
import AudioProvider from "./src/context/AudioContext";
import { PlaylistProvider } from "./src/context/PlaylistContext";

export default function App() {
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
