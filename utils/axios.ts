import Axios from "axios";
import {apiEndPoints} from "./globals";

/**
 * Billing register api to sumbit the products
 * @param data
 */
const postBilling = async (data:any) => {
   return Axios({
       method:"post",
        baseURL:`${apiEndPoints}/billing`,
        url:'register',
        data
    })
}

 interface IScannedProduct {
    "barCodeId" :string
    "vendorId":number
}
const scanProduct = async (data:IScannedProduct) => {
    return Axios({
        method:"post",
        baseURL:`${apiEndPoints}/billing`,
        url:'sc',

        data
    })
}
export   { postBilling,scanProduct,IScannedProduct }
