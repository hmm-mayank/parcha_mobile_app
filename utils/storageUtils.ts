import AsyncStorage from "@react-native-async-storage/async-storage";

const getVendorDetails = async ()  => {
    let vendorInformation :any = await AsyncStorage.getItem("@vendorInfo");
    let masterInfo:[IVendorResponse] =vendorInformation && JSON.parse(vendorInformation);
    return masterInfo && masterInfo[0];
}


interface  IVendorResponse {
    productIds:[],
    shopCategory:null|string,
    shopName:string,
    userId:number,
    vendorCode:string,
    vendorId:number


}

const uKey = () =>  {
     const digits = Math.floor(Math.random() * 9000000000) + 1;
    // let randomKey = new Date().getMilliseconds()+digits;
    return 'fun';
};
export {getVendorDetails,IVendorResponse,uKey}