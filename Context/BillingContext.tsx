import React, { useContext, useState } from "react";
import {ToastAndroid, Vibration} from "react-native";


import {scanProduct} from "../utils/axios";
import {getVendorDetails} from "../utils/storageUtils";
interface userInfo {
  name: string | null;
  phone: string | null;
  email: string | null;
  uuid: string | null;
}
export interface productInfo {
  productId:number,
  productName?: string | null;
  mrp: number ;
  sp: number ;
  sku?: number;
  units:number;
  image?: string;
  weight: string | null;
  weightUnit: string | null;
  barCodeId?:string;
}

interface Ibilling {
  userInfo?: userInfo;
  productInfo?: productInfo[];
  addProduct?: (product:productInfo) =>void,
  deleteProduct?: (id:number) =>void,
    updateQty?: (id:number,qty:any) =>void,clearView?:()=>void
}
const intitalValue: Ibilling = {
  productInfo: [],
};
const BillingContext = React.createContext(intitalValue);

export const BillingContextProvider: React.FC<any> = ({ children }) => {

    let [productInfo, setAddProductItem] = useState<[] | [productInfo]  >([]);

    const clearView = () => {
        setAddProductItem([]);
    }
    const addProduct = async (product:productInfo) => {
            let getVendorInformation =await getVendorDetails();
        // @ts-ignore
       
        let dat = await scanProduct({barCodeId:product.toString(),vendorId:getVendorInformation.vendorId});
 let productDetail = dat.data?.product;
        if (productDetail){
            let ele: productInfo = {
                productId: productDetail.id,
                productName: productDetail.name,
                mrp: productDetail.mrp,
                sp: productDetail.sp,
                weight: productDetail.weight,
                weightUnit:productDetail.unit,
                barCodeId:productDetail.barCodeId,
                units:1
            };

            Vibration.vibrate([100,200]);

            // @ts-ignore
           
           if(!productInfo.some(e=> e.productId === productDetail.id)){
               setAddProductItem([...productInfo,ele])
           }
           else {
               ele['units'] ++;
               let tempClone = productInfo;
               tempClone.filter(element => {
                   if (element.productId == productDetail.id){
                       return  element["units"]++; // increasing the count here
                   }
               })
               setAddProductItem([...productInfo])
           }
        }
        else {
            ToastAndroid.show('Product not found',2);
        }
    }
    const deleteProduct = (id:number) =>{
        productInfo.splice(id,1);
        setAddProductItem([...productInfo])
        
    }
    const updateQty = (id:number,qty:any) => {
      
      productInfo[id].units = parseInt(qty);
      setAddProductItem([...productInfo]);
    }
  return (
    <BillingContext.Provider value={{productInfo,addProduct,deleteProduct,updateQty,clearView}}>
      {children}
    </BillingContext.Provider>
  );
};

export const useBillingContext = () => {
  const { productInfo,addProduct,deleteProduct,updateQty,clearView } = useContext(BillingContext);
  return { productInfo,addProduct,deleteProduct,updateQty,clearView };
};
