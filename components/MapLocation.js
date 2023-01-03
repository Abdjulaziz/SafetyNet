import React, { useState, useEffect } from "react";
import MapView from "react-native-maps";
import { StyleSheet, View, Dimensions, Button } from "react-native";
import * as Location from "expo-location";
import { Marker } from "react-native-maps";

export default function MapLocation() {
  const [mapRegion, setMapRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.09,
    longitudeDelta: 0.05,
  });

  const userLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
    }
    let location = await Location.getCurrentPositionAsync({
      enableHighAccuracy: true,
    });
    setMapRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.09,
      longitudeDelta: 0.05,
    });
    console.log(location.coords.latitude, location.coords.longitude);
  };

  useEffect(() => {
    userLocation();
  }, []);

  return (
    <View style={styles.container}>
      <Button title="Get Location" onPress={userLocation}></Button>
      <MapView style={styles.map} region={mapRegion}>
        <Marker coordinate={mapRegion}></Marker>
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
