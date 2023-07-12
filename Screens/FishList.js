import { View, Text, StyleSheet, Image, TouchableOpacity,ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { auth, db } from '../firebase';
const FishList = ({ route }) => {


  const { type } = route.params



  const ItemCard = ({item}) => {
    return <View style={styles.card}>
      <View style={{ flexDirection: 'row' }}>
        <Image
        source={{uri:item?.images}}
          style={styles.image}
        />

        {/* {console.log(object)} */}
        <View style={styles.details}>
          <Text style={styles.text}>{item?.name}</Text>
          <Text style={[styles.text, styles.textSpace]}>Origin: {item?.origin}</Text>
          <Text style={[styles.text, styles.textSpace]}>Quantity: {item?.quantity}</Text>
          <Text style={[styles.text, styles.textSpace]}> Size: {item?.size}</Text>
          <Text style={[styles.text, styles.textSpace]}>Rs {item?.price}</Text>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.buttonColor}>Edit</Text>
          </TouchableOpacity>


        </View>

      </View>
    </View>
  }




  const [data, setData] = useState([]);
  useEffect(() => {

  
    db.collection("fishCollection").where('product', '==', type)
      .get()
      .then((querySnapshot) => {
        const items = []
        querySnapshot.forEach((doc) => {
          console.log(doc)
          items.push(doc.data())


        });

        setData(items)
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });


  }, []);

  console.log(data)
  return (
    <View style={styles.view1}>
      <View style={styles.headerView}>
        <Text style={styles.headerText}>{type} List</Text>
      </View>

      <ScrollView contentContainerStyle={styles.body} >
{
data.length!=0?data.map((item,idx)=><ItemCard item={item}/>):<Text>No data</Text>
}


      </ScrollView>
    
    </View>
  )
}

const styles = StyleSheet.create({
  view1: {
    flex: 1
  },
  headerView: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 60,
    backgroundColor: 'black',
    marginTop: 40

  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white'
  },
  body: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',

    //marginTop:10,
    alignItems: 'center'
  },
  card: {
    backgroundColor: 'white',
    height: 200,
    width: '90%',
    marginTop: 10,
    borderRadius: 15,
    alignItems: 'flex-start',
    //justifyContent:'center',


  },
  image: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    backgroundColor: 'lightblue',
    borderRadius: 10,
    marginLeft: 15,
    marginTop: 15
  },
  details: {
    width: 160,
    //backgroundColor:'blue',
    marginLeft: 5,
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center'

  },
  text: {
    //marginLeft:5
    fontSize: 15
  },
  textSpace: {
    marginTop: 3
  },
  editButton: {
    backgroundColor: 'black',
    width: 120,
    height: 35,
    borderRadius: 10,
    marginTop: 6,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonColor: {
    color: 'white',
    fontSize: 17
  }


})


export default FishList