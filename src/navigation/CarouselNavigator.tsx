import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import HomeScreen from "../screens/HomeScreen";
import PlaylistScreen from "../screens/PlaylistScreen";
import PlayerScreen from "../screens/PlayerScreen";

const Tab = createMaterialTopTabNavigator();

export default function CarouselNavigator() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: { display: "none", backgroundColor: "#000" },
                swipeEnabled: true,
                tabBarLabelStyle: { display: "none" },
            }}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Playlist" component={PlaylistScreen} />
            <Tab.Screen name="Player" component={PlayerScreen} />
        </Tab.Navigator>
    );
}
