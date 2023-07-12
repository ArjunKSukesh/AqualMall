import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { View ,StyleSheet,Image,TouchableOpacity,Text} from 'react-native'
import { db, auth } from "../firebase";
import moment from 'moment';
const OrderCard = ({item,user}) => {
    const navigation = useNavigation();
const cancelOrder = () => {
  

    db.collection("orders").doc(item.id).update({status:"cancelled"})
    navigation.navigate("cart")
}
function truncate(source, size) {
  return source.length > size ? source.slice(0, size - 1) + "…" : source;
}
  return (
    <View style={styles.view2}>
        
    <View style={styles.row}>
      <View>
        <Image source={{uri:item?.product?.images}} style={styles.images} />
      </View>
      <View style={styles.view3}>
        <Text style={styles.text1}>{truncate(item?.product?.name ,10)} </Text>
        <Text style={[styles.text2, styles.topMargin]}>Quantity : {item?.details?.count}</Text>
        <Text style={[styles.text2, styles.topMargin]}>Type : {item?.product?.product}</Text>

        <Text style={[styles.text1, styles.topMargin]}>{"\u20B9"} {item?.total}</Text>
      </View>
    </View>
    
 
    <Text style={{textAlign:'center'}}>Status: {item?.status?.toUpperCase()} </Text>
    <View style={[styles.view4, styles.row1]}>
    <Text>Ordered On {moment.unix(item.createdAt.seconds).format("MMM Do YYYY")}  |  </Text>

      <Text>Delivery by  {moment.unix(item.createdAt.seconds).add(3, 'days').format("MMM Do YYYY")}</Text>
    </View>
    <View style={[styles.view4, styles.row1]}>
    {user=="sell" &&    <TouchableOpacity style={styles.btn1}
      onPress={()=> {navigation.navigate('OrderDetails',{data:item})}}>
        <Text style={styles.text}>View Order</Text>
      </TouchableOpacity>}
   

      {user=="cus" && item?.status=="ordered" && <TouchableOpacity style={[styles.btn1, styles.cancel]} onPress={()=>cancelOrder()}>
        <Text style={styles.text}>Cancel Order</Text>
      </TouchableOpacity>}
     
    </View>
    
  </View>
  )
}

export default OrderCard

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
    },
    view1: {
      flex: 1,
      height: "100%",
      width: "100%",
      alignItems: "center",
      
    },
  
    view2: {
      width: 350,
     marginVertical:10,
      borderColor: "grey",
      borderWidth: 0.2,
      flexDirection: "column",
    },
    images: {
      width: 150,
      height: 150,
      backgroundColor: "grey",
      borderRadius: 4,
      resizeMode:'contain'
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
      marginBottom:5
    },
    text: {
      color: "white",
      fontSize: 20,
    },
    cancel:{
      marginLeft:5
    }
  });
  