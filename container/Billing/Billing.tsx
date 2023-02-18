import React, { useEffect, useState } from "react";
import { Text, View, TextInput, Alert, ScrollView, Dimensions,Image,Platform,Vibration,Share } from "react-native";
import Draggable from "react-native-draggable";
import {  Icon, Button,FAB } from "react-native-elements";
import { textStyles } from "../../Styles/TextStyles";
import { Audio } from "expo-av";
import { BarCodeScanner } from "expo-barcode-scanner";
import { productInfo, useBillingContext } from "../../Context/BillingContext";
import { useCustomerOverlayContext } from "../../Context/CustomerOverlayContext";
import { CustomerOverlay } from "./CustomerOverlay";
import CodeScanner from "../../Modules/CodeScanner";
import { ScreenHeight } from "react-native-elements/dist/helpers";
import SystemContainer from "../systemContainer/SystemContainer";

const Billing: React.FC<{}> = () => {
  const textStyle = textStyles();
  let { newEntry, show,enableCamera,disableCamera,submitBill,userMeta } = useCustomerOverlayContext();
  let { productInfo,addProduct,deleteProduct,updateQty } = useBillingContext();

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(true);
  const [flash, setFlash] = useState(false);
  const playSound = async () => {
    let { sound } = await Audio.Sound.createAsync(
      require("../../assets/beep.mp3")
    );
    await sound.playAsync();
  };

  useEffect(()=>{

    allowCamera();
  },[]);
  const allowCamera = async () => {

    if (hasPermission == null) {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      // @ts-ignore
      setHasPermission(status === "granted");
    }
  };

  const disabelFlash = () => {
   
    setFlash(!flash)
  }
  const handleBarCodeScanned = async (data :any) => {

    let productInfo:productInfo = data;
   

    if (addProduct) {
      
      addProduct(productInfo);
    } // Apending Product List
    setScanned(false);
      await delay(1000);
      setScanned(true);
  };

  if (hasPermission === false)  Alert.alert("Message", "No access to camera");
    const barCode = (e:any) => {
        // setBarCodeValue(e)
        if (e) return true;
    }

  return (
    <View style={{flex:1}}>
 
 
    
        {enableCamera && (

                <Draggable  x={100} y={200}  onLongPress={()=>disabelFlash()}>
                    <CodeScanner flash={true} getValue={scanned && handleBarCodeScanned} enableCamera={scanned}/>
                </Draggable>)}


      {show && (
        <SystemContainer>
          <ScrollView>
        <CustomerOverlay
          show={show}
          enableCamera={false}
          disableCamera={function (): void {
            throw new Error("Function not implemented.");
          }}
          userMeta={{
            name: "",
            phone: "",
          }}
          addUser={function (_name: string, _phone: string): void {
            throw new Error("Function not implemented.");
          }}
          newEntry={()=> newEntry()}
        />
        </ScrollView>
        </SystemContainer>
      )}
      <ScrollView style={textStyle.boxStyle}>
        {productInfo &&
          productInfo.map((l:any, i:number) => (
            <View style={textStyle.container} key={i + "first"}>
              <View style={textStyle.rowContainer} key={i + "second"}>
                <View style={textStyle.rightSpan} key={i + "third"}>
                  {/*<Image*/}
                  {/*  style={textStyle.tinyLogo}*/}
                  {/*  source={{*/}
                  {/*    uri: l.image,*/}
                  {/*  }}*/}
                  {/*/>*/}
                  <View style={{ marginLeft: 10 }} key={i + "fourth"}>
                    <Text style={textStyle.productName} key={i + "fifth"}>
                        {l.productName?.split(" ")[0]+` -`}
                      <Text style={textStyle.weight} key={i + "six"}>
                          {`${l.weight} ${l.weightUnit} `}
                      </Text>
                    </Text>
                    <View style={{ flexDirection: "row" }} key={i + "seven"}>
                      <Text style={textStyle.mrp} key={i + "eight"}>
                        ₹ {l.mrp}
                      </Text>
                      <Text style={textStyle.sp} key={i + "nine"}>
                        {" "}
                        ₹ {l.sp}
                      </Text>
                      <Text style={textStyle.savingPrice}>
                        (₹ {l.mrp - l.sp} saving)
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={textStyle.leftSpan}>
                  <TextInput
                    style={textStyle.qtyInput}
                    keyboardType="number-pad"
                    maxLength={2}
                    onChangeText={(e) => updateQty && updateQty(i, parseInt(e))}
                    defaultValue={l.units ? l.units.toLocaleString() : ''}
                    key={i + "ten"}
                  />
                  <Button
                    type={"outline"}
                    key={i + "elven"}
                    icon={<Icon name="delete" color="#FF2442" tvParallaxProperties={undefined}></Icon>}
                    onPress={() => deleteProduct ? deleteProduct(i || 0) :null}
                    buttonStyle={{ borderColor: "#FF2442", borderWidth: 0.5 }}
                  />
                </View>
              </View>
            </View>
          ))}
        {productInfo?.length === 0 && (
          <Text
            style={{
              alignSelf: "center",
              justifyContent: "center",
              marginTop: Dimensions.get("window").height / 2 - 40,
              color: "#889EAF",
            }}
          >
            🍊 Create New Bill...
          </Text>
        )}
        {productInfo?.length != 0 && (
          <Text style={{ alignSelf: "center", color: "#889EAF" }}>
            🎉 &nbsp;That is All Done ..
          </Text>
        )}
      </ScrollView>
      <ScrollView
        // Here if Product length is 0 meaning Green button will be fix to bottom else it will come up
        style={{
          bottom: 0,
          position: "absolute",
          width: "100%",
        }}
      >
        {productInfo?.length != 0 && (
          <View style={textStyle.card}>
            <View>
              <Text>TOTAL</Text>
              <Text>₹ {calculateBill("total", productInfo)}</Text>
            </View>
            <View>
              <Text>Saving</Text>
              <Text>₹ {calculateBill("saving", productInfo)}</Text>
            </View>
            <View>
              <Button
                  onPress={()=> submitBill && submitBill(productInfo,userMeta)}
                title={"Print Bill" + ` (${productInfo?.length.toLocaleString()})`}
                  disabled={!enableCamera ? false : true}
                  buttonStyle={{backgroundColor:"#000",height:40}}
              ></Button>
            </View>
          </View>
        )}

        <View style={textStyle.bottomDiv}>
          {!enableCamera && (
            <Button
              icon={
                <Icon
                  name="camera"
                  iconStyle={{ marginRight: 5 }}
                  color="white" tvParallaxProperties={undefined}                >
                  <Text>&nbsp;</Text>
                </Icon>
              }
              title={productInfo?.length == 0 ? `Create New Bill` : "Scan"}
              onPress={()=> newEntry()}
              raised
              buttonStyle={{ backgroundColor: "green",height:100,justifyContent:"center" }}
            />
          )}
          {enableCamera && (

              <Button
                icon={<Icon name="delete" color="white" tvParallaxProperties={undefined}></Icon>}
                title={"Stop Scanning"}
                onPress={() => disableCamera()}
                raised
                buttonStyle={{ backgroundColor: "#FF2442",height:100,justifyContent:"center",alignItems:"center"  }}
              />

          )}
        </View>
      </ScrollView>
      </View>
  );
};

export default Billing;

function delay(time: number) {
  return new Promise<void>(function (resolve, reject) {
    setTimeout(() => resolve(), time);
  });
}


function calculateBill(type:string,data:productInfo[] | undefined) {
  let TotalAmt:number = 0;
  let TotalSaving:number = 0;
  switch(type){
    
    case 'total':{
      data && data.forEach((element)=> {
          TotalAmt = TotalAmt + element.sp * element.units;
        })
        return TotalAmt || 0;
    }
    case 'saving':{
      data &&  data.forEach((element)=> {
        TotalSaving = TotalSaving +( element.mrp - element.sp) * element.units
      })
      return TotalSaving || 0;
  }
    default: {
      return 0
    }
  }

}