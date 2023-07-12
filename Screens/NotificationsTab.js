import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { db, auth } from "../firebase";
import { useState } from "react";
import Stars from "react-native-stars";
import firebase from "firebase/compat/app";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
const Notifications = () => {
  const [data, setData] = useState([]);
  const navigation = useNavigation();
  const currentUser = auth.currentUser;
  const [stars, setStars] = useState("");
  const updateFeedBack = (item) => {

    db.collection("notification").doc(item.id).update({ stars: stars });
    db.collection("notification")
      .add({
        message: `Feed back received for ${item?.product} by ${currentUser.email?.split("@")[0]}`,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        to: item?.from,
        from: currentUser.email,
        image: item?.image,
        type: "feedback",
        stars: stars,
        details: item,
      })
      .then(() => {
        alert("Feedback done")
        navigation.navigate("Notifications");
      })
      .catch((error) => {});
  };

  React.useEffect(() => {
    const unsubscribeNavigationFocus = navigation.addListener("focus", () => {
      db.collection("notification")
        .where("to", "==", currentUser.email)
        .orderBy("createdAt", "desc")
        .get()
        .then((querySnapshot) => {
          const items = [];

          querySnapshot.forEach((doc) => {
         
            items.push({ ...doc.data(), id: doc.id });
          });

          setData(items);
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    });

    return unsubscribeNavigationFocus;
  }, [data]);
  
  return (
    <View style={styles.container}>
      {data.length != 0 &&
        data.map((item, i) => (
          <View
            key={i}
            style={{
              backgroundColor: "#d3d3d3",
              alignItems: "center",
              marginTop: 5,
              flexDirection: "row",

              borderRadius: 10,
              justifyContent: "flex-start",
            }}
          >
            <Image
              style={{
                width: 60,
                height: 60,
                borderRadius: 10,
                resizeMode: "contain",
              }}
              source={{ uri: item?.image }}
            />
            <Text style={{ fontSize: 15, paddingLeft: 5, flex: 1 }}>
              {item?.message}
            </Text>
            <View>
              {item?.type == "delivered" && (
                <View style={{ alignItems: "center" }}>
                  {!item?.stars ? (
                    <>
                      <Stars
                        default={0}
                        count={5}
                        update={(val) => {
                          setStars(val);
                        }}
                        starSize={50}
                        fullStar={
                          <Icon
                            name={"star"}
                            size={25}
                            style={[styles.myStarStyle]}
                          />
                        }
                        emptyStar={
                          <Icon
                            name={"star-outline"}
                            size={25}
                            style={[
                              styles.myStarStyle,
                              styles.myEmptyStarStyle,
                            ]}
                          />
                        }
                        halfStar={
                          <Icon
                            name={"star-half"}
                            size={25}
                            style={[styles.myStarStyle]}
                          />
                        }
                      />
                      <TouchableOpacity
                        onPress={() => updateFeedBack(item)}
                        style={{
                          backgroundColor: "black",
                          borderRadius: 10,
                          padding: 10,
                          justifyContent: "center",
                        }}
                      >
                        <Text style={{ color: "white" }}>Send</Text>
                      </TouchableOpacity>
                    </>
                  ) : (
                    <Stars
                      default={0}
                      count={5}
                      display={item?.stars}
                      starSize={50}
                      fullStar={
                        <Icon
                          name={"star"}
                          size={25}
                          style={[styles.myStarStyle]}
                        />
                      }
                      emptyStar={
                        <Icon
                          name={"star-outline"}
                          size={25}
                          style={[styles.myStarStyle, styles.myEmptyStarStyle]}
                        />
                      }
                      halfStar={
                        <Icon
                          name={"star-half"}
                          size={25}
                          style={[styles.myStarStyle]}
                        />
                      }
                    />
                  )}
                </View>
              )}
            </View>
          </View>
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  myStarStyle: {
    color: "yellow",
    backgroundColor: "transparent",
    textShadowColor: "black",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  myEmptyStarStyle: {
    color: "white",
  },
  container: {
    flex: 1,

    paddingHorizontal: 10,
  },
});

export default Notifications;
