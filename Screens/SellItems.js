import React, { useEffect, useState } from 'react';
import { TextInput, Image, TouchableOpacity, StyleSheet, Text, View, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import { db,auth } from '../firebase';
import 'firebase/compat/storage';
import firebase from 'firebase/compat/app';
const storageRef = firebase.storage().ref();

export default function SellItems() {

  const currentUser = auth.currentUser;
  const [userData, setUserData] = useState({});
  useEffect(() => {

  
    db.collection("users").where('email','==',currentUser.email)
    .get()
    .then((querySnapshot) => {
  
        querySnapshot.forEach((doc) => {
          console.log(doc)
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            setUserData(doc.data())
        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });


}, []);




  const [name, setName] = useState('');
  const [origin, setOrigin] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [size, setSize] = useState('');


  //dropdown list
  const [selectedValue, setSelectedValue] = useState('Fish');

  //imageUpload
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);

  const uploadImage = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    // Generate a unique ID for the image.
    const imageName = Math.random().toString(36).substring(7);

    // Upload the image to Firebase Storage.
    const ref = storageRef.child(`images/${imageName}`);
    await ref.put(blob);

    // Get the image URL.
    const url = await ref.getDownloadURL();
    return url;
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      const url = await uploadImage(result.assets[0].uri);
      setSelectedImage(url);
    }
  };
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit =  () => {
setIsLoading(true)
console.log("Submit")
    console.log(selectedValue)
    // Add a new document in the 'fishCollection' collection.
    db.collection('fishCollection')
      .add({
        name,
        origin,
        quantity,
        price,
        size,
        address:userData?.address,
        email:userData.email,
        product: selectedValue,
        images: selectedImage, 
        // Add the image URLs array.
      })
      .then(() => {
        setIsLoading(false)
        alert("Item Added")
        console.log('Document successfully written!');
      })
      .catch((error) => {
        setIsLoading(false)
        console.error('Error writing document: ', error);
      });
  };





  return (
    <View style={styles.view1}>
      <ScrollView>
      
    <View style={styles.view2}>
     
      {selectedImage && (
        <Image source={{ uri: selectedImage }} style={styles.image} />
      )}
      </View>
      <View style={styles.view3}>
      <TouchableOpacity
      style={styles.pickBut}
      onPress={pickImage}>
        <Text style={styles.textColor}>Pick Image</Text>
      </TouchableOpacity>

      </View>
      <View style={styles.picker}>
      <Picker
        style={styles.dropdown}
        selectedValue={selectedValue}
        onValueChange={(itemValue,itemIndex) => setSelectedValue(itemValue)}>
            <Picker.Item label = "Fish" value = "Fish"/>
            <Picker.Item label = "Food" value = "Food"/>
            <Picker.Item label = "Plants" value = "Plants"/>
            <Picker.Item label = "Stones" value = "Stones"/>
            <Picker.Item label = "Medicine" value = "Medicine"/>
            <Picker.Item label = "Fish Tanks" value = "Fish tanks"/>
            <Picker.Item label = "Old Tanks" value = "Old Tanks"/>
            <Picker.Item label = "Lights" value = "Lights"/>
            <Picker.Item label = "Filter" value = "Filter"/>

        </Picker>
    </View>

    <View style={styles.view3}>
      <TextInput
      placeholder='Enter Name'
      style={styles.input}
      onChangeText={setName}
      />
      <TextInput
      placeholder='Enter Description'
      style={styles.input}
      onChangeText={setOrigin}/>
      <TextInput
      placeholder='Enter Quantity'
      keyboardType='numeric'
      style={styles.input}
      onChangeText={setQuantity}/>
      <TextInput
      placeholder='Enter Price'
      keyboardType='numeric'
      style={styles.input}
      onChangeText={setPrice}/>
     {selectedValue=="Fish"? <TextInput
      placeholder='Enter Size in Inches'
      keyboardType='numeric'
      style={styles.input}
      onChangeText={setSize}/>:""}
      
     
    </View>



    <View style={styles.view4}> 
    <TouchableOpacity
     
    onPress={onSubmit}
      style={styles.pickBut}>
        <Text style={styles.textColor} >{isLoading?"Adding":"Add"}</Text>
      </TouchableOpacity>
    </View>
    </ScrollView>
    

    </View>
  );
}

const styles = StyleSheet.create({
  view1:{flex:1},

  view2: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop:10
  },

  view3:{
    alignItems:'center',
    justifyContent:'center',
    paddingTop:10
  },



  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  image: {
    width: 275,
    height: 275,
    resizeMode: 'contain',
    marginTop: 16,
    borderRadius:10,
    paddingBottom:10
    
  },
  pickBut:{
    backgroundColor:'black',
    width:200,
    alignItems:'center',
    justifyContent:'center',
    height:40,
    borderRadius:7,

    
  },
  textColor:{
    color:'white',
    fontSize:18
  },
  input:{
    height:50,
    width:'85%',
    borderRadius:10,
    borderWidth:.5,
    alignSelf:'center',
    paddingLeft:20,
    marginTop:20,
    color:'black',
  },
  view4:{
    alignItems:'center',
    paddingTop:15,
    paddingBottom:15
  },
  picker:{
    width:300,
    justifyContent:'center',
    alignItems:'center',
    marginTop:10,
    backgroundColor:'#ADD8E6',
    borderRadius:10,
    marginLeft:31
  },
  dropdown:{
    width:'100%'
    
    
  },
  
});
