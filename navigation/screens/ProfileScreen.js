import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import BottomBox from "../../components/ProfileAddition";
import Circle from "../../components/ProfileBubble";
import Sandbox from "../../components/ProfileInfo";
import App from "../../components/GeoLocation";


export default function DetailsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <Text
        onPress={() => navigation.navigate("Home")}
        style={{ fontSize: 26, fontWeight: "bold" }}
      >
        Profile
      </Text>
      <Text>Jeg er træt af forkølelse</Text>
      <Circle></Circle>
      <Sandbox></Sandbox>
      <App></App>
    </View>

  );
}
