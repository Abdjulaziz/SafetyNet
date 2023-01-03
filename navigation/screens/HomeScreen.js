import {
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState, useEffect } from "react";
import { firebase } from "../../config";
import MapLocation from "../../components/MapLocation";

export default function HomeScreen({ navigation }) {
  /*   const [name, setName] = useState("");
  useEffect(() => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          setName(snapshot.data());
        } else {
          console.log("User does not exist");
        }
      });
  }, []); */

  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <MapLocation></MapLocation>
    </View>
  );
}
