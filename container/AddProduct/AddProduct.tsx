import { Formik, useFormik, Field } from "formik";
import React, { useEffect, useState,useCallback } from "react";
import { Text, View, StyleSheet, Dimensions, Alert } from "react-native";
import Draggable from "react-native-draggable";
import { Button } from "react-native-elements/dist/buttons/Button";
import { Icon } from "react-native-elements/dist/icons/Icon";
import { Input } from "react-native-elements/dist/input/Input";
import { ScrollView } from "react-native-gesture-handler";
import { useNewProductContext } from "../../Context/NewProductContext";
import { G } from "../../globalUnits";
import CodeScanner from "../../Modules/CodeScanner";
import Axios, { AxiosResponse } from "axios";
import { apiEndPoints } from "../../utils/globals";
import axios from "axios";
import { ICategory } from "../Category/Category";
import { Picker } from "@react-native-picker/picker";
import { uKey } from "../../utils/storageUtils";
import {  useFocusEffect, useNavigation } from "@react-navigation/native";

const initailValue = {
  mrp: "",
  name: "",
  category: 0,
  qrCodeId: "",
  sp: "",
  weight: "",
  unit: "",
};
const { width, height } = Dimensions.get("window");
const AddProduct = () => {
  let { addProduct } = useNewProductContext();
  const navigation = useNavigation();
  const [barCodeValue, setBarCodeValue] = useState<String | null>(
    "Scan Product"
  );
  const [formValues, setFormValues] = useState(initailValue);
  const [selectedValue, setSelectedValue] = useState(0);
  const [clearFiled, setclearFiled] = useState("");
  const [scanned, setScanned] = useState(true);
  const [enableCamera, setEnableCamera] = useState(false);
  const [initialOptions, setInitialOptions] = useState<[ICategory]>([]);
  const [boxKey, setBoxKey] = useState("");
  const [defaultState, setDefaultState] = useState({
    name: "",
    mrp: "",
    weight: "",
    unit: "",
  });

  // useEffect(() => {
  //   console.log("giiogle")
  //   if(navigation.isFocused()){
  //     console.log("isFocused");
     
  //     return () => console.log('unmounting...');
  //     // setBoxKey(new Date().getMilliseconds().toString());
  //   }
  // },[]);

  // const initilize = async  () => {
  //   const fetchCategory = await axios.get(`${apiEndPoints}/category/getAll`);
  //   console.log("APPLE",fetchCategory.data);
  //   if(fetchCategory.data?.length > 0)
  //   {
  //     setInitialOptions([ ...fetchCategory.data]);
  //   }
  // };

  const barCode = async (e: any) => {
    setclearFiled("refresh");
    setBoxKey(new Date().getMilliseconds().toString());

    let dat = await Axios({
      baseURL: `${apiEndPoints}/product`,
      url: "globalProduct",
      method: "post",
      data: {
        barCode: e.toString(),
      },
    });

    dat.data && setFormValues(dat.data);

    setBarCodeValue(e);
    setEnableCamera(false);
    if (e) return true;
  };
  const enableCameraToScan = () => {
    setEnableCamera(!enableCamera);
  };
  const handleSubmit = async (e: any) => {
    console.log(formValues)
    let { name, mrp, qrCodeId, sp, category='admin', weight, unit } = formValues;
    if (name &&  mrp && barCodeValue && weight && unit) {
      let alpha = formValues;
      //@ts-ignore
      alpha["qrCodeId"] = barCodeValue;
      const getValue = await addProduct(alpha);
      if (getValue) {
        setBoxKey(new Date().getMilliseconds().toString());
        setScanned(true);
        setSelectedValue(0);
        setFormValues(initailValue);
        setBarCodeValue(null);
      }
    } else {
      Alert.alert("Please check Information Above");
      return;
    }
  };
  return (
    <ScrollView style={npStyles.container}>
      <Input
        placeholderTextColor={G.placeHolderColor}
        style={npStyles.textBox}
        value={barCodeValue}
        editable={false}
        key={boxKey + "barcodeValue"}
        keyboardType="number-pad"
        returnKeyLabel="Next"
        rightIcon={
          <Button
            title={"bar Code"}
            buttonStyle={{ backgroundColor: "black" }}
            onPress={enableCameraToScan}
          ></Button>
        }
      />

      <Input
        placeholderTextColor={G.placeHolderColor}
        style={npStyles.textBox}
        value={formValues["name"]}
        placeholder="Product Name"
        key={boxKey + "productName"}
        onChangeText={(e) => setFormValues({ ...formValues, name: e })}
        rightIcon={<Text>Name</Text>}
      />

      <Input
        placeholderTextColor={G.placeHolderColor}
        style={npStyles.textBox}
        placeholder="Product Weight"
        keyboardType="number-pad"
        value={formValues["weight"]?.toString()}
        key={boxKey + "productWeight"}
        onChangeText={(e) => setFormValues({ ...formValues, weight: e })}
        rightIcon={<Text>Weight</Text>}
      />

      <Input
        placeholderTextColor={G.placeHolderColor}
        style={npStyles.textBox}
        placeholder="Weight Unit"
        value={formValues["unit"]}
        key={boxKey + "weightUnit"}
        onChangeText={(e: any) => setFormValues({ ...formValues, unit: e })}
        rightIcon={<Text>Weight Unit</Text>}
      />

      {/* {initialOptions && (
        <Picker
          collapsable={true}
          key={"addProduct-dropdown"}
          selectedValue={formValues["category"]}
          onValueChange={(itemValue, itemIndex) =>
            setFormValues({ ...formValues, category: itemValue as number })
          }
          mode={"dropdown"}
        >
          {initialOptions.map((ele: ICategory,index) => (
            <Picker.Item value={ele.id} key={`dropDown${index}`} label={ele.name} />
          ))}
        </Picker>
      )} */}

      <Input
        placeholderTextColor={G.placeHolderColor}
        style={npStyles.textBox}
        placeholder="MRP"
        defaultValue={formValues["mrp"]?.toString()}
        key={boxKey + "mrp"}
        keyboardType="number-pad"
        onChangeText={(e) => setFormValues({ ...formValues, mrp: e })}
        rightIcon={<Text>MRP</Text>}
      />
      <Input
        placeholderTextColor={G.placeHolderColor}
        style={npStyles.textBox}
        placeholder="Selling Price"
        key={boxKey + "sp"}
        keyboardType="number-pad"
        onChangeText={(e) => setFormValues({ ...formValues, sp: e })}
        rightIcon={<Text>SP</Text>}
      />
      {/* <Input 
       placeholderTextColor={G.placeHolderColor}
        style={npStyles.textBox}
        placeholder="Purchased Price"
        keyboardType="number-pad"
        key={boxKey+"pp"}
        returnKeyLabel="Next"
        onChangeText={handleChange("pp")}
        rightIcon={<Text>Purchased Price</Text>}
      /> */}

      {enableCamera && (
        <Draggable x={100} y={200}>
          <CodeScanner
            flash={false}
            getValue={barCode}
            enableCamera={scanned}
          />
        </Draggable>
      )}
      <Button
        style={{ marginTop: 10 }}
        key={boxKey + "submit"}
        buttonStyle={{ backgroundColor: "#000" }}
        icon={<Icon name="map" color="#fff"></Icon>}
        onPress={(e: any) => handleSubmit(e)}
        //  disabled={isSubmit}
        title="Submit"
      ></Button>
    </ScrollView>
  );
};
export default AddProduct;

const npStyles = StyleSheet.create({
  container: {
    margin: 1,
    backgroundColor: G.backgroundColor,
    height: Dimensions.get("window").height,
  },
  textBox: {
    fontSize: 18,
  },
});
