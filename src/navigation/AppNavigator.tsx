import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import PlayerScreen from "../screens/PlayerScreen";
import PlaylistScreen from "../screens/PlaylistScreen";

const Stack = createStackNavigator();

export default function AppNavigator() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Player" component={PlayerScreen} />
            <Stack.Screen name="Playlist" component={PlaylistScreen} />
        </Stack.Navigator>
    );
}
