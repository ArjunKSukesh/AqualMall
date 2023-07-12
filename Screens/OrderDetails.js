import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import firebase from "firebase/compat/app";
import moment from "moment";
const OrderDetails = ({ route, navigation }) => {
  const item = route.params.data;
  const currentUser = auth.currentUser;

  const [buyer, setBuyer] = useState(null);
  const updateStatus = (status = "dispatched") => {
    let statusText;
    if (status == "dispatched") {
      statusText = `Your product ${
        item?.product?.name
      } is ${status}.Will be delivered on ${moment
        .unix(item.createdAt.seconds)
        .add(3, "days")
        .format("MMM Do YYYY")}`;
    } else if (status == "delivered") {
      statusText = `Your product ${
        item?.product?.name
      } is ${status} on ${moment().format("MMM Do YYYY")}`;
    }

    db.collection("orders").doc(item.id).update({ status: status });
    db.collection("notification")
      .add({
        message: statusText,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        to: buyer?.email,
        from: currentUser.email,
        image: item?.product?.images,
        type: status,
        product: item?.product?.name,
      })
      .then(() => {
        navigation.navigate("orders");
      })
      .catch((error) => {});
  };

  const ActionButton = () => {
    if (item.status == "ordered")
      return (
        <TouchableOpacity
          style={styles.touch}
          onPress={() => updateStatus("dispatched")}
        >
          <Text style={styles.touchText}>Dispatch</Text>
        </TouchableOpacity>
      );
    if (item.status == "dispatched")
      return (
        <TouchableOpacity
          style={styles.touch}
          onPress={() => updateStatus("delivered")}
        >
          <Text style={styles.touchText}>Mark as delivered</Text>
        </TouchableOpacity>
      );
    if (item.status == "delivered")
      return (
        <TouchableOpacity style={styles.touch}>
          <Text style={styles.touchText}>Delivered</Text>
        </TouchableOpacity>
      );
  };

  useEffect(() => {
    db.collection("custmer")
      .where("email", "==", item.orderedBy)
      .get()
      .then((querySnapshot) => {
        console.log(querySnapshot.docs);
        if (!querySnapshot.empty) {
          const user = querySnapshot.docs[0].data();
          setBuyer(user);
        }
      });
  }, []);
  return (
    <View style={styles.v1}>
      <View style={styles.v2}>
        <Text style={styles.t1}>OrderDetails</Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          marginLeft: 10,
          marginTop: 10,
          alignItems: "center",
        }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 17 }}>Delivery To :</Text>
        {/* <TouchableOpacity
          style={{
            borderWidth: 1,
            marginLeft: 170,
            width: 60,
            alignItems: "center",
            height: 25,
            borderRadius: 5,
            justifyContent: "center",
          }}
        >
          <Text>Change</Text>
        </TouchableOpacity> */}
      </View>

      <View style={styles.v3}>
        <Text style={{ fontWeight: "bold", fontSize: 17, marginTop: 1 }}>
          {buyer?.name}
        </Text>
      </View>
      <View style={styles.v3}>
        <Text style={{ fontSize: 17, marginRight: 5 }} numberOfLines={3}>
          {item?.details?.address}
        </Text>
      </View>
      <View
        style={{
          width: "100%",
          height: 10,
          backgroundColor: "#dcdcdc",
          marginTop: 15,
        }}
      ></View>

      <View style={styles.view2}>
        <View style={styles.row}>
          <View>
            <Image
              source={{ uri: item?.product?.images }}
              style={styles.images}
            />
          </View>
          <View style={styles.view3}>
            <Text style={styles.text1}>{item?.product?.name} </Text>
            <Text style={[styles.text2, styles.topMargin]}>
              Quantity :{item?.details?.count}
            </Text>
            <Text style={[styles.text1, styles.topMargin]}>
              {"\u20B9"}
              {item?.product?.price}
            </Text>
          </View>
        </View>
        {console.log(item.createdAt.seconds)}
        {console.log(moment.unix(item.createdAt.seconds).format("MMM Do YY"))}
        <View style={[styles.view4, styles.row1]}>
          <Text>
            Ordered On{" "}
            {moment.unix(item.createdAt.seconds).format("MMM Do YYYY")} |{" "}
          </Text>
          <Text>
            Delivery by{" "}
            {moment
              .unix(item.createdAt.seconds)
              .add(3, "days")
              .format("MMM Do YYYY")}
          </Text>
        </View>
      </View>

      <View
        style={{
          width: "100%",
          height: 10,
          backgroundColor: "#dcdcdc",
          marginTop: 15,
        }}
      ></View>

      <View style={{ flexDirection: "column", margin: 6 }}>
        <View style={{ width: "100%", height: 30, justifyContent: "center" }}>
          <Text style={{ fontSize: 18, fontWeight: "bold", marginLeft: 5 }}>
            Price Details
          </Text>
        </View>
        <View
          style={{
            width: "100%",
            height: 20,
            justifyContent: "flex-start",
            flexDirection: "row",
          }}
        >
          <Text style={{ fontSize: 15, marginLeft: 5 }}>
            Price ({item?.details?.count} item)
          </Text>
          <Text style={{ fontSize: 15, marginLeft: 170 }}>
            {"\u20B9"} {item?.product?.price * item?.details?.count}
          </Text>
        </View>
        <View
          style={{
            width: "100%",
            height: 20,
            justifyContent: "flex-start",
            flexDirection: "row",
            marginTop: 6,
          }}
        >
          <Text style={{ fontSize: 15, marginLeft: 5 }}>Delivery Charges</Text>
          <Text style={{ fontSize: 15, marginLeft: 150 }}>{"\u20B9"} 50</Text>
        </View>
        <View
          style={{
            width: "100%",
            height: 2,
            backgroundColor: "#dcdcdc",
            marginTop: 15,
          }}
        ></View>
        <View
          style={{
            width: "100%",
            height: 20,
            justifyContent: "flex-start",
            flexDirection: "row",
            marginTop: 6,
          }}
        >
          <Text style={{ fontSize: 15, marginLeft: 5 }}>Total amount</Text>
          <Text style={{ fontSize: 15, marginLeft: 175 }}>
            {"\u20B9"} {item?.product?.price * item?.details?.count + 50}
          </Text>
        </View>
        <View
          style={{
            width: "100%",
            height: 2,
            backgroundColor: "#dcdcdc",
            marginTop: 15,
          }}
        ></View>
        <View style={{ height: 51, width: "100%", alignItems: "center" }}>
          <ActionButton />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  v1: {
    flexDirection: "column",
    height: "100%",
    width: "100%",
  },
  v2: {
    width: "100%",
    height: 50,
    //backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "center",
    borderBottomColor: "grey",
    borderBottomWidth: 1,
  },
  t1: {
    fontSize: 25,
    fontWeight: "bold",
  },
  v3: {
    height: 80,
    justifyContent: "center",
    marginLeft: 10,
    marginRight: 5,
    //backgroundColor: "lightblue",
  },
  row: {
    flexDirection: "row",
  },
  view1: {
    flex: 1,
    height: "100%",
    width: "100%",
    alignItems: "center",
  },

  view2: {
    width: 350,
    height: 200,
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
  cancel: {
    marginLeft: 5,
  },
  touch: {
    alignItems: "center",
    height: 50,
    width: "85%",
    justifyContent: "center",
    backgroundColor: "#000",
    borderRadius: 10,
    marginTop: 20,
  },
  touchText: {
    color: "white",
    fontSize: 19,
  },
});

export default OrderDetails;
