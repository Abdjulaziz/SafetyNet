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

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <MapLocation></MapLocation>
    </View>
  );
}
