import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { Button, ThemeProvider, Header } from "react-native-elements";
import {
  firebase,
  firebase_sign_in_anonymous,
  firebase_sign_up,
  firebase_sign_in,
  firebase_sign_out,
  firebase_sign_in_google
} from "../../firebase";

function Login({ navigation }) {
  const onLoginSubmit = () => {
    firebase_sign_in_google().then(response => {
      console.log({ response });
    });
  };

  const onLogoutSubmit = () => {
    firebase_sign_out().then(response => {
      console.log({ response });
    });
  };
  return (
    <View style={styles.container}>
      <Button onPress={onLoginSubmit} title="Login!" />
      <Button onPress={onLogoutSubmit} title="Logout!" />

      <StatusBar style="auto" />
    </View>
  );
}

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
