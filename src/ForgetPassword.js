import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { firebase } from "../config";

const ForgetPassword = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");

  const forgetPassword = () => {
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        alert("Password reset email sent");
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <View style={styles.container}>
      <View style={{ marginTop: 40 }}>
        <TextInput
          style={styles.textInput}
          placeholder="E-mail"
          onChangeText={(email) => setEmail(email)}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>

      <TouchableOpacity
        onPress={() => {
          forgetPassword();
        }}
        style={styles.button}
      >
        <Text style={{ fontWeight: "bold", fontSize: 16, color: "white" }}>
          Gendan adgangskode
        </Text>
      </TouchableOpacity>
    </View>
  );
};
export default ForgetPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 100,
    backgroundColor: "#fffff",
  },
  textInput: {
    padding: 15,
    width: 320,
    fontSize: 16,
    borderRadius: 5,
    backgroundColor: "#F2F2F2",
    marginBottom: 10,
    textAlign: "left",
  },
  button: {
    marginTop: 5,
    paddingTop: 15,
    paddingBottom: 15,
    width: 320,
    backgroundColor: "#15921F",
    alignItems: "center",
    borderRadius: 5,
  },
});
