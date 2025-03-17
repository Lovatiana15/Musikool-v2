import React from "react";
import { View } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from "../screens/HomeScreen";
import PlaylistScreen from "../screens/PlaylistScreen";
import PlayerScreen from "../screens/PlayerScreen";

const Tab = createMaterialTopTabNavigator();

export default function TabLayout() {
  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: { backgroundColor: "gray" },
          tabBarLabelStyle: { color: "white", fontSize: 16 },
          tabBarIndicatorStyle: { backgroundColor: "yellow", height: 3 },
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ color }) => <Ionicons name="home-outline" size={20} color={color} />,
          }}
        />
        <Tab.Screen
          name="Playlist"
          component={PlaylistScreen}
          options={{
            tabBarLabel: "Playlist",
            tabBarIcon: ({ color }) => <Ionicons name="musical-notes-outline" size={20} color={color} />,
          }}
        />
        <Tab.Screen
          name="Player"
          component={PlayerScreen}
          options={{
            tabBarLabel: "Player",
            tabBarIcon: ({ color }) => <Ionicons name="play-circle-outline" size={20} color={color} />,
          }}
        />
      </Tab.Navigator>
    </View>
  );
}
