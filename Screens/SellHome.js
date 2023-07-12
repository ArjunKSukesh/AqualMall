import { View, Text } from 'react-native';
import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

//Screens
import items from './SellItems';
import view from './SellView';
import profile from './SellProfile';
import notification from './SellNotification';
import SellerOrders from './SellerOrders';

//Screen names
const sellItems = 'items';
const sellViews = 'view';
const sellProfile = 'profile';
const sellNotification = 'notification';
const sellOrders="orders"
const SellHome = () => {
  return (
   <Tab.Navigator
    initialRouteName = {sellItems}
    screenOptions = {({route})=> ({
       tabBarActiveTintColor:'black',
       tabBarIcon :({focused,color,size})=>{
        
        let iconName;
        let rn = route.name;

        if(rn===sellItems){
          iconName = focused ? 'add-circle' : 'add-circle';

        } else if(rn === sellViews)
        {
          iconName = focused ? 'eye' : 'eye-outline';
        }else if(rn=== sellProfile)
        {
          iconName = focused ? 'person' : 'person-outline';
        } else if(rn === sellNotification)
        {
          iconName = focused? 'notifications' : 'notifications-outline';
        }else if(rn === sellOrders)
        {
          iconName = focused? 'notifications' : 'notifications-outline';
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
      <Tab.Screen name={sellItems} component = {items} options={{title:'Add Items'}} />
        <Tab.Screen name={sellViews} component = {view} options={{headerShown:false}}/>
        <Tab.Screen name={sellNotification} component = {notification} options={{headerShown:false}}/>
        <Tab.Screen name={sellOrders} component = {SellerOrders} options={{title:'Orders'}}/>

        <Tab.Screen name={sellProfile} component = {profile} options={{title:'Profile'}}/>

   </Tab.Navigator>
  )
}

export default SellHome