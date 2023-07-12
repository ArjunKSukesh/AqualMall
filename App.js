import * as  React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./Screens/Login";
import SignUp from "./Screens/SignUp";
import CusHome from "./Screens/CusHome";
import Splash from "./Screens/Splash";
import SellerLogin from "./Screens/SellerLogin";
import SellerSignup from "./Screens/SellerSignup";
import SellHome from "./Screens/SellHome";
import FoodList from "./Screens/FoodList";
import FishList from "./Screens/FishList";
import LightList from "./Screens/LightList";
import MedicineList from "./Screens/MedicineList";
import MotorList from "./Screens/MotorList";
import OldtankList from "./Screens/OldtankList";
import PlantList from "./Screens/PlantList";
import StoneList from "./Screens/StoneList";
import TankList from "./Screens/TankList";
import Order from "./Screens/Order";
import ItemList from "./Screens/ItemList";
import ItemView from "./Screens/ItemView";
import OrderDetails from "./Screens/OrderDetails";







const Stack = createNativeStackNavigator();

const App = () => {
  return(
    <NavigationContainer>
    <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="Splash Page" component={Splash} />
      <Stack.Screen name="Login Page" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="Cus Home" component={CusHome} />
      <Stack.Screen name="Seller Login" component={SellerLogin}/>
      <Stack.Screen name="Seller SignUp" component={SellerSignup}/>
      <Stack.Screen name="SellHome" component={SellHome}/>
      <Stack.Screen name="ItemListScreen" component={ItemList}/>

      <Stack.Screen name="ItemViewScreen" component={ItemView}/>



      <Stack.Screen name="Fish List" component={FishList}/>
      <Stack.Screen name="Food List" component={FoodList}/>
      <Stack.Screen name="Light List" component={LightList}/>
      <Stack.Screen name="Medicine List" component={MedicineList}/>
      <Stack.Screen name="Motor List" component={MotorList}/>
      <Stack.Screen name="Oldtank List" component={OldtankList}/>
      <Stack.Screen name="Plant List" component={PlantList}/>
      <Stack.Screen name="Stone List" component={StoneList}/>
      <Stack.Screen name="Tank List" component={TankList}/>

      <Stack.Screen name="OrderList" component={Order}/>
      <Stack.Screen name="OrderDetails" component={OrderDetails}/>
      
     

    </Stack.Navigator>
  </NavigationContainer>
  ) 
}

export default App; 