import React, { createContext, useState, useEffect } from "react";
import * as MediaLibrary from "expo-media-library";
import { Alert } from "react-native";

// Typage des données dans le contexte
export const AudioContext = createContext<{
    audioFiles: MediaLibrary.Asset[];
    permissionGranted: boolean;
}>({
    audioFiles: [],
    permissionGranted: false,
});

interface AudioProviderProps {
    children: React.ReactNode;
}

export default function AudioProvider({ children }: AudioProviderProps) {
    const [audioFiles, setAudioFiles] = useState<MediaLibrary.Asset[]>([]);
    const [permissionGranted, setPermissionGranted] = useState(false);

    useEffect(() => {
        getAudioFiles();
    }, []);

    const getAudioFiles = async () => {
        const { status } = await MediaLibrary.requestPermissionsAsync();
        if (status !== "granted") {
            Alert.alert("Permission refusée", "L'application a besoin d'accéder aux fichiers audio.");
            return;
        }

        setPermissionGranted(true);

        let media = await MediaLibrary.getAssetsAsync({ mediaType: "audio", first: 100 });
        setAudioFiles(media.assets);
    };

    return (
        <AudioContext.Provider value={{ audioFiles, permissionGranted }}>
            {children}
        </AudioContext.Provider>
    );
}
