import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import PhoneInput from "react-native-phone-number-input";
import React, { useState } from "react";
import { firebase } from "../config";

const Registration = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [value, setValue] = useState("");

  registerUser = async (email, password, firstName, lastName, phoneNumber) => {
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        firebase
          .auth()
          .currentUser.sendEmailVerification({
            handleCodeInApp: true,
            url: "https://safetynet-1a1b1c.firebaseapp.com",
          })
          .then(() => {
            alert("Verification email sent");
          })
          .catch((error) => {
            alert(error.message);
          })
          .then(() => {
            firebase
              .firestore()
              .collection("users")
              .doc(firebase.auth().currentUser.uid)
              .set({
                firstName,
                lastName,
                email,
                phoneNumber,
              });
          })
          .catch((error) => {
            alert(error.message);
          });
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <View style={{ marginTop: 40 }}>
          <TextInput
            style={styles.textInput}
            placeholder="Fornavn"
            onChangeText={(firstName) => setFirstName(firstName)}
            autoCorrect={false}
            returnKeyType={"next"}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Efternavn"
            onChangeText={(lastName) => setLastName(lastName)}
            autoCorrect={false}
            returnKeyType={"next"}
          />
          <TextInput
            style={styles.textInput}
            placeholder="E-mail"
            onChangeText={(email) => setEmail(email)}
            autoCorrect={false}
            returnKeyType={"next"}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Telefon nummer"
            keyboardType="numeric"
            onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
            autoCorrect={false}
            returnKeyType={"next"}
          />
          {/*           <PhoneInput
            style={styles.textInput}
            international
            defaultCountry="RU"
            value={value}
            onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
          /> */}
          <TextInput
            style={styles.textInput}
            placeholder="Adgangskode"
            onChangeText={(password) => setPassword(password)}
            autoCorrect={false}
            secureTextEntry={true}
            returnKeyType={"next"}
          />
        </View>
        <TouchableOpacity
          onPress={() =>
            registerUser(email, password, firstName, lastName, phoneNumber)
          }
          style={styles.button}
        >
          <Text style={{ fontWeight: "bold", fontSize: 16, color: "#ffffff" }}>
            Registrer
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Registration;

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
