import { BarCodeScanner } from "expo-barcode-scanner"
import {Camera} from "expo-camera";

import React, { useEffect, useState } from "react";
import Draggable from "react-native-draggable";
import { delay, playSound } from "../utils/globals";
import { textStyles } from "../Styles/TextStyles";
import { Dimensions, Vibration, View } from "react-native";
import { FAB } from "react-native-elements/dist/buttons/FAB";
import { Icon } from "react-native-elements/dist/icons/Icon";




const { width } = Dimensions.get('window');

const CodeScanner = (props:any) => {
    const textStyle = textStyles();
const [flash,setFlash] = useState(false);
const [scanned, setScanned] = useState(false);
useEffect( ()=>{

   if (props.enableCamera){
      setScanned(false);
   } else {
      setScanned(true);
   }
   
},[scanned])
const enableFlash = () => setFlash(!flash)
const handleBarCodeScanned = async ({data }:any) => {
   let va  = await props.getValue(data);
    
        Vibration.vibrate([200])
        await playSound();
        setScanned(false);
        await delay(1000);
       setScanned(true);
        return data;
    
  };

    return (
      <View>
        {props.enableCamera && (
          <Camera
            zoom={0.2}
            flashMode={
              flash
                ? Camera.Constants.FlashMode.torch
                : Camera.Constants.FlashMode.off
            }
            onBarCodeScanned={handleBarCodeScanned}
            style={{ width: 200, height: 150, opacity: 0.5 }}
            // autoFocus={"auto"}
           
            
            focusable
          />
        )}
        {(props.enableCamera) && <FAB
          title={<Icon name="bolt" color={"white"}></Icon>}
          titleStyle={{ color: "#fff" }}
          style={{ opacity: 0.7,shadowColor:"#fff" }}
          onPress={enableFlash}
          buttonStyle={{
            backgroundColor: "#000",
            borderRadius: 30,
            height: 50,
            marginTop: 10,
            
          }}
        />}
      </View>
    );
}

export default CodeScanner;