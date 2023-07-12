import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";

import { useState } from "react";
import { useEffect } from "react";
import { db, auth } from "../firebase";
import firebase from "firebase/compat/app";
import OrderCard from "../Common/OrderCard";

const SellerOrders = () => {
  const navigation = useNavigation();


  let userMail=firebase.auth().currentUser.email

const [orders, setOrders] = useState([]);


useEffect(() => {


  const unsubscribeNavigationFocus = navigation.addListener(
    'focus',
     () => {
      db.collection("orders").where("product.email","==",userMail)
      .get()
      .then((querySnapshot) => {
        const items = [];
        
        querySnapshot.forEach((doc) => {
         
          console.log(doc.id)
          items.push({...doc.data(),id:doc.id});
        });

        setOrders(items);
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
    }
  );

  return unsubscribeNavigationFocus;

}, [orders]);
console.log(firebase.auth().currentUser)
  return (
    <View style={styles.container}>
      <View style={styles.view1}>
        <ScrollView>
 
{
  orders.length!=0 && orders.map((item,i)=><OrderCard user="sell" item={item} key={i}/>)
}
   
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  view1: {
    flex: 1,
    height: "100%",
    width: "100%",
    alignItems: "center",
  },

  view2: {
    width: 350,
    height: 260,
    borderColor: "black",
    borderWidth: 0.5,
    flexDirection: "column",
  },
  images: {
    width: 150,
    height: 150,
    backgroundColor: "grey",
    borderRadius: 4,
  },
  row: {
    flexDirection: "row",
    margin: 5,
  },
  row1: {
    flexDirection: "row",
    
  },
  view3: {
    marginLeft: 5,
    marginTop: 5,
  },
  text1: {
    fontSize: 35,
  },
  text2: {
    color: "grey",
    fontSize: 17,
  },
  topMargin: {
    marginTop: 5,
  },
  btn1: {
    width: 160,
    height: 50,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  view4: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  text: {
    color: "white",
    fontSize: 20,
  },
  cancel:{
    marginLeft:5
  }
});

export default SellerOrders;
