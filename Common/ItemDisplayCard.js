import { View, Text,StyleSheet,TextInput, ScrollView,Dimensions ,Image,TouchableOpacity} from 'react-native'
import React from 'react'


const ItemDisplayCard = ({item,navigation}) => {
  return (
    <TouchableOpacity
    activeOpacity={0.7}
    onPress={()=>navigation.navigate('ItemViewScreen',{item:item})}
    style={[styles.container]}>
        <Image style={styles.img} source={{uri:item?.images}}/>
 <Text style={styles.name}>  {item?.name}
</Text>
<Text style={styles.price}> Rs {item?.price}
</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    img:{
height:"80%",
resizeMode:"contain"
    },
    name:{
        fontWeight:'bold',
        marginLeft:20
    },
    price:{
        fontStyle:'italic',
     
        marginLeft:20
    },
    container:{
        backgroundColor: 'white',
        borderRadius: 8,
        width:"45%",
        height:250,
        margin:5,
        
        elevation:5,
        
    },
    shadowProp: {
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
      },
    input:{
        height:50,
        width:'85%',
        //borderRadius:10,
        borderWidth:.5,
        alignSelf:'center',
        paddingLeft:20,
        marginTop:20,
        
    }
})

export default ItemDisplayCard