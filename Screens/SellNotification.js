import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { db, auth } from "../firebase";
import { useState } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Stars from "react-native-stars";
const SellNotification = () => {
  const [data, setData] = useState([]);
  const navigation = useNavigation();
  const currentUser = auth.currentUser;
  React.useEffect(() => {
    const unsubscribeNavigationFocus = navigation.addListener("focus", () => {
      db.collection("notification")
        .where("to", "==", currentUser.email).orderBy("createdAt","desc")
        .get()
        .then((querySnapshot) => {
          const items = [];

          querySnapshot.forEach((doc) => {
            console.log(doc.id);
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
  console.log(data);
  return (
    <View style={styles.container}>
      <Text style={{ textAlign: "center", fontWeight: "800", fontSize: 30 }}>
        Notifications
      </Text>
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
              }}
              source={{ uri: item?.image }}
            />
            <Text style={{ fontSize: 15, paddingLeft: 5, flex: 1 }}>
              {item?.message}
            </Text>
            <View>
              {item?.type == "feedback" && (
                <View style={{ alignItems: "center" }}>
                
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

export default SellNotification;
