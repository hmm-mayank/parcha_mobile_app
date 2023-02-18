import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import { apiEndPoints } from "../utils/globals";
import { getVendorDetails } from "../utils/storageUtils";
import { IVendorContext } from "../container/VendorProductList/VendorProductInterface";

const Initials: IVendorContext = {
  init: function (): void | Promise<any> {
    throw new Error("Function not implemented.");
  },
  productList: [{}],
  update: function (product: any): Promise<void> {
    throw new Error("Function not implemented.");
  }
};
const VendorProductListContext = React.createContext(Initials);

export const VendorProductListContextProvider: React.FC<any> = ({
  children,
}) => {
  /**
   * Call Product List API for the specific Vendor
   * It will be called every time foucs reaches the page
   */
  const [productList, setProductList] = useState([{}]);

  // useEffect(() => {
  //    Initials.init();
  // }, []);
  Initials.init = async () => {
    const vendorDetails = await getVendorDetails();
    const { vendorId } = vendorDetails;
   
    const addProduct = await axios({
      baseURL: `${apiEndPoints}/`,
      url: "vendor/getVendorProduct",
      data: { vendorId: vendorId },
      method: "post",
    });

    setProductList([...addProduct.data?.productIds]);
    return [...addProduct.data?.productIds];
  };
  Initials.update = async (product) => {
    const vendorDetails = await getVendorDetails();
    const { vendorId } = vendorDetails;
    const updateProduct = await axios({
      baseURL: `${apiEndPoints}/`,
      url: "vendor/updateVendorProduct",
      data: { vendorId: vendorId,...product },
      method: "put",
    });
    if(updateProduct.data) {
      if (updateProduct.data["id"]) {
        Alert.alert("Product Updated Successfully");
        Initials.init();
      }
    }
  }
  return (
    <VendorProductListContext.Provider
      value={{ init: Initials.init, productList: productList,update:Initials.update }}
    >
      {children}
    </VendorProductListContext.Provider>
  );
};

export const useVendorProductListContext = () => {
  const { init, productList,update } = useContext(VendorProductListContext);
  return { init, productList,update };
};
