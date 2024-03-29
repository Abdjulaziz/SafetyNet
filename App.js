import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useState, useEffect } from "react";
import { firebase } from "./config";

import Login from "./src/Login";
import Registration from "./src/Registration";
import ForgetPassword from "./src/ForgetPassword";
import MainContainer from "./navigation/MainContainer";
import Header from "./components/Header";

const MyTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: "#ffffff",
    },
};
const Stack = createStackNavigator();

function App() {
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();
    // Håndtere bruger state ændringer
    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber;
    }, []);
    if (initializing) return null;

    if (!user) {
        return (
            <Stack.Navigator>
                <Stack.Screen
                    name="Login"
                    component={Login}
                    options={{
                        headerTitle: () => <Header name="SafetyNet" />,
                        headerStyle: {
                            height: 150,
                            elevation: 25,
                        },
                    }}
                ></Stack.Screen>
                <Stack.Screen
                    name="Registration"
                    component={Registration}
                    options={{
                        headerTitle: () => <Header name="SafetyNet" />,
                        headerStyle: {
                            height: 150,
                            elevation: 25,
                        },
                    }}
                ></Stack.Screen>
                <Stack.Screen
                    name="ForgetPassword"
                    component={ForgetPassword}
                    options={{
                        headerTitle: () => <Header name="SafetyNet" />,
                        headerStyle: {
                            height: 150,
                            elevation: 25,
                        },
                    }}
                ></Stack.Screen>
            </Stack.Navigator>
        );
    } else {
        return (
            <Stack.Navigator>
                <Stack.Screen
                    name="MainContainer"
                    options={{
                        headerShown: false,
                    }}
                    component={MainContainer}
                ></Stack.Screen>
            </Stack.Navigator>
        );
    }
}

export default () => {
    return (
        <NavigationContainer theme={MyTheme}>
            <App />
        </NavigationContainer>
    );
};
