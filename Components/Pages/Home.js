import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, Fragment, useRef } from "react";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import { StyleSheet, Text, View } from "react-native";
import { Button, ThemeProvider, Header, Input, CheckBox } from "react-native-elements";
import { firebase, firebase_sign_out } from "../../firebase";
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false
  })
});
function Home({ navigation }) {
  const [phoneNumber, updatePhoneNumber] = useState("");
  const [checkBoxStateQuote, updateCheckBoxStateQuote] = useState(false);

  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  const firebaseRef = firebase
    .database()
    .ref("users")
    .child(firebase.auth().currentUser.uid);

  useEffect(() => {
    firebaseRef.on("value", snapshot => {
      const snapshot_data = snapshot.val();
      const phoneNumber = snapshot_data["phoneNumber"] || "";
      updateCheckBoxStateQuote(snapshot_data["checkBoxStateQuote"] || false);
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

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => {
      setExpoPushToken(token);
      firebaseRef.update({ ExpoPushToken: token });
    });

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);
  return (
    <View style={styles.container}>
      <Text>Enter Your Phone Number to Receive Bot Alerts</Text>
      <Input placeholder="Phone Number" onChangeText={updatePhoneNumber} value={phoneNumber} />
      <Button onPress={onSubmit} title="Submit" />
      <CheckBox
        title="Quote Bot"
        checked={checkBoxStateQuote}
        onPress={() => {
          firebaseRef.update({ checkBoxStateQuote: !checkBoxStateQuote });
          updateCheckBoxStateQuote(!checkBoxStateQuote);
        }}
      />
      <Button onPress={onSignOut} title="Sign Out" />
      <StatusBar style="auto" />
    </View>
  );
}
async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C"
    });
  }

  return token;
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
