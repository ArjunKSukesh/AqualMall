
import * as React from 'react';
//import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();


//Screens
import Home from './HomeTab';
import Cart from './CartTab';
import Notifications from './NotificationsTab';
import Profile from './ProfileTab';

//Screen names
const homeName = 'Home';
const cartName = 'cart';
const notificationsName = 'Notifications';
const profileName = 'Profile';


const BottomTab = () => {
  return (

    <Tab.Navigator
    
    initialRouteName = {homeName}
    screenOptions = {({route})=>({
    tabBarActiveTintColor:'black',
    tabBarIcon : ({focused,color,size})=>{
        let iconName;
        let rn = route.name;

        if(rn===homeName){
            iconName = focused ? 'home' : 'home-outline';
        
        } else if(rn === cartName)
        {
            iconName = focused? 'cart' : 'cart-outline';
            
        }
        else if(rn === notificationsName)
        {
            iconName = focused? 'notifications' : 'notifications-outline';
        }

        else if(rn === profileName)
        {
            iconName = focused? 'person' : 'person-outline';
        }
        return(
            <Ionicons name={iconName} size={size} color={color}/>  
            
               
        )

    },
    tabBarStyle:{
        paddingBottom:25,
        height:75,
        paddingTop:10

    }
    })}>
        <Tab.Screen name={homeName} component = {Home}/>
        <Tab.Screen name={cartName} component = {Cart}/>
        <Tab.Screen name={notificationsName} component = {Notifications}/>
        <Tab.Screen name={profileName} component = {Profile}/>



    </Tab.Navigator>
  )
}


export default BottomTab;