import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, ThemeProvider } from "react-native-elements";

function Login({ navigation }) {
  const onLoginSubmit = () => {
    navigation.navigate("Home");
  };
  return (
    <ThemeProvider>
      <Button onPress={onLoginSubmit} title="Hey!" />
    </ThemeProvider>
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
