import React, { createContext, useState, useEffect, ReactNode } from "react";
import * as MediaLibrary from "expo-media-library";

interface AudioFile {
    uri: string;
    filename: string;
}

interface AudioContextType {
    audioFiles: AudioFile[];
    setAudioFiles: React.Dispatch<React.SetStateAction<AudioFile[]>>;
}

export const AudioContext = createContext<AudioContextType | undefined>(undefined);

const AudioProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [audioFiles, setAudioFiles] = useState<AudioFile[]>([]);

    useEffect(() => {
        const loadAudioFiles = async () => {
            const { status } = await MediaLibrary.requestPermissionsAsync();
            if (status !== "granted") return;

            const media = await MediaLibrary.getAssetsAsync({ mediaType: "audio", first: 100 });
            setAudioFiles(media.assets.map((asset) => ({ uri: asset.uri, filename: asset.filename })));
        };

        loadAudioFiles();
    }, []);

    return (
        <AudioContext.Provider value={{ audioFiles, setAudioFiles }}>
            {children}
        </AudioContext.Provider>
    );
};

export default AudioProvider;
