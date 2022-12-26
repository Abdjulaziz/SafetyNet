import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

// Screens
import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import SettingsScreen from "./screens/SettingsScreen";

//Screen names
const homeTab = "Home";
const profileTab = "Details";
const settingsTab = "Settings";

const Tab = createBottomTabNavigator();

function MainContainer() {
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          title: "",
          tabBarActiveTintColor: "#15921F",
          tabBarInactiveTintColor: "#000",
          tabBarStyle: { display: "flex" },
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;
            size = 30;
            if (rn === homeTab) {
              iconName = focused ? "home" : "home-outline";
            } else if (rn === profileTab) {
              iconName = focused ? "person-sharp" : "person-outline";
            } else if (rn === settingsTab) {
              iconName = focused ? "options-sharp" : "options-outline";
            }
            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name={homeTab} component={HomeScreen} />
        <Tab.Screen name={profileTab} component={ProfileScreen} />
        <Tab.Screen name={settingsTab} component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default MainContainer;
