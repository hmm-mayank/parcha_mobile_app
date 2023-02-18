import { StatusBar, StatusBarStyle } from "expo-status-bar";
import React, {useEffect, useState} from "react";

import "react-native-gesture-handler";
import { MainNavigator } from "./container/Overlay/Menu-drawer";
import { BillingContextProvider } from "./Context/BillingContext";
import { CustomOverlayProvider } from "./Context/CustomerOverlayContext";
import { NewProdcutContextProvider } from "./Context/NewProductContext";
import { PreviousOrderContextProvieder } from "./Context/PreviousOrderContext";
import { ThemeContextProvider, useThemeContext } from "./Context/ThemeContext";
import  CameraModule  from "./Modules/Camera";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {LoginContextProvider} from "./Context/LoginContext";
import { VendorProductListContextProvider } from "./Context/VendorProductContext";
export interface ITheme {
  theme: any;
  statusColor: StatusBarStyle;
  themeLabel: string;
}
export interface IappTheme {
  themeMeta: ITheme;
  changeTheme: () => void;
}

const App = () => {

  const [user,setUser] = useState({ loginStatus : null, useData:  null });
  useEffect(()=>{
    checkLogin().then((r:{loginStatus:any,useData:any}) => {
    setUser(r);
    })
  },[])

  const checkLogin = async () => {
    // AsyncStorage.clear();
    let userLoginStatus = await  AsyncStorage.getItem("@loginStatus")
    
    let userLoginData = await  AsyncStorage.getItem("@userData");
    if (userLoginData){
      return { loginStatus : userLoginStatus, useData:  JSON.parse(userLoginData) }
    }
    else return { loginStatus : null, useData:  null }

  }
  let { themeMeta } = useThemeContext();

  return (
    <>
      <StatusBar style={themeMeta.statusColor} />
      <LoginContextProvider>
      <ThemeContextProvider>
        <BillingContextProvider>
          <CustomOverlayProvider>
            <NewProdcutContextProvider>
              <PreviousOrderContextProvieder>
                <VendorProductListContextProvider>
              <MainNavigator isLogin={user.loginStatus || "false"} />
              </VendorProductListContextProvider>
              </PreviousOrderContextProvieder>
            </NewProdcutContextProvider>
          </CustomOverlayProvider>
        </BillingContextProvider>
      </ThemeContextProvider>
      </LoginContextProvider>
    </>
  );
};

export default App;
