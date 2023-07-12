import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { Button } from "react-native-paper";
const ItemList = ({ route }) => {
  const { type } = route.params;

  const [editOn, setEditOn] = useState(false);



  const ItemCard = ({ item }) => {



    const updateStock = () => {
      if(stock=="")
      {
        alert("No input")
        return
      }
      console.log("update")
      db.collection("fishCollection").doc(item.id).update({quantity:parseInt(item?.quantity)+ parseInt(stock)}).then(data=>{
        console.log("updated",data)
      setStock("")
      setEditOn(false)
      fetchData()
      alert("Stock Updated")
      }).catch(err=>{
        console.log(err)
      })
    }
    
    const [stock, setStock] = useState("");
    return (
      <View style={styles.card}>
        <View style={{ flexDirection: "row" }}>
          <Image source={{ uri: item?.images }} style={styles.image} />

          <View style={styles.details}>
            <Text style={[styles.text,{fontWeight:"800",fontSize:20}]}>{item?.name}</Text>
            {/* <Text style={[styles.text, styles.textSpace]}>{item?.origin}</Text> */}
            <Text style={[styles.text, styles.textSpace]}>
              Quantity: {item?.quantity}
            </Text>
       {type=="Fish" &&      <Text style={[styles.text, styles.textSpace]}>
          
          Size: {item?.size}
        </Text>}
            <Text style={[styles.text, styles.textSpace]}>
              Rs {item?.price}
            </Text>

            <TouchableOpacity
              style={styles.editButton}
              onPress={() => setEditOn(!editOn)}
            >
              <Text style={styles.buttonColor}>Edit</Text>
            </TouchableOpacity>

            {editOn && (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignContent: "center",
                  padding: 5,
                }}
              >
                <TextInput
                  placeholder="New Stock"
                  value={stock}
                  keyboardType="number-pad"
                  style={[
                    {
                      height: 50,
                      borderRadius: 10,
                      borderWidth: 0.5,
                      alignSelf: "center",
                      padding: 5,
                      color: "black",
                    },
                  ]}
                  onChangeText={setStock}
                />

                <TouchableOpacity
                onPress={()=>updateStock()}
                  style={[styles.editButton, { width: "20%", marginLeft: 5 }]}
                >
                  <Text style={styles.buttonColor}>+</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </View>
    );
  };

  const [data, setData] = useState([]);
  useEffect(() => {
fetchData()
  }, []);
  const currentUser = auth.currentUser;
const fetchData = () => {
  db.collection("fishCollection")
  .where("product", "==", type).where("email","==",currentUser.email)
  .get()
  .then((querySnapshot) => {
    const items = [];
    querySnapshot.forEach((doc) => {
      console.log(doc.id);
      items.push({...doc.data(),id:doc.id});
    });

    setData(items);
  })
  .catch((error) => {
    console.log("Error getting documents: ", error);
  });
}



  return (
    <View style={styles.view1}>
      <View style={styles.headerView}>
        <Text style={styles.headerText}>{type} List</Text>
      </View>

      <ScrollView contentContainerStyle={styles.body}>
        {data.length != 0 ? (
          data.map((item, idx) => <ItemCard key={idx} item={item} />)
        ) : (
          <Text>No data</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  view1: {
    flex: 1,
  },
  headerView: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 60,
    backgroundColor: "black",
    // marginTop:5,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  body: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",

    //marginTop:10,
    alignItems: "center",
  },
  card: {
    paddingBottom: 10,
    backgroundColor: "white",
    // height: 200,
    width: "90%",
    marginTop: 10,
    borderRadius: 15,
    alignItems: "flex-start",
    //justifyContent:'center',
  },
  input: {
    height: 50,
    width: "85%",
    borderRadius: 10,
    borderWidth: 0.5,
    alignSelf: "center",
    paddingLeft: 20,
    marginTop: 20,
    color: "black",
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: "contain",
    backgroundColor: "lightblue",
    borderRadius: 10,
    marginLeft: 15,
    marginTop: 15,
  },
  details: {
    width: 160,
    //backgroundColor:'blue',
    marginLeft: 5,
    marginTop: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    //marginLeft:5
    
    fontSize: 15,
  },
  textSpace: {
    marginTop: 3,
  },
  editButton: {
    backgroundColor: "black",
    width: 120,
    height: 35,
    borderRadius: 10,
    marginTop: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonColor: {
    color: "white",
    fontSize: 17,
  },
});

export default ItemList;
