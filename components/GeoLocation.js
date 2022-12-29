import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import * as Location from 'expo-location'
import { useEffect } from "react";
import { useState } from "react";

export default function App() {
    const [location, setLocation] = useState({})
    useEffect(() => {
        (async() => {
            let {status} = await Location.requestForegroundPermissionsAsync()
            if (status == 'granted') {
                console.log('Permission successgul')
            } else {
                console.log('Permission not granted')
            }

            const loc = await Location.getCurrentPositionAsync()
            console.log(loc)
            setLocation(loc)
        })()
    }, [])
    return (
        <View style={StyleSheet.container}>
            <Text>{JSON.stringify(location)}</Text>
        </View>
    );
}