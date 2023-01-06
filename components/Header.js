import { View, Text } from "react-native";
import React from "react";

const Header = (props) => {
  return (
    <View>
      <Text
        style={{
          fontWeight: "bold",
          fontSize: 28,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {props.name}
      </Text>
    </View>
  );
};

export default Header;
