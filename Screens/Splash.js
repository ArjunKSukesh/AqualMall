import { View,StyleSheet,Text,Image } from 'react-native'
import React,{useEffect} from 'react'
import { useNavigation } from '@react-navigation/native';

const Splash = () => {
    const navigation = useNavigation();

    useEffect(()=>{
        setTimeout(()=>{
            navigation.navigate('Login Page')
        },1500)
    });


  return (
    <View style={styles.text}>
        <Image source={require('../images/aquarium.png')} 
        style={styles.logo}/>
        <Text style={styles.appText}>AquaMall</Text>
    </View>
       
  )
}
const styles = StyleSheet.create({
    text :{

        flex:1,
        alignItems: 'center',
        justifyContent:'center'
    },
    logo:{
        marginTop:25,
        height:70,
        width:100
    },
    appText:{
        paddingTop:20,
        fontSize:25,
    
    }
})

export default Splash