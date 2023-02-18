import React, {createContext, useContext, useState} from 'react';
import Axios from "axios";
import {Alert, Platform, ToastAndroid} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {IuserFrom} from "../container/Login/Login";
import {apiEndPoints} from "../utils/globals";
const LoginContext = createContext({});

export const LoginContextProvider = ({children}:any) => {

    const [saveUser,setUserData] = useState(null);
    const LoginUser = async (user:IuserFrom,navigation:any) => {

        if (user.phone?.length == 10  && user.otp?.length !==4) {
            let otpResponse =   await Axios({
                method:"POST",
                baseURL:`${apiEndPoints}/`,
                url:"message/sendOtp",
                data:user
            })
            if (otpResponse.status == 200 ){
                if(Platform.OS == "android"){
                    ToastAndroid.show('Otp Sent',2);
                }
                else {
                    Alert.alert('Otp Sent')
                }

            }
        }
        if (user.phone?.length == 10 && user.otp?.length == 4 ) {
            let verifyOtp = await  Axios({
                method:"post",
                baseURL:`${apiEndPoints}/`,
                url:"message/getOtp",
                data: {phone: user.phone}
            })


            if (user.otp == verifyOtp.data.otp) {
                Alert.alert("OTP CORRECT");
                let shopValidation = await  Axios({
                    method:"post",
                    baseURL:`${apiEndPoints}/vendor`,
                    url:"getVendorProduct"
                })
               
               let shopStatus = shopValidation?.data?.filter((element:any) => {
                  
                    return element.vendorCode == user.vendorCode
                })
                if (shopStatus?.length === 0) {
                    Alert.alert("No Vendor Shop found")
                    return 0;
                }
                await AsyncStorage.setItem('@vendorInfo',JSON.stringify(shopStatus));
                let createAccount = await  Axios({
                    method:"POST",
                    baseURL:`${apiEndPoints}/`,
                    url:"register",
                    data: {
                        phoneNumber : user.phone,
                        password : user.otp,
                        confirmPassword : user.otp,
                    }
                })
                if(createAccount.data.id){
                    setUserData(createAccount.data);
                    await AsyncStorage.setItem('@loginUser',JSON.stringify(createAccount.data));
                    await  AsyncStorage.setItem("@loginStatus","true")
                    await  AsyncStorage.setItem("@userData",JSON.stringify(createAccount.data))
                    navigation.navigate("Main");

                    if(Platform.OS == "android"){
                        ToastAndroid.show('Account Created',2);
                    }
                    else {
                        Alert.alert('Account Created')
                    }
                }

            }
            else {
                if(Platform.OS == "android"){
                    ToastAndroid.show('Incorrect Account',2);
                }
                else {
                    Alert.alert('Incorrect Account')
                }

            }
        }



    }
    const getSavedUser = async ()=> {
        let savedUserData =   await AsyncStorage.getItem('@loginUser');
        if(savedUserData) {
           return  JSON.parse(savedUserData);
        }
        else {
            return false;
        }
    }
    return <LoginContext.Provider value={{LoginUser,getSavedUser}}>
        {children}
    </LoginContext.Provider>
}

export const useLoginContext = () => {
    const {LoginUser,getSavedUser} = useContext(LoginContext);

    return {LoginUser,getSavedUser}
}