import { View, Text,StyleSheet,TextInput,TouchableOpacity,Image} from 'react-native';
import React,{useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import { auth,db } from '../firebase';



const SignUp = () => {
  const navigation = useNavigation();
  const [name,setName]=useState('');
  const[phone,setPhone]=useState('');
  const [email,setEmail]=useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword,setConfirmPassword] = useState('');
  

  const [nameError, setNameError] = useState('');
  const[phoneError,setPhoneError]=useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

 
  const isValidEmail =async (value) => {
    // Regex pattern for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };


  const handleNameChange = (value) => {
    setName(value);
    setNameError('');
  };

  const handlePhoneChange = (value) => {
    setPhone(value);
    setPhoneError('');
  };

  const handleEmailChange = (value) => {
    setEmail(value);
    setEmailError('');
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
    setPasswordError('');
  };

  const handleConfirmPasswordChange = (value) => {
    setConfirmPassword(value);
    setConfirmPasswordError('');
  };

  const handleSubmit = async () => {


    if (name === '') {
      setNameError('Name is required');
    }
    if(phone === ''){
      setPhoneError('Phone number is required');
    }
    if (email === '') {
      setEmailError('Email is required');
    }else if(!isValidEmail(email)){
      setEmailError('Invalid email');
    }

    if (password === '') {
      setPasswordError('Password is required');
     
    }

    if(confirmPassword === ''){
      setConfirmPasswordError('Confirm Password is required');
      
    }else if(password !== confirmPassword){
        setConfirmPasswordError('Passwords do not match');
        return; // Don't proceed further if passwords don't match
    }
    else{
      try {
         // Create a new user with email and password
    const response = await auth.createUserWithEmailAndPassword(email, password);
    console.log('User created:', response.user);


     // Store the name in Firestore
     const user = response.user;
     const userRef = db.collection('custmer').doc(user.uid);
     await userRef.set({ name,email,phone});

    
     navigation.navigate('Cus Home');
    // Reset the form and errors
    setName('');
    setEmail('');
    setPhone('');
    setPassword('');
    setConfirmPassword('');

    setNameError('');
    setPhoneError('');
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');
  } catch (error) {
    console.log('Error creating user:', error);
    // Handle error and display an appropriate message to the user
  }
    }
    
  };

    



  return (
    <View style={styles.text}>
            <Image source={require('../images/aquarium.png')}
            style={styles.logo}/>
            <Text style={styles.loginText}>Create New Account</Text> 

            <TextInput 
            style={styles.input}
            placeholder="Enter Name"
            value={name}
            onChangeText={handleNameChange}
            />
            {nameError !== '' && <Text style={{ color: 'red' }}>{nameError}</Text>}

            <TextInput 
            keyboardType='number-pad'
            style={styles.input}
            placeholder="Enter Phone number"
            value={phone}
            onChangeText={handlePhoneChange}
            />
            {phoneError !== '' && <Text style={{ color: 'red' }}>{phoneError}</Text>}

            <TextInput 
            style={styles.input}
            placeholder="Enter Email Id"
            value={email}
            onChangeText={handleEmailChange}
            />
            {emailError !== '' && <Text style={{ color: 'red' }}>{emailError}</Text>}

            <TextInput 
            style={styles.input}
            placeholder="Enter Password"
            value={password}
            onChangeText={handlePasswordChange}
            />
            {passwordError !== '' && <Text style={{ color: 'red' }}>{passwordError}</Text>}

             <TextInput
             style={styles.input}
            placeholder="Enter Confirm Password"
            value={confirmPassword}
            onChangeText={handleConfirmPasswordChange}
            />

{confirmPasswordError !== '' && <Text style={{ color: 'red' }}>{confirmPasswordError}</Text>}

            <TouchableOpacity
            style={styles.touch}
            onPress={handleSubmit} >
                <Text style={styles.touchText}
                >Register</Text>
            </TouchableOpacity>

            <Text style={styles.accountText}
             onPress={()=>
              {navigation.navigate('Login Page')}}
           >Already Have Account?</Text>

        </View>
  )
}
const styles = StyleSheet.create({
  text :{

      flex:1,
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
      marginTop:20
  },
  loginText:{
      fontSize:30,
      marginTop:35,
      fontWeight:'600'
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
 
})
export default SignUp