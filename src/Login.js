import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  AsyncStorage,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { firebase } from "../config";

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPaswword] = useState("");

  LoginUser = async (email, password) => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      alert(error);
    }
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
        <TextInput
          style={styles.textInput}
          placeholder="Adgangskode"
          onChangeText={(password) => setPaswword(password)}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
        />
      </View>

      <TouchableOpacity
        onPress={() => LoginUser(email, password)}
        style={styles.button}
      >
        <Text style={{ fontWeight: "bold", fontSize: 16, color: "white" }}>
          Log ind
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("ForgetPassword")}
        style={{ marginTop: 10 }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 14, color: "#15921F70" }}>
          Glemt adgangskode?
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("Registration")}
        style={{ marginTop: 190 }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>
          Ingen konto? <Text style={{ color: "#15921F" }}>Opret nu</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};
export default Login;

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
