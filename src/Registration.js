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
        <Text style={{ fontWeight: "bold", fontSize: 23 }}>Register Here!</Text>
        <View style={{ marginTop: 40 }}>
          <TextInput
            style={styles.textInput}
            placeholder="First Name"
            onChangeText={(firstName) => setFirstName(firstName)}
            autoCorrect={false}
            returnKeyType={"next"}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Last Name"
            onChangeText={(lastName) => setLastName(lastName)}
            autoCorrect={false}
            returnKeyType={"next"}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Email"
            onChangeText={(email) => setEmail(email)}
            autoCorrect={false}
            returnKeyType={"next"}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Phone Number"
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
            placeholder="Password"
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
          <Text style={{ fontWeight: "bold", fontSize: 22 }}>Register</Text>
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
  },
  textInput: {
    paddingTop: 20,
    paddingBottom: 10,
    width: 400,
    fontSize: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    marginBottom: 10,
    textAlign: "center",
  },
  button: {
    marginTop: 50,
    height: 70,
    width: 250,
    backgroundColor: "#026efd",
    alignItems: "center",
    alignContent: "center",
    borderRadius: 50,
  },
});
