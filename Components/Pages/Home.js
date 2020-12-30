import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, ThemeProvider, Header, Input } from "react-native-elements";
import {
  firebase,
  firebase_sign_in_anonymous,
  firebase_sign_up,
  firebase_sign_in,
  firebase_sign_out,
  firebase_sign_in_google,
  useFirestore
} from "../../firebase";

function Home({ navigation }) {
  const [uid, updateUID] = useState("");
  const { users, setUser, deleteUser } = useFirestore({ uid: firebase.auth().currentUser.uid });
  const [phoneNumber, updatePhoneNumber] = useState("");

  // navigation.getParam("email");
  const get_uid_or_go_home = () => {
    try {
      const uid = firebase.auth().currentUser.uid;
      console.log({ uid, users });
      updateUID(uid);
    } catch (err) {
      console.log({ err });
      navigation.navigate("Login");
    }
  };

  const updatePhoneNumberLoad = () => {
    try {
      updatePhoneNumber(users[0]["phoneNumber"]);
    } catch (err) {
      console.log({ err });
      updatePhoneNumber("");
    }
  };

  useEffect(() => {
    get_uid_or_go_home();
    updatePhoneNumberLoad();
  }, [uid, users.length]);

  const onSignOut = () => {
    firebase_sign_out().then(response => {
      console.log({ response });
      navigation.navigate("Login");
    });
  };

  const onSubmit = () => {
    const base_dict = users[0];
    setUser({ ...base_dict, phoneNumber: phoneNumber });
  };

  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <Input placeholder="Phone Number" onChangeText={updatePhoneNumber} value={phoneNumber} />
      <Button onPress={onSubmit} title="Submit" />

      <Button onPress={onSignOut} title="Sign Out" />
      <StatusBar style="auto" />
    </View>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
