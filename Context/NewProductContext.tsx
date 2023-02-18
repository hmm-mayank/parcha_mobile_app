import axios from "axios";
import React, {useContext} from "react";
import {Alert} from "react-native";
import {INewProduct} from "../Interface/NewProduct.interface";
import {getVendorDetails} from "../utils/storageUtils";
import {apiEndPoints} from "../utils/globals";

let product: INewProduct = {
  image: [],
  name: "",
  weight: "",
  price: {
    mrp: "",
    pp: "",
    sp: "",
  },
  qrCode: "",
  addProduct: function (product: any): void | Promise<any> {
    throw new Error("Function not implemented.");
  }
};
const NewProductContext = React.createContext(product);

export const NewProdcutContextProvider: React.FC<any> = ({ children }) => {
  product.addProduct = async (product: any) => {

    let obj ={
      name:product["name"],
      mrp:product["mrp"],
      barCode:product["qrCodeId"],
      category:product["category"],
      weight:product['weight'],
     unit: product['unit'].toLowerCase(),
      source:"Android"
    }
    try {

      let vendorDetails = await getVendorDetails();
      const addProduct = await axios({
        baseURL:`${apiEndPoints}/`,
        url:"product/register",
        data:obj,
        method:"post"
      }).catch(error=>console.log(error,"qwerty"));

      const {userId, shopName, vendorId} = vendorDetails;

      // console.log(userId,shopName,vendorId);
      let vendorProduct ={
        productIds:[
          {
            id: addProduct.data.id,
            name: product["name"],
            mrp: product["mrp"],
            pp: product["pp"],
            sp: product["sp"],
            sku: 100
          }
      ],
        userId:userId,
        vendorId:vendorId,
        shopName:shopName
      }


      if (addProduct.status == 200) {
        const addProductToStore = await axios({
          baseURL:`${apiEndPoints}/`,
          url:"vendor/addVendorProduct",
          data:vendorProduct,
          method:"post"
        })

        Alert.alert("Product Added Succesfully");
        return true;
      }
      if (addProduct.status == 202){
        Alert.alert(addProduct.data.message[0].message);
        return false;
      }
      
    } catch (error) {
        console.log(error,"ff")
    }
    
    
  };

  return (
    <NewProductContext.Provider value={product}>
      {children}
    </NewProductContext.Provider>
  );
};

export const useNewProductContext = () => {
  const { addProduct } = useContext(NewProductContext);
  return { addProduct };
};
