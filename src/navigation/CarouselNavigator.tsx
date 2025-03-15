import React, { useState } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import HomeScreen from "../screens/HomeScreen";
import PlaylistScreen from "../screens/PlaylistScreen";
import PlayerScreen from "../screens/PlayerScreen";

const Tab = createMaterialTopTabNavigator();

export default function CarouselNavigator() {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: { display: "none" },
                swipeEnabled: true,
            }}
            screenListeners={{
                state: (event) => {
                    setActiveIndex(event.data.state.index);
                },
            }}
        >
            <Tab.Screen name="Home">
                {(props) => <HomeScreen {...props} activeIndex={activeIndex} />}
            </Tab.Screen>
            <Tab.Screen name="Playlist">
                {(props) => <PlaylistScreen {...props} activeIndex={activeIndex} />}
            </Tab.Screen>
            <Tab.Screen name="Player">
                {(props) => <PlayerScreen {...props} activeIndex={activeIndex} />}
            </Tab.Screen>
        </Tab.Navigator>
    );
}
