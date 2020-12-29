import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createAppContainer, createSwitchNavigator } from "react-navigation";

import Home from "./Components/Pages/Home";
import Login from "./Components/Pages/Login";
import { Button, ThemeProvider } from "react-native-elements";

const StackNavigatorOptions = {
  headerMode: "none",
  cardStyle: {
    backgroundColor: "white"
  }
};

const App = createAppContainer(
  createSwitchNavigator(
    {
      Login: { screen: Login },
      Home: { screen: Home }
    },
    StackNavigatorOptions
  )
);

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
