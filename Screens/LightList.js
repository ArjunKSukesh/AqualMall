import { View, Text,StyleSheet,Image,TouchableOpacity } from 'react-native'
import React from 'react'

const LightList = () => {
  return (
    <View style={styles.view1}>
      <View style={styles.headerView}>
      <Text style={styles.headerText}>Light List</Text>
      </View>

      <View style={styles.body}>
        <View style={styles.card}>
          <View style={{flexDirection:'row'}}> 
          <Image
          style={styles.image}
          />
          <View style={styles.details}>
          <Text style={styles.text}>Product Name</Text>
          <Text style={[styles.text,styles.textSpace]}>Origin</Text>
          <Text style={[styles.text,styles.textSpace]}>Quantity</Text>
          <Text style={[styles.text,styles.textSpace]}>Size</Text>
          <Text style={[styles.text,styles.textSpace]}>Product Type</Text>
          <Text style={[styles.text,styles.textSpace]}>Price</Text>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.buttonColor}>Edit</Text>
          </TouchableOpacity>
         

          </View>
          
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  view1:{
    flex:1
  },
  headerView:{
    alignItems:'center',
    justifyContent:'center',
    width:'100%',
    height:60,
    backgroundColor:'black',
    marginTop:40

  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color:'white'
  },
  body:{
    backgroundColor:'rgba(255, 255, 255, 0.1)',
    height:'100%',
    //marginTop:10,
    alignItems:'center'
  },
  card:{
    backgroundColor:'white',
    height:200,
    width:'90%',
    marginTop:10,
    borderRadius:15,
    alignItems:'flex-start',
    //justifyContent:'center',
    
    
  },
  image:{
    width:150,
    height:150,
    backgroundColor:'lightblue',
    borderRadius:10,
    marginLeft:15,
    marginTop:15
  },
  details:{
    width:160,
    //backgroundColor:'blue',
    marginLeft:5,
    marginTop:15,
    alignItems:'center',
    justifyContent:'center'
    
  },
  text:{
    //marginLeft:5
    fontSize:15
  },
  textSpace:{
    marginTop:3
  },
  editButton:{
    backgroundColor:'black',
    width:120,
    height:35,
    borderRadius:10,
    marginTop:6,
    alignItems:'center',
    justifyContent:'center'
  },
  buttonColor:{
    color:'white',
    fontSize:17
  }


})


export default LightList