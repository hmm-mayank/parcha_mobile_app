import React, {useState} from 'react';
import {StyleSheet, Text, View} from "react-native";
import {Button, Icon, Input} from "react-native-elements";

import {Picker} from "@react-native-picker/picker";

import {useLoginContext} from "../../Context/LoginContext";
import { ScrollView } from 'react-native-gesture-handler';
export interface IuserFrom {
    phone?:string,
    otp?:string,
    type?:string,
    vendorCode?:string
}

const  Login = ({navigation}) => {
    const [userForm,setUserForm] = useState<IuserFrom>({})
    const {LoginUser} = useLoginContext()
    const [visibleCode,setVisible] = useState(false)
    const [enableForm,setEnableForm] = useState(false)
   const requestOTP = (userForm:IuserFrom,navigation:any) => {
       LoginUser(userForm,navigation)
       if (userForm.phone?.length == 10)  setEnableForm(true);
       else setEnableForm(false);

       setVisible(false)
       setTimeout(()=>{
          
           setVisible(true)
       },15000)
    }
    const activateForm = (e:any) => {
        if (e.length == 10) {
            setUserForm({phone: e})
            setVisible(true);
        }
        else {
            setUserForm({phone: e})
            setVisible(false);
            setEnableForm(false);
        }
    }
return (
    <>
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps={false}>
            <Text  style={styles.logo}>प र चा</Text>
            <Input style={styles.textBox} value={userForm.phone} onChangeText={e=>activateForm(e)}
                   keyboardType={"number-pad"}  placeholder={" Enter 10 digit Mobile Number"}
                   leftIcon={<Icon name={"phone"}/>}
                   rightIcon={<Button title={"OTP"} buttonStyle={{backgroundColor:"#000"}} disabled={!visibleCode} onPress={()=>requestOTP(userForm,navigation)} />} />
            {enableForm && <Input style={styles.textBox}
                                  value={userForm.otp}
                                  onChangeText={e => setUserForm({...userForm, otp: e})}
                                  placeholder={" Enter OTP"} keyboardType={"number-pad"}
                                  leftIcon={<Icon name={"code"}/>}/>}
            {enableForm && <Input style={styles.textBox}
                                  value={userForm.vendorCode}
                                  onChangeText={e => setUserForm({...userForm, vendorCode: e})}
                                  placeholder={" Enter 6 digit Shop Code"} keyboardType={"number-pad"}
                                  leftIcon={<Icon name={"code"}/>}/>}
            {enableForm && <Picker
                selectedValue={userForm.type}
                onValueChange={(itemValue, itemIndex) =>
                    setUserForm({...userForm, type: itemValue.toString()})
                }>
                <Picker.Item label="Admin" value="admin"/>
                <Picker.Item label="Cashier" value="cashier"/>
            </Picker>}


            {enableForm && <Button title={"GET STARTED"} onPress={() => LoginUser(userForm, navigation)} type={"solid"}
                                   buttonStyle={{backgroundColor: "black"}}/>
            }
        </ScrollView>
    </>
)
}

const styles = StyleSheet.create({
    container:{
        flex:1,flexDirection: 'column',
        justifyContent: 'center',
        margin:20
    },
    logo:{
        alignSelf:"center",
        fontSize:30,
        fontWeight:"100",
        textTransform:"uppercase"
    },
    textBox:{

        fontSize:15,
        textTransform:"uppercase"

    }
})

// @ts-ignore
export default Login;