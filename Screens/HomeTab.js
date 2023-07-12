import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Card } from "react-native-paper";
import ItemDisplayCard from "../Common/ItemDisplayCard";
import { db } from "../firebase";
import Ionicons from "react-native-vector-icons/Ionicons";

const HomeTab = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [searchQuery, setsearchQuery] = useState("");

  const searchItem = (query) => {
    console.log(query, "query");
    db.collection("fishCollection")
      .where("name", ">=", query)
      .where("name", "<", query + "\uf8ff")
      .get()
      .then((querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
          items.push(doc.data());
        });

        setData(items);
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  };
  useEffect(() => {


    const unsubscribeNavigationFocus = navigation.addListener(
      'focus',
       () => {
        db.collection("fishCollection")
        .get()
        .then((querySnapshot) => {
          const items = [];
          
          querySnapshot.forEach((doc) => {
           
            console.log(doc.id)
            items.push({...doc.data(),id:doc.id});
          });
  
          setData(items);
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
      }
    );
  
    return unsubscribeNavigationFocus;

  }, [data]);
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginBottom:10
        }}
      >
        <TextInput
          style={styles.input}
          placeholder="Search Here"
          onChangeText={(value) => setsearchQuery(value)}
        />
        <TouchableOpacity
          style={{
            width: 50,
            height: 50,
            marginTop: 20,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Ionicons
            name="search-outline"
            size={40}
            onPress={() => {
              searchItem(searchQuery);
            }}
          />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.itemContainer}>
        {data.length != 0 ? (
          data.map((item, idx) => (
            <ItemDisplayCard navigation={navigation} key={idx} item={item} />
          ))
        ) : (
          <Text>No data</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 5,
  },
  search: {},
  input: {
    height: 50,
    width: 275,
    borderRadius: 5,
    borderWidth: 0.5,
    alignSelf: "center",
    paddingLeft: 10,
    marginTop: 20,
  },
});

export default HomeTab;
