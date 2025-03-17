import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TabLayout from "./TabLayout";
import PlaylistScreen from "../screens/PlaylistScreen";
import PlaylistDetailScreen from "../screens/PlaylistDetailScreen";

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={TabLayout} />
      <Stack.Screen name="PlaylistScreen" component={PlaylistScreen} />
      <Stack.Screen name="PlaylistDetail" component={PlaylistDetailScreen} />
    </Stack.Navigator>
  );
}
