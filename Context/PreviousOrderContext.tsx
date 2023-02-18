import Axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { IPreviousOrder, IPreviousOrderList } from "../Interface/IpreviousOrder";
import {getVendorDetails} from "../utils/storageUtils";
import { useFocusEffect } from '@react-navigation/native';
import {apiEndPoints} from "../utils/globals";
const PreviousOrderContext = React.createContext<IPreviousOrderList>({} as IPreviousOrderList);

export const PreviousOrderContextProvieder: React.FC<any> = ({
  children,
}) => {
        const G: IPreviousOrderList = { productList: [null] };
        const [orders, setOrders] = useState<IPreviousOrderList>([]);

        useEffect(() => {
          fetchOrders && fetchOrders();
        }, [setOrders]);
        // for fetching the Product at initializing of the screen
        // @ts-ignore
    const fetchOrders = async () => {
            let vendorDetails = await getVendorDetails();
            
            const getInitialData = await Axios({
                baseURL:`${apiEndPoints}/billing`,
                url:"vendorOrder",
                data:{vendorId:vendorDetails.vendorId},
                method:"post"
            })
            if (getInitialData.data){
                setOrders(getInitialData.data);
            }

        };
        // for fetching the Product at initializing of the screen

    return (
        <PreviousOrderContext.Provider value={{orders:orders,fetchNew:fetchOrders}}>
            {children}
        </PreviousOrderContext.Provider>
    )
};

export const usePreviousOrderContext = () => {
    const {orders,fetchNew} = useContext(PreviousOrderContext);
    return { orders,fetchNew}
}