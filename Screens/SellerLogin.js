import { useNavigation } from "@react-navigation/native";
import React,{useState} from "react";
import { StyleSheet,View,TextInput,Text,Image, TouchableOpacity } from "react-native";
import { auth,db } from "../firebase";

const Login = () => {

    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);


    const handleLogin = () => {
        auth
          .signInWithEmailAndPassword(email, password)
          .then(() => {
            // Login successful
            console.log('Login successful');
            // Navigate to the desired screen
            navigation.navigate('SellHome');
          })
          .catch(error => {
            // Handle login error
            console.log('Login error:', error.message);
            setError(error.message);
          });
      };
    
    
    return(
      <View style={styles.view1}>
        <View style={styles.view2}>
         <TouchableOpacity style={styles.sellerTouch}
         onPress={()=>{
            navigation.navigate('Login Page')
        }}>
            <Text style={styles.sellerText}>Buyer</Text>
         </TouchableOpacity>
        </View>
     
        <View style={styles.text}>
            <Text>#Sell Your Aquariums Here</Text>
            <Image source={require('../images/aquarium.png')}
            style={styles.logo}/>
            <Text style={styles.loginText}>Login</Text>

            <TextInput 
            style={styles.input}
            placeholder="Email Id"
            onChangeText={text => setEmail(text)}
            value={email}
            />
            
             <TextInput
             style={styles.input}
            placeholder="Password"
            //secureTextEntry
            onChangeText={text => setPassword(text)}
            value={password}
            />

            <TouchableOpacity
            style={styles.touch}
            onPress={handleLogin}>
                <Text style={styles.touchText}
                >Sign-In</Text>
            </TouchableOpacity>


           <Text style={styles.accountText}
          onPress={()=> {navigation.navigate('Seller SignUp')}}
           >Create New Account</Text>
        </View>
        </View>
    )
}

const styles = StyleSheet.create({
    text :{
        paddingTop:85,
        alignItems: 'center',
        justifyContent:'center'
    },
    input:{
        height:50,
        width:'85%',
        borderRadius:10,
        borderWidth:.5,
        alignSelf:'center',
        paddingLeft:20,
        marginTop:20,
        
    },
    loginText:{
        fontSize:30,
        marginTop:35,
        fontWeight:'600',
       
    },
    logo:{
        marginTop:25,
        height:70,
        width:100
    },
    touch:{
        alignItems:'center',
        height:50,
        width:'85%',
        justifyContent:'center',
        backgroundColor:'#000',
        borderRadius:10,
        marginTop:20
    },
    touchText:{
        color:'white',
        fontSize:19
       
    },
    accountText:{
        textDecorationLine:'underline',
        marginTop:20,
        fontSize:20
    },
    button:{
        alignItems:'flex-start'
        
    },
    view1 :{
        flex:1,
    },
    view2:{
        alignItems:'flex-end',
        paddingTop:70,
        paddingRight:30
    },
    sellerTouch:{
        backgroundColor:'black',
        width:50,
        height:25,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:8
    },
    sellerText:{
        color:'white',
    }
})
export default Login;