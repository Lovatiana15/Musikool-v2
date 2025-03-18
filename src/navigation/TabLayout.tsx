import React from "react";
import { View, Text, Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "../screens/HomeScreen";
import ListScreen from "../screens/ListScreen";
import PlayerScreen from "../screens/PlayerScreen";
import PlaylistScreen from "../screens/PlaylistScreen";
import FavoriteScreen from "../screens/FavoriteScreen";

const Tab = createBottomTabNavigator();

function CustomHeader() {
  return (
    <View style={{
      backgroundColor: "black",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-end",
      gap:8
    }}>
      <Image
        source={require("../assets/images/icon.png")}
        style={{ width: 30, height: 30 }}
      />
      <Text style={{ fontSize: 18, fontWeight: "bold", color: "yellow", marginRight: 10 }}>Musi<Text style={{color:"white"}}>kool</Text></Text>
    </View>
  );
}

export default function TabLayout() {
  return (
    <View style={{ flex: 1 ,marginTop:25}}>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: { backgroundColor: "gray", height: 50 },
          tabBarLabelStyle: { color: "white", fontSize: 12 },
          tabBarInactiveTintColor: "white",
          headerTitle: () => <CustomHeader />,
          headerStyle: { backgroundColor: "black" },
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ color }) => <Ionicons name="home-outline" size={25} color={color} />,
          }}
        />

        <Tab.Screen
          name="List"
          component={ListScreen}
          options={{
            tabBarLabel: "Music",
            tabBarIcon: ({ color }) => <Ionicons name="musical-notes-outline" size={25} color={color} />,
          }}
        />

        <Tab.Screen
          name="Player"
          component={PlayerScreen}
          options={{
            tabBarLabel: "Play",
            tabBarIcon: ({ color }) => <Ionicons name="play-circle-outline" size={25} color={color} />,
          }}
        />
        <Tab.Screen
          name="Playlist"
          component={PlaylistScreen}
          options={{
            tabBarLabel: "Playlist",
            tabBarIcon: ({ color }) => <Ionicons name="list-outline" size={25} color={color} />,
          }}
        />
        <Tab.Screen
          name="Favorite"
          component={FavoriteScreen}
          options={{
            tabBarLabel: "Favorite",
            tabBarIcon: ({ color }) => <Ionicons name="heart" size={25} color={color} />,
          }}
        />
      </Tab.Navigator>
    </View>
  );
}
