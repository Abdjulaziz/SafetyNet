import * as React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import MapView from 'react-native-maps';
import * as Location from 'expo-location'
import { useEffect } from "react";
import { useState } from "react";

function App() {
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

function Map() {
    return (
      <View style={styles.container}>
        <MapView style={styles.map} />
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
  });

export {
    App,
    Map
}