import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { BLEPrinter } from "react-native-thermal-receipt-printer";
import { Button } from "react-native-elements";

interface IBLEPrinter {
    device_name: string;
    inner_mac_address: string;
  }

const PrintInvoice = () => {
const [printers, setPrinters] = useState([]);
  const [currentPrinter, setCurrentPrinter] = useState();

  useEffect(() => {
   BLEPrinter.getDeviceList(e=> {
       console.log(e);
   })
  }, []);



  return (
    <View >
        <Button>Print</Button>
     </View>
  )
}

export default PrintInvoice;