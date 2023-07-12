import { StyleSheet, Text,ScrollView, View,ImageBackground,TouchableWithoutFeedback, TouchableOpacity} from 'react-native';
import { useNavigation } from "@react-navigation/native";


const SellView = ()=> {

  const navigation = useNavigation();

  
  return (
    <View style={styles.container}>
    <ScrollView contentContainerStyle={styles.scrollView}> 


      <View style={styles.view1} >
        <TouchableOpacity onPress={()=>navigation.navigate('ItemListScreen',{type:"Fish"})}  style={{flex:1,flexDirection:"row"}}>
      <ImageBackground source={require("../bgl/fish.jpg")}
      style={styles.bg1}>
        <Text style={styles.text}>FISH</Text>
      </ImageBackground>
      </TouchableOpacity>
      </View>


      <View style={styles.view1} >
        <TouchableOpacity onPress={()=>navigation.navigate('ItemListScreen',{type:"Food"})}  style={{flex:1,flexDirection:"row"}}>
      <ImageBackground source={require("../bgl/food.jpg")}
      style={styles.bg1}>
        <Text style={styles.text}>FOOD</Text>
      </ImageBackground>
      </TouchableOpacity>
      </View>


      <View style={styles.view1} >
        <TouchableOpacity onPress={()=>navigation.navigate('ItemListScreen',{type:"Lights"})}  style={{flex:1,flexDirection:"row"}}>
      <ImageBackground source={require("../bgl/light.jpg")}
      style={styles.bg1}>
        <Text style={styles.text}>LIGHT</Text>
      </ImageBackground>
      </TouchableOpacity>
      </View>

      <View style={styles.view1} >
        <TouchableOpacity onPress={()=>navigation.navigate('ItemListScreen',{type:"Medicine"})}  style={{flex:1,flexDirection:"row"}}>
      <ImageBackground source={require("../bgl/medicine.jpg")}
      style={styles.bg1}>
        <Text style={styles.text}>Medicine</Text>
      </ImageBackground>
      </TouchableOpacity>
      </View>

      <View style={styles.view1} >
        <TouchableOpacity onPress={()=>navigation.navigate('ItemListScreen',{type:"Fish Tanks"})}  style={{flex:1,flexDirection:"row"}}>
      <ImageBackground source={require("../bgl/newTank.jpg")}
      style={styles.bg1}>
        <Text style={styles.text}>Tanks</Text>
      </ImageBackground>
      </TouchableOpacity>
      </View>

      <View style={styles.view1} >
        <TouchableOpacity onPress={()=>navigation.navigate('ItemListScreen',{type:"Old Tanks"})}  style={{flex:1,flexDirection:"row"}}>
      <ImageBackground source={require("../bgl/oldTank.jpg")}
      style={styles.bg1}>
        <Text style={styles.text}>Old Tanks</Text>
      </ImageBackground>
      </TouchableOpacity>
      </View>






      <View style={styles.view1} >
        <TouchableOpacity onPress={()=>navigation.navigate('ItemListScreen',{type:"Plants"})}  style={{flex:1,flexDirection:"row"}}>
      <ImageBackground source={require("../bgl/plants.jpg")}
      style={styles.bg1}>
        <Text style={styles.text}>PLANTS</Text>
      </ImageBackground>
      </TouchableOpacity>
      </View>

     

      <View style={styles.view1} >
        <TouchableOpacity onPress={()=>navigation.navigate('ItemListScreen',{type:"Stones"})}  style={{flex:1,flexDirection:"row"}}>
      <ImageBackground source={require("../bgl/stone.jpg")}
      style={styles.bg1}>
        <Text style={styles.text}>Stones</Text>
      </ImageBackground>
      </TouchableOpacity>
      </View>
 


    

    </ScrollView>
      

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:50
  },
  view1:{
    backgroundColor:'#ADD8E6',
    width:'95%',
    height:150,
    borderRadius:20,
    marginTop:10,
    alignItems:'center',
    justifyContent:'center'
    
    
    
    
  },
  scrollView:{
    alignItems:'center',
    justifyContent:'center',
    paddingBottom:10

  },
  bg1:{
    flex:1,
    resizeMode:'cover',
    height:'100%',
    width:'100%',
    backgroundColor:"black",
    borderRadius:10,
    overflow:'hidden',
    justifyContent:'center',
    alignItems:'center'
    
  },
  text:{
    color:'#fff',
    fontSize:50,
    fontWeight:'600',
    fontStyle:'italic'
    
  }
});
export default SellView;
