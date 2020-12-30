import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, View, SafeAreaView, Text } from "react-native";
import { Button, ThemeProvider, Header, Input } from "react-native-elements";
import {
  firebase,
  firebase_sign_in_anonymous,
  firebase_sign_up,
  firebase_sign_in,
  firebase_sign_out,
  firebase_sign_in_google
} from "../../firebase";

function Login({ navigation }) {
  const [password, updatePassword] = useState("");
  const [email, updateEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, updateLoading] = useState(false);
  const [visible, setVisible] = useState(0);

  const onLoginSubmit = () => {
    if (email === "") {
      setMessage("Email can't be empty.");
      setVisible(1);
    } else if (password === "") {
      setMessage("Password can't be empty.");
      setVisible(1);
    } else {
      updateLoading(true);
      firebase_sign_in({ email, password })
        .then(response => {
          const uid = response.user.uid;

          firebase
            .database()
            .ref("users")
            .child(uid)
            .once("value")
            .then(snapshot => {
              const user = snapshot.val();
              console.log({ user });
              navigation.navigate("Home", { user: user });
            });
        })
        .catch(error => {
          updateLoading(false);
          setMessage(String(error));
          setVisible(1);
        });
    }
  };

  const onGoogleSubmit = () => {
    firebase_sign_in_google().then(response => {
      console.log({ response });
    });
  };

  const onSignUpSubmit = () => {
    navigation.navigate("SignUp");
  };
  return (
    <View style={styles.container}>
      <Input placeholder="Email" onChangeText={updateEmail} value={email} />
      <Input placeholder="Password" secureTextEntry={true} onChangeText={updatePassword} value={password} />
      <Button onPress={onLoginSubmit} title="Login" />
      <Button onPress={onGoogleSubmit} title="Google" />
      <Button onPress={onSignUpSubmit} title="SignUp" />
      <Text>{message}</Text>
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
