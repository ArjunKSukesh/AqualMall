import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Image, StyleSheet, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { auth, db } from "../firebase";

import firebase from "firebase/compat/app";
const SellProfile = ({ navigation }) => {
  const [userData, setUserData] = useState({});
  const currentUser = auth.currentUser;

  useEffect(() => {
    db.collection("users")
      .where("email", "==", currentUser.email)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc);
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          setUserData(doc.data());
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  }, []);
  const [imageUri, setImageUri] = useState(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      //setImageUri(result.uri);
      const selectedImageUri = result.assets[0].uri;
      setImageUri(selectedImageUri);
    }
  };

  return (
    <View style={styles.view1}>
      <View style={styles.imageView}>
        <View style={styles.borderView}>
          <TouchableOpacity onPress={pickImage}>
            {imageUri ? (
              <Image source={{ uri: imageUri }} style={styles.image} />
            ) : (
              <Ionicons name="person-circle-outline" size={140} color="grey" />
            )}
          </TouchableOpacity>
        </View>
      </View>
      <View style={[styles.view2, styles.col]}>
        <View
          style={{
            flexDirection: "row",
            marginTop: 10,
            width: 300,
            height: 35,
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <Ionicons
            name="person-outline"
            size={25}
            style={{ marginLeft: 30 }}
          />
          <Text style={{ marginLeft: 50 }}>{userData?.name}</Text>
        </View>
        <View
          style={{ width: 320, height: 1, backgroundColor: "#dcdcdc" }}
        ></View>
        <View
          style={{
            marginBottom: 10,
            flexDirection: "row",
            marginTop: 5,
            //backgroundColor: "blue",
            width: 300,
            height: 35,
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <Ionicons name="call-outline" size={25} style={{ marginLeft: 30 }} />
          <Text style={{ marginLeft: 50 }}>{userData?.phone}</Text>
        </View>
        <View
          style={{ width: 320, height: 1, backgroundColor: "#dcdcdc" }}
        ></View>

        <View
          style={{
            flexDirection: "row",
            marginTop: 10,
            width: 300,
            height: 25,
            alignItems: "center",
            justifyContent: "flex-start",
            marginBottom:10
          }}
        >
          <Ionicons name="mail-outline" size={25} style={{ marginLeft: 30 }} />
          <Text style={{ marginLeft: 50 }}>{userData?.email}</Text>
        </View>
        <View
          style={{ width: 320, height: 1, backgroundColor: "#dcdcdc" }}
        ></View>
        <View
          style={{
            flexDirection: "row",
            marginTop: 10,
            width: 300,
            height: 120,
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <Ionicons
            name="location-outline"
            size={25}
            style={{ marginLeft: 30 }}
          />
          <Text style={{ marginLeft: 50 }}> {userData?.address}</Text>
        </View>
        <View
          style={{ width: 320, height: 1, backgroundColor: "#dcdcdc" }}
        ></View>
      </View>
      <View style={styles.buttonView}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={async () => {
            await firebase.auth().signOut();
            navigation.navigate("Login Page");
          }}
          style={[styles.button, styles.logoutBut]}
        >
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  view1: {
    flex: 1,
    alignItems: "center",
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15,
  },
  imageView: {
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 150,
    height: 150,
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 100,
  },
  borderView: {
    width: 150,
    height: 150,
    borderColor: "grey",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
  },
  view2: {
    marginTop: 5,
    //backgroundColor: "lightblue",
    width: "100%",
    alignItems: "center",
    height: 300,
  },
  button: {
    backgroundColor: "black",
    width: "95%",
    height: 50,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
  },
  buttonView: {
    width: "100%",
    alignItems: "center",
  },
  logoutBut: {
    marginTop: 5,
  },
  col: {
    flexDirection: "column",
  },
});

export default SellProfile;
