import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, ThemeProvider, Header, Input } from "react-native-elements";
import { firebase, firebase_sign_out } from "../../firebase";

function Home({ navigation }) {
  const [phoneNumber, updatePhoneNumber] = useState("");

  const firebaseRef = firebase
    .database()
    .ref("users")
    .child(firebase.auth().currentUser.uid);

  useEffect(() => {
    firebaseRef.on("value", snapshot => {
      const snapshot_data = snapshot.val();
      const phoneNumber = snapshot_data["phoneNumber"] || "";
      updatePhoneNumber(phoneNumber);
    });
  }, []);

  const onSignOut = () => {
    firebase_sign_out().then(response => {
      navigation.navigate("Login");
    });
  };

  const onSubmit = () => {
    firebaseRef.update({ phoneNumber: phoneNumber });
  };

  return (
    <View style={styles.container}>
      <Text>Enter Your Phone Number to Receive Bot Alerts</Text>
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
