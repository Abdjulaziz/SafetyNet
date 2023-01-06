import React, { useState, useEffect, useRef } from "react";
import MapView from "react-native-maps";
import { StyleSheet, View, Dimensions, TouchableOpacity, Text, Modal } from "react-native";
import * as Location from "expo-location";
import { Marker } from "react-native-maps";
import ContactListScreen from "../navigation/screens/ProfileScreen";
import Ionicons from "react-native-vector-icons/Ionicons";
export default function MapLocation() {
    const [showModal, setShowModal] = useState(false);
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
        setMapRegion(prevState => {
            return {
                ...prevState,
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            };
        });
    };
    useEffect(() => {
        userLocation();
    }, []);
    const mapRef = useRef(null);

    const zoomToMarker = () => {
        try {
            // Zoom marker, her zoomer vi ind på lokationen
            const camera = {
                center: mapRegion,
                pitch: 0,
                heading: 0,
                altitude: 1000,
                zoom: 18,
            };

            // Animere zoom til den nye lokation
            mapRef.current.animateCamera(camera, { duration: 2000 });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <View style={styles.container}>
            <Modal
                animationType={"slide"}
                transparent={false}
                visible={showModal}
                onRequestClose={() => {
                    console.log("Modal has been closed.");
                }}
            >
                <View style={styles.modal}>
                    <TouchableOpacity
                        style={styles.modalButton}
                        onPress={() => {
                            setShowModal(!showModal);
                        }}
                    >
                        <Ionicons name="close-outline" size={34} color="#333" style={styles.icon} />

                        <View style={styles.circle}></View>
                    </TouchableOpacity>
                </View>
            </Modal>
            <View style={styles.buttonContainer}>
                {/*       <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setShowModal(!showModal);
          }}
        >
          <Ionicons
            name="people-outline"
            size={28}
            color="#333"
            style={styles.icon}
          />

          <View style={styles.circle}></View>
          <Text
            style={{
              color: "#fff",
              fontWeight: "bold",
              marginTop: -16,
            }}
          >
            Fav
          </Text>
        </TouchableOpacity> */}
                <TouchableOpacity style={styles.button} onPress={zoomToMarker}>
                    <Ionicons name="ios-locate" size={34} color="#333" style={styles.icon} />
                    <View style={styles.circle}></View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={userLocation}>
                    <Ionicons name="pin-outline" size={34} color="#333" style={styles.icon} />
                    <View style={styles.circle}></View>
                </TouchableOpacity>
            </View>
            <MapView ref={mapRef} style={styles.map} region={mapRegion}>
                <Marker coordinate={mapRegion}></Marker>
            </MapView>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    buttonContainer: {
        position: "absolute",
        bottom: 170,
        padding: 4,
        left: 10,
        width: 0,
        height: 0,
        borderRadius: 25,
        zIndex: 1,
    },
    button: {
        shadowColor: "#000", // IOS
        shadowOffset: { height: 0, width: 1 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1, //IOS
        elevation: 2, // Android
        width: 60,
        height: 60,
        borderRadius: 30,
        margin: 5,
        backgroundColor: "#15921F",
        alignItems: "center",
        justifyContent: "center",
    },
    circle: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    map: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
    },
    icon: {
        color: "#fff",
        position: "absolute",
        top: "50%",
        left: "50%",
        marginTop: -18,
        marginLeft: -16,
    },
    modal: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 100,
        height: 400,
    },
    modalButton: {
        position: "absolute",
        right: 0,
        margin: 40,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: "red",
    },
});
