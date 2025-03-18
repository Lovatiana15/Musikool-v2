import React, { useEffect, useContext, useState } from "react";
import { 
    View, 
    Text, 
    FlatList, 
    TouchableOpacity, 
    StyleSheet, 
    ActivityIndicator, 
    TextInput 
} from "react-native";
import { AudioContext } from "../context/AudioContext";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';
import { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
    Player: { trackIndex: number };
};

type NavigationProps = StackNavigationProp<RootStackParamList, "Player">;

interface AudioFile {
    filename: string;
}

interface AudioContextType {
    audioFiles: AudioFile[];
}

const ListScreen: React.FC = () => {
    const context = useContext<AudioContextType | undefined>(AudioContext);
    const audioFiles = context?.audioFiles || [];
    
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState(""); 
    const [filteredAudioFiles, setFilteredAudioFiles] = useState<AudioFile[]>(audioFiles); 
    const navigation = useNavigation<NavigationProps>();

    useEffect(() => {
        if (audioFiles.length > 0) {
            setLoading(false);
            setFilteredAudioFiles(audioFiles);
        }
    }, [audioFiles]);

    // Filtrer les fichiers audio en fonction du texte de recherche
    useEffect(() => {
        if (searchText === "") {
            setFilteredAudioFiles(audioFiles);
        } else {
            const filtered = audioFiles.filter((item: AudioFile) =>
                item.filename.toLowerCase().includes(searchText.toLowerCase())
            );
            setFilteredAudioFiles(filtered);
        }
    }, [searchText, audioFiles]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}> Local Music</Text>

            {/* Champ de Recherche avec une icône de recherche */}
            <View style={styles.searchContainer}>
                <Ionicons name="search" size={20} color="#b3b3b3" style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search Songs..."
                    placeholderTextColor="#b3b3b3"
                    value={searchText}
                    onChangeText={setSearchText} 
                />
            </View>

            {loading ? (
                <ActivityIndicator size="large" color="#FFD700" />
            ) : filteredAudioFiles.length === 0 ? (
                <Text style={styles.noMusicText}>No music found.</Text>
            ) : (
                <FlatList
                    data={filteredAudioFiles}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity
                            style={styles.audioItem}
                            onPress={() => navigation.navigate("Player", { trackIndex: index })}
                        >
                            <Ionicons name="musical-note" size={20} color="#b3b3b3" />
                            <Text style={styles.audioTitle}>{item.filename}</Text>
                        </TouchableOpacity>
                    )}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
        padding: 20
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#FFD700",
        marginBottom: 20,
        textAlign: "center"
    },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        width: "85%",
        height: 50,
        backgroundColor: "#fff",
        borderRadius: 25,
        marginBottom: 20,
    },
    searchIcon: {
        marginLeft: 15,
    },
    searchInput: {
        flex: 1,
        height: "100%",
        fontSize: 16,
        color: "#000",
        paddingLeft: 10,
    },
    noMusicText: {
        color: "#b3b3b3",
        fontSize: 16,
        textAlign: "center",
        marginTop: 20
    },
    audioItem: {
        backgroundColor: "#222",
        padding: 20,
        marginVertical: 4,
        borderRadius: 8,
        flexDirection: "row",
        gap: 8,
    },
    audioTitle: {
        color: "#FFF",
        fontSize: 16
    },
    pagination: {
        position: "absolute",
        bottom: 20,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: "100%"
    },
    paginationDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        marginHorizontal: 5
    },
    activeDot: {
        backgroundColor: "#FFD700",
        width: 14,
        height: 14
    },
    inactiveDot: {
        backgroundColor: "#fff"
    },
});

export default ListScreen;
