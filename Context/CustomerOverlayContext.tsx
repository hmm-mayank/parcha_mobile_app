import React,{ useState,useEffect, createContext, useContext } from "react";
import { ICs } from "../container/Billing/CustomerOverlay";
import { useBillingContext } from "./BillingContext";
import {useLoginContext} from "./LoginContext";
import {postBilling} from '../utils/axios';
import {Alert} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import {orderInvice} from "../utils/invoice.order";
import axios from "axios";
import Axios from "axios";
import moment from 'moment';
import { getVendorDetails } from "../utils/storageUtils";
import { defaultVendorSetting } from "../container/VendorSettings/VendorSettingInterface";
import { Buffer } from "buffer";


let initialValue: ICs = {
  show: false,
  enableCamera:false,
  disableCamera:()=>{},
  userMeta: { name: "nouser", phone: "0000000" },
  addUser: function (_name: string, _phone: string) {},
  newEntry: function () {},
    submitBill: function (productInfo:any) {},
};
const CustomerOverlayContext = createContext(initialValue);

export const CustomOverlayProvider = ({children}:any) => {
  



    const [show,setShow] = useState(false);
    const {getSavedUser} = useLoginContext();
    const [enableCamera,setEnableQRCamera] = useState(false);
    let { productInfo, addProduct,clearView } = useBillingContext();
    const [userMeta,setUserMeta] = useState({ name: "nouser", phone: "0000000" });
    const newEntry = () => {

        try {
            productInfo?.length === 0 ?  setShow(!show) : setEnableQRCamera(!enableCamera);
        }catch (e) {
            console.log(e);
            setEnableQRCamera(!enableCamera);
        }

        // Vibration.vibrate(10 * ONE_SECOND_IN_MS)
    };
    const addUser = (_name: string,_phone: string) => {
        // console.log(_name, _phone);
        setShow(false);
        setUserMeta({ name: _name, phone: _phone });
        setEnableQRCamera(true);
    }
    const submitBill =async (productInfo:any,userMeta:any) => {
        let getUser = await getSavedUser();
        let vendorInformation = await getVendorDetails();
        let totalSellingPrice = productInfo.reduce((total: number,element: { sp: string; units: string; })=> total+ parseFloat(element.sp)*parseFloat(element.units),0)
        let totalMrpPrice = productInfo.reduce((total: number,element: { mrp: string; units: string; })=>  total + parseFloat(element.mrp)*parseFloat(element.units),0)
           
        const now = moment().utc();
        const day = now.format("DD-MM-YYYY");
        const hour = moment.utc(now).format('hh');
        const min = moment.utc(now).format('mm');
        const sec = moment.utc(now).format('ss');
       
        // let imageUpload =   await axios.get('https://p266jz5q1c.execute-api.ap-south-1.amazonaws.com/uploads');
        let filePathLocalName = `${getUser["phoneNumber"]}-${hour}${min}${sec}`.toString();
        console.log(`https://parcha.s3.ap-south-1.amazonaws.com/${day}/${filePathLocalName}.pdf`);
        let formData = {
            "customerPhone": getUser["phoneNumber"],
            "cashierId":getUser["id"],
            "vendorId":vendorInformation.vendorId,
            "customer": userMeta,
            "totalAmount":totalSellingPrice,
            "totalProduct":productInfo.length + 1,
            "cartProduct": productInfo,
            "invoicePath": `https://parcha.s3.ap-south-1.amazonaws.com/${day}/${filePathLocalName}.pdf`
        }
      

        const apiSubmitResponse =  await postBilling(formData);
       if (apiSubmitResponse.status == 200) {
           Alert.alert("User Bill sent Successfully");

           let shopSetting = defaultVendorSetting;
           try{
            shopSetting = await AsyncStorage.getItem('@billSetting')
            //@ts-ignore
            shopSetting = JSON.parse(shopSetting);
           }catch(e){

           }
           
           let filePath = await Print.printToFileAsync({
               html: orderInvice(vendorInformation,productInfo,totalSellingPrice,totalMrpPrice,userMeta["phone"],shopSetting),
               width : 612,
               height : 792,
               base64 : true
           });

          
          
               const data = new FormData();
               let pdf = {
                   uri: `https://cq37fc5wuhwq3jo3i2vs2x6yb40bvgvr.lambda-url.ap-south-1.on.aws/upload`, // CameralRoll Url
                   type: 'pdf',
                   name: `${filePathLocalName}.pdf`,
               };
               if(filePath.uri){
               
               
                let anrafformData = new FormData();
                anrafformData.append("file", {uri: filePath.uri, name: `${filePathLocalName}.pdf`, type: 'application/pdf'})
               console.log(anrafformData)
                var requestOptions = {
                    method: 'POST',
                    body: anrafformData,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                      },
                  };
                  console.log(requestOptions)
                  fetch("https://cq37fc5wuhwq3jo3i2vs2x6yb40bvgvr.lambda-url.ap-south-1.on.aws/upload", requestOptions)
                  .then(response => response.text())
                  .then(result => console.log(result))
                  .catch(error => console.log('error', error));
               }
           await Sharing.shareAsync(filePath.uri);
           if (clearView) {
               clearView();
           }
       }
    }
    const disableCamera = (value:boolean = false) => setEnableQRCamera(value);
    
    
    return <CustomerOverlayContext.Provider value={{show,enableCamera,newEntry,addUser,disableCamera,userMeta,submitBill}} >
        {children}
    </CustomerOverlayContext.Provider>
}

export const useCustomerOverlayContext = () => {
    const { show,newEntry,addUser,disableCamera,userMeta,enableCamera,submitBill } = useContext(CustomerOverlayContext);
  return { show,newEntry,addUser,disableCamera,userMeta,enableCamera,submitBill };
}