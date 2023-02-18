import React, { useEffect, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  View,
} from "react-native";
import { Button, Input } from "react-native-elements";
import { globalStyles } from "../../Styles/GlobalStyle";
import axios, { AxiosResponse } from "axios";
import { apiEndPoints } from "../../utils/globals";
import { Picker } from "@react-native-picker/picker";
import { uKey } from "../../utils/storageUtils";
import SystemContainer from "../systemContainer/SystemContainer";

interface ICategory {
  id: number;
  name: string;
}

const Offer = () => {
  const [formData, setFormData] = useState({
    name: "",
    reset: false,
  });

  const [initialJson, setInitialJson] = useState({
    offerOn: [
      { label: "Product", value: "product", key: "product" },
      { label: "Category", value: "category", key: "category" },
    ],
    offerType: [
      { label: "percentage", value: "percentage", key: "percentage" },
      { label: "Price", value: "price", key: "price" },
    ],
  });

  useEffect(() => {
    initilize();
  }, []);

  const initilize = () => {
    axios({
      baseURL: `${apiEndPoints}/category/`,
      url: "getAll",
      method: "get",
    })
      .then((res: AxiosResponse<[ICategory]>) => {
        // setInitialOptions([...res.data])
      })
      .catch((error) => {
        throw error;
      });
  };

  const gs = globalStyles();
  return (
   <SystemContainer> 
        <Text key={uKey()} style={[gs.center, gs.heading]}>
          Add Offer
        </Text>
        {initialJson.offerOn && (
          <Picker mode={"dropdown"}>
            {initialJson.offerOn.map((ele) => (
              <Picker.Item value={ele.value} key={uKey()} label={ele.label} />
            ))}
          </Picker>
        )}

        {initialJson.offerType && (
          <Picker mode={"dropdown"}>
            {initialJson.offerType.map((ele) => (
              <Picker.Item value={ele.value} key={uKey()} label={ele.label} />
            ))}
          </Picker>
        )}

        <Input
          autoFocus={true}
          key={`offerName${formData.reset ? uKey() : ""}`}
          placeholder={"Offer Name"}
          onChangeText={(e) => setFormData({ name: e, reset: false })}
          rightIcon={<Text>Offer Name</Text>}
        />
        <Button key={uKey()} title={"submit"} buttonStyle={gs.defaultButton} />
    </SystemContainer>
  );
};

export default Offer;
