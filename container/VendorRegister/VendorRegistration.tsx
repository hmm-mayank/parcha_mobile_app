import { Formik, useFormik,Field } from "formik";
import React, { useEffect, useState } from "react";
import { Text, View,StyleSheet, Dimensions } from "react-native";
import Draggable from "react-native-draggable";
import { Button } from "react-native-elements/dist/buttons/Button";
import { Icon } from "react-native-elements/dist/icons/Icon";
import { Input } from "react-native-elements/dist/input/Input";
import { ScrollView } from "react-native-gesture-handler";
import { useNewProductContext } from "../../Context/NewProductContext";
import { G } from "../../globalUnits";
import CodeScanner from "../../Modules/CodeScanner";

const VendorRegistration = () => {
    let { addProduct } = useNewProductContext();
    const [barCodeValue, setBarCodeValue] = useState("Scan Product");
    const [clearFiled,setclearFiled] = useState("");
    const [scanned, setScanned] = useState(true);

    const [boxKey, setBoxKey] = useState("");
    useEffect(()=>{
        setBoxKey(new Date().getMilliseconds().toString())
    },[])


    return (
        <ScrollView style={npStyles.container}>
            <Formik
                initialValues={{ name: "",qrCodeId:barCodeValue }}
                onSubmit={async (values,{resetForm,setStatus,setSubmitting,setErrors}) => {
                    values['qrCodeId'] = barCodeValue;
                    try {
                        const getValue =  await addProduct(values)

                        if(getValue){
                            setBoxKey(new Date().getMilliseconds().toString())
                            setScanned(true);
                            setBarCodeValue("Scan Product")
                        }
                        setclearFiled("refresh");
                        setStatus({success: true})
                    } catch (error) {
                        setStatus({success: false})
                        setSubmitting(false)
                        console.log(error)
                        // setErrors({submit: error.message})
                    }
                    // resetForm({});

                }}
            >
                {({ handleChange, handleBlur, handleSubmit, values,resetForm,setFieldValue }) => (
                    <View>
                        <Input
                            placeholderTextColor={G.placeHolderColor}
                            style={npStyles.textBox}
                            placeholder="Shop Name"
                            key={boxKey+"shopName"}
                            onChangeText={handleChange("name")}
                            rightIcon={<Text>Name</Text>}
                        />

                        <Input
                            placeholderTextColor={G.placeHolderColor}
                            style={npStyles.textBox}
                            placeholder="Shop Phone Number"
                            keyboardType="number-pad"
                            key={boxKey+"shopContactNumber"}
                            onChangeText={handleChange("weight")}
                            rightIcon={<Text>Weight</Text>}
                        />

                        <Input
                            placeholderTextColor={G.placeHolderColor}
                            style={npStyles.textBox}
                            placeholder="Address"
                            key={boxKey+"shopAddress"}
                            onChangeText={handleChange("weightUnit")}
                            rightIcon={<Text>Weight Unit</Text>}
                        />
                        <Input
                            placeholderTextColor={G.placeHolderColor}
                            style={npStyles.textBox}
                            placeholder="Selling Price"
                            key={boxKey+"sp"}
                            keyboardType="number-pad"
                            onChangeText={handleChange("sp")}
                            rightIcon={<Text>SP</Text>}
                        />
                        <Input
                            placeholderTextColor={G.placeHolderColor}
                            style={npStyles.textBox}
                            placeholder="MRP"
                            key={boxKey+"mrp"}
                            keyboardType="number-pad"
                            onChangeText={handleChange("mrp")}
                            rightIcon={<Text>MRP</Text>}
                        />
                        <Input
                            placeholderTextColor={G.placeHolderColor}
                            style={npStyles.textBox}
                            placeholder="Purchased Price"
                            keyboardType="number-pad"
                            key={boxKey+"pp"}
                            returnKeyLabel="Next"

                            onChangeText={handleChange("pp")}
                            rightIcon={<Text>Purchased Price</Text>}
                        />
                        <Input
                            placeholderTextColor={G.placeHolderColor}
                            style={npStyles.textBox}
                            value={barCodeValue}
                            editable={false}
                            key={boxKey+"barcodeValue"}
                            keyboardType="number-pad"
                            returnKeyLabel="Next"
                            onTextInput={()=>handleChange("qrCode")}
                            rightIcon={<Text>Bar Code</Text>}
                        />

                        <Button
                            style={{ marginTop: 10 }}
                            key={boxKey+"submit"}
                            buttonStyle={{ backgroundColor: "#000" }}
                            icon={<Icon name="map" color="#fff"></Icon>}
                            onPress={(e: any) => handleSubmit(e)}
                            //  disabled={isSubmit}
                            title="Submit"
                        ></Button>

                    </View>
                )}
            </Formik>
        </ScrollView>
    );
};
export default VendorRegistration;

const npStyles = StyleSheet.create({
    container:{
        margin:1,
        backgroundColor:G.backgroundColor,
        height:Dimensions.get('window').height,
    },textBox:{
        fontSize:18
    }
})
