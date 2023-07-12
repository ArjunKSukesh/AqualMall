import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableHighlight,
} from "react-native";
import React, { useState } from "react";
import { Card } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";
import { db, auth } from "../firebase";
import firebase from "firebase/compat/app";
import RazorpayCheckout from "react-native-razorpay";
const ItemView = ({ route, navigation }) => {
  const [isBuyNow, setIsBuyNow] = useState(false);
  const [userIp, setUserIp] = useState({ count: 0, address: "" });
  const { item } = route.params;
console.log(item)
let userMail=firebase.auth().currentUser.email
  const addOrder = () => {
    db.collection("orders")
      .add({
        product: item,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        total:parseInt(userIp?.count) * parseInt(item?.price),
        details: userIp,
        status: "ordered",
        orderedBy:userMail
      })
      .then(() => {
        db.collection("fishCollection").doc(item.id).update({quantity:parseInt(item?.quantity)-parseInt(userIp?.count)})
        let statusText= statusText=`${item?.name} is ordered.`
        db.collection("notification")
        .add({
          message: statusText,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          to:userMail,
          image:item?.images,
          status:"ordered"

        })
        .then(() => {
          let text= statusText=`New order for ${item?.name}(${userIp.count} nos)`

          db.collection("notification").add({
            message: text,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            to:item?.email,
            image:item?.images,
            status:"ordered"
          })
          navigation.navigate("cart");
    
         
        })
        .catch((error) => {
        
         
        });
        alert("Order placed");


        
        
        
        navigation.navigate("Home")
        console.log("Order Document successfully written!");
      })
      .catch((error) => {
      
        console.error("Error writing Order document: ", error);
      });
  };

  return (
    <View activeOpacity={0.7} style={[styles.container]}>
      <View style={styles.headerContainer}>
        <Ionicons
          name="chevron-back-outline"
          size={30}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>Product</Text>
      </View>

      <ScrollView contentContainerStyle={{ flex: 1 }}>
        <View style={{ height: "70%" }}>
          <Image style={styles.img} source={{ uri: item?.images }} />

          <Text style={styles.name}> {item?.name}</Text>
          <Text style={styles.heading}> Description</Text>
          <Text style={styles.text}> {item?.origin}</Text>
          <Text style={styles.heading}> Price </Text>
          <Text style={styles.text}> Rs {item?.price}</Text>
          <Text style={styles.heading}> Available Stock </Text>
          <Text style={styles.text}> {item?.quantity}</Text>
          {/* <Text style={styles.heading}> Address </Text>
          <Text style={styles.text}> {item?.address}</Text> */}
        </View>
        {isBuyNow ? (
          <KeyboardAvoidingView behavior="padding" style={{ zIndex: 5 }}>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              onChangeText={(e) => setUserIp({ ...userIp, count: e })}
              value={userIp.count}
              placeholder="Enter Count"
            />
            <TextInput
              style={styles.input}
              onChangeText={(e) => setUserIp({ ...userIp, address: e })}
              value={userIp.address}
              multiline
              placeholder="Enter Address"
            />
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <TouchableOpacity
                style={[styles.touch, { width: "40%", marginHorizontal: 4 }]}
                onPress={() => {
                  var options = {
                    description: "For buying" + item?.name,
                    image: "https://i.imgur.com/3g7nmJC.png",
                    currency: "INR",
                    key: "rzp_test_YFxaXTgGlL6PZC", // Your api key
                    amount:
                      parseInt(userIp?.count) * parseInt(item?.price) * 100,
                    name: "Aqua Mall",

                    theme: { color: "#F37254" },
                  };
                  RazorpayCheckout.open(options)
                    .then((data) => {
                      // handle success
                      console.log(`Order Successfully placed`);
                      addOrder();
                    })
                    .catch((error) => {
                      console.log(error)
                      // handle failure
                      alert(`Error: ${error.code} | ${error.description}`);
                    });
                }}
              >
                <Text style={styles.touchText}>
                  Pay {parseInt(userIp?.count) * parseInt(item?.price)}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.touch, { width: "40%" }]}
                onPress={() => {
                  setIsBuyNow(false);
                }}
              >
                <Text style={styles.touchText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        ) : (
          <TouchableOpacity
            style={styles.touch}
            onPress={() => {
              setIsBuyNow(true);
            }}
          >
            <Text style={styles.touchText}>Buy Now</Text>
          </TouchableOpacity>
        )}
        <View></View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 20,

    lineHeight: 20 * 1.4,
    width: "80%",
    textAlign: "center",
  },
  heading: {
    fontSize: 20,
    fontWeight: "600",
    marginLeft: 20,
  },
  img: {
    height: "40%",
    width: "80%",
    resizeMode: "contain",
    alignSelf: "center",
    borderRadius: 4,
  },
  name: {
    marginLeft: 20,
    fontWeight: "bold",

    fontSize: 35,
  },
  text: {
    marginLeft: 20,
    fontSize: 15,
  },
  container: {
    backgroundColor: "white",
    borderRadius: 8,
    flex: 1,
    margin: 5,

    justifyContent: "flex-start",
  },
  touch: {
    alignItems: "center",
    height: 50,
    width: "85%",
    justifyContent: "center",
    backgroundColor: "#000",
    borderRadius: 10,
    alignSelf: "center",
    marginTop: 20,
  },
  touchText: {
    color: "white",
    fontSize: 19,
  },
  input: {
    height: 50,
    width: "85%",
    borderRadius: 10,
    borderWidth: 0.5,
    alignSelf: "center",
    paddingLeft: 20,

    marginTop: 10,
  },
  loginText: {
    fontSize: 30,
    marginTop: 35,
    fontWeight: "600",
  },
});

export default ItemView;
