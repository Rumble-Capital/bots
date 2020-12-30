import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, ThemeProvider, Header, Input } from "react-native-elements";
import {
  firebase,
  firebase_sign_in_anonymous,
  firebase_sign_up,
  firebase_sign_in,
  firebase_sign_out,
  firebase_sign_in_google
} from "../../firebase";

function Home({ navigation }) {
  // navigation.getParam("email");

  const onSignOut = () => {
    firebase_sign_out().then(response => {
      console.log({ response });
      navigation.navigate("Login");
    });
  };

  return (
    <View style={styles.container}>
      <Text>Home</Text>
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
