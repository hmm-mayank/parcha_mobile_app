import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {  NavigationContainer} from "@react-navigation/native";
import { useThemeContext } from "../../Context/ThemeContext";

import { StatusBar } from "expo-status-bar";
import { useCustomerOverlayContext } from "../../Context/CustomerOverlayContext";
import Login from "../Login/Login";
import {createNativeStackNavigator} from "react-native-screens/native-stack";
import {DrawerNavigation} from "../DrawerNavigation/drawerNavigation";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();
interface  routeDef {
    isLogin:string
}
export function MainNavigator({isLogin}:routeDef) {
  const { themeMeta, changeTheme } = useThemeContext();
  const { userMeta } = useCustomerOverlayContext();

  return (

    <>

        <NavigationContainer theme={themeMeta.theme}>
          <StatusBar style={themeMeta.statusColor}/>

          {

                <Stack.Navigator initialRouteName={isLogin == "true" ? "Main": "Login"} screenOptions={{
                    headerShown: false
                }}>
                    {isLogin == "false" && <Stack.Screen name="Login" component={Login}/>}
                    { <Stack.Screen name="Main" component={DrawerNavigation}/>}

              </Stack.Navigator>
            }
        </NavigationContainer>
    </>
  );
}
