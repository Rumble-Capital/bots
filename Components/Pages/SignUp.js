import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { Button, ThemeProvider, Header, Input } from "react-native-elements";
import {
  firebase,
  firebase_sign_in_anonymous,
  firebase_sign_up,
  firebase_sign_in,
  firebase_sign_out,
  firebase_sign_in_google
} from "../../firebase";

function SignUp({ navigation }) {
  const [password, updatePassword] = useState("");
  const [email, updateEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, updateLoading] = useState(false);
  const [visible, setVisible] = useState(0);

  const onSubmit = () => {
    if (email === "") {
      setMessage("Email can't be empty.");
      setVisible(1);
    } else if (password === "") {
      setMessage("Password can't be empty.");
      setVisible(1);
    } else {
      updateLoading(true);
      firebase_sign_up({ email, password })
        .then(response => {
          const uid = response.user.uid;
          const data = {
            id: uid,
            email
          };

          const firebaseRef = firebase.database().ref("users");
          firebaseRef
            .child(uid)
            .set(data)
            .then(() => {
              navigation.navigate("Home", { user: data });
            })
            .catch(error => {
              alert(error);
            });
          // const usersRef = firebase.firestore().collection("users");
          // usersRef
          //   .doc(uid)
          //   .set(data)
          //   .then(() => {
          //     navigation.navigate("Home", { user: data });
          //   })
          //   .catch(error => {
          //     alert(error);
          //   });
        })
        .catch(error => {
          updateLoading(false);
          console.log({ error });
          setMessage(String(error));

          setVisible(1);
        });
    }
  };

  const onLoginNavigate = () => {
    navigation.navigate("Login");
  };
  return (
    <View style={styles.container}>
      <Input placeholder="Email" onChangeText={updateEmail} value={email} />
      <Input placeholder="Password" secureTextEntry={true} onChangeText={updatePassword} value={password} />
      <Button onPress={onSubmit} title="Sign Up" />
      <Button onPress={onLoginNavigate} title="Back" />
      <Text>{message}</Text>
    </View>
  );
}

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
