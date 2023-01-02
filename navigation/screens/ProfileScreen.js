import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import BottomBox from "../../components/ProfileAddition";
import Circle from "../../components/ProfileBubble";
import Sandbox from "../../components/ProfileInfo";
import App from "../../components/MapLocation";

export default function DetailsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <App></App>
    </View>

  );
}
