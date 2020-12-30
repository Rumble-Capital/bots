import * as firebase from "firebase";
import "firebase/auth";
import "@firebase/firestore";
import React, { useState, useEffect } from "react";

var firebaseConfig = {
  apiKey: "AIzaSyA8CayNjq_3waCPH533_Haij8scNzIM_H8",
  authDomain: "evolve-6b9a3.firebaseapp.com",
  databaseURL: "https://evolve-6b9a3.firebaseio.com",
  projectId: "evolve-6b9a3",
  storageBucket: "evolve-6b9a3.appspot.com",
  messagingSenderId: "408948735077",
  appId: "1:408948735077:web:11c577a47ef8c0acac5a8c",
  measurementId: "G-S5DY8CVKB0"
};

firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged(user => {
  if (user != null) {
    console.log("We are authenticated now!");
  }
  console.log({ user });
});

export function firebase_sign_in_anonymous() {
  return firebase
    .auth()
    .signInAnonymously()
    .then(response => console.log({ response }))
    .catch(error => console.log({ error }));
}

export function firebase_sign_in_google() {
  var provider = new firebase.auth.GoogleAuthProvider();
  console.log({ provider });
  return firebase
    .auth()
    .signInWithPopup(provider)
    .then(response => console.log({ response }))
    .catch(error => console.log({ error }));
}
export function firebase_sign_up({ email, password }) {
  return firebase.auth().createUserWithEmailAndPassword(email, password);
}

export function firebase_sign_in({ email, password }) {
  return firebase.auth().signInWithEmailAndPassword(email, password);
}

export function firebase_sign_out() {
  return firebase
    .auth()
    .signOut()
    .then(response => {
      console.log({ response });
    })
    .catch(err => {
      console.log({ err });
    });
}

function document_data_from_snapshot(snapshot) {
  const downloadedDocuments = snapshot.docs.map(document => ({ id: document.id, ...document.data() }));
  return downloadedDocuments;
}

function document_state_update_if_change({ documents, downloadedDocuments, setDocuments }) {
  if (JSON.stringify(documents) != JSON.stringify(downloadedDocuments)) {
    setDocuments(downloadedDocuments);
  }
}
function firebase_collection_define(collection_name, uid) {
  let unsubscribe = firebase
    .firestore()
    .collection(collection_name)
    .where("id", "==", uid || "");
  return unsubscribe;
}

function firestore_load({ documents, setDocuments, collection_name, uid }) {
  let unsubscribe = firebase_collection_define(collection_name, uid);
  unsubscribe.onSnapshot(snapshot => {
    const downloadedDocuments = document_data_from_snapshot(snapshot);
    document_state_update_if_change({ documents, downloadedDocuments, setDocuments });
  });
  //return () => unsubscribe();
}

function delete_firebase_firestore({ id, collection_name }) {
  return firebase
    .firestore()
    .collection(collection_name)
    .doc(id)
    .delete()
    .then(() => {
      console.log("deleted");
    })
    .catch(err => {});
}

function set_firebase_firestore({ update_dict, id, collection_name }) {
  return firebase
    .firestore()
    .collection(collection_name)
    .doc(id)
    .set(update_dict)
    .then(() => {
      console.log("success");
    })
    .catch(err => {});
}

export const useFirestore = ({ uid }) => {
  const [users, updateUsers] = useState([]);

  function setUser(update_dict) {
    set_firebase_firestore({ update_dict, id: uid, collection_name: "users" });
  }

  function deleteUser({ id }) {
    delete_firebase_firestore({ id, collection_name: "users" });
  }
  useEffect(() => {
    return firestore_load({ documents: users, setDocuments: updateUsers, collection_name: "users", uid });
  }, [uid]);

  return { users, setUser, deleteUser };
};

export { firebase };
