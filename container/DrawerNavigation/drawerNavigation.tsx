import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import OverlayContainer from "./Overlay";
import { useThemeContext } from "../../Context/ThemeContext";
import Billing from "../Billing/Billing";
import { StatusBar } from "expo-status-bar";
import { useCustomerOverlayContext } from "../../Context/CustomerOverlayContext";
import AddProduct from "../AddProduct/AddProduct";
import PreviousOrderScreen from "../PreviousOrders/PreviousOrders.main";
import Dashboard from "../Dashboard/Dashboard";
import Login from "../Login/Login";
import { createNativeStackNavigator } from "react-native-screens/native-stack";
import Category from "../Category/Category";
import Offer from "../Offer/Offer";
import VendorProductList from "../VendorProductList/VendorProductList";
import VendorSetting from "../VendorSettings/VendorSetting";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeModules } from "react-native";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();
interface routeDef {
  isLogin: string;
}
export function DrawerNavigation() {
  const navigation = useNavigation();
  const { themeMeta, changeTheme } = useThemeContext();
  const { userMeta } = useCustomerOverlayContext();
  const logout = async () => {
   await AsyncStorage.clear();
   NativeModules.DevSettings.reload();
  };
  return (
    <>
      <StatusBar style={themeMeta.statusColor} />
      <Drawer.Navigator>
        <Drawer.Screen
          name={
            userMeta.name === "nouser"
              ? "Billing"
              : `${userMeta.name.split(" ")[0]} / ${userMeta.phone}`
          }
          key="billing-key"
          component={Billing}
        />
        <Drawer.Screen
          name={"Dashboard"}
           component={Dashboard}
        />

        <Drawer.Screen
          name={"Previous Order"}
          component={PreviousOrderScreen}
        />
        <Drawer.Screen name={"Product List"} component={VendorProductList} />
        <Drawer.Screen name={"Category"} component={Category} />
        <Drawer.Screen name={"Offer"} component={Offer} />

        <Drawer.Screen name="Add Product" key="addPr" component={AddProduct} />
        <Drawer.Screen
          name="Vendor Setting"
          key="vendorSetting"
          component={VendorSetting}
        />

        <Drawer.Screen
          name={"Logout"}
          listeners={{ focus: logout }}
          component={OverlayContainer}
        />
      </Drawer.Navigator>
    </>
  );
}
