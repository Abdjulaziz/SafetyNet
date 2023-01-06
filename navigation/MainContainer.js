import * as React from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

// Skærme/sider
import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import SettingsScreen from "./screens/SettingsScreen";

// tabs navne
const homeTab = "Home";
const profileTab = "Details";
const settingsTab = "Settings";

const Tab = createBottomTabNavigator();
const MyTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: "#ffffff",
    },
};
function MainContainer() {
    return (
        <NavigationContainer theme={MyTheme} independent={true}>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    title: "",
                    headerShown: false,
                    tabBarActiveTintColor: "#15921F",
                    tabBarInactiveTintColor: "#000",
                    tabBarStyle: { display: "flex" },
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;
                        let rn = route.name;
                        size = 32;
                        if (rn === homeTab) {
                            iconName = focused ? "home" : "home-outline";
                        } else if (rn === profileTab) {
                            iconName = focused ? "person-sharp" : "person-outline";
                        } else if (rn === settingsTab) {
                            iconName = focused ? "options-sharp" : "options-outline";
                        }
                        // retunere en ikon komponent
                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                })}
            >
                <Tab.Screen
                    name={homeTab}
                    component={HomeScreen}
                    options={{
                        title: "",
                        headerShown: false,
                    }}
                />
                <Tab.Screen
                    name={profileTab}
                    component={ProfileScreen}
                    options={{
                        title: "",
                        headerShown: false,
                    }}
                />
                <Tab.Screen
                    name={settingsTab}
                    component={SettingsScreen}
                    options={{
                        title: "",
                        headerShown: false,
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

export default MainContainer;
