import React, { useState } from "react";
import { Dimensions, View, StyleSheet, Text } from "react-native";
import { Button, Overlay } from "react-native-elements";
import { Icon } from "react-native-elements/dist/icons/Icon";
import { TextInput } from "react-native-gesture-handler";
import { useCustomerOverlayContext } from "../../Context/CustomerOverlayContext";
import { Formik } from "formik";
import SystemContainer from "../systemContainer/SystemContainer";

export interface ICs {
  show: boolean;
  enableCamera:boolean;
  disableCamera:()=>void;
  userMeta: { name: string; phone: string };
  addUser: (_name: string, _phone: string) => void;
  newEntry: () => void;
    submitBill?: (productInfo:any,userMeta:any) => void;
}
export const CustomerOverlay: React.FC<ICs> = () => {
  const { newEntry, show,addUser } = useCustomerOverlayContext();
    const [isSubmit,setIsSubmit] = useState(true);
  const validateUserInfo = (_name:string,_phone:string) => {
    console.log(_phone.length)
        if ( _phone.length == 9){
            setIsSubmit(false);
        }
        else {
            setIsSubmit(true);
        }
  }
  return (
    <SystemContainer>
    <Overlay isVisible={show} onBackdropPress={newEntry}>
      <Formik
        initialValues={{ name: "",phone:"" }}
        onSubmit={(values) => addUser(values.name,values.phone)}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View>
            <Text style={styles.textStyle}>New Customer</Text>
            
            <TextInput
              placeholder="Phone Number"
              placeholderTextColor={"grey"}
              maxLength={10}
              onSubmitEditing={values.phone.length === 10 && handleSubmit}
              style={styles.textBoxStyle}
              returnKeyType="done"
              autoFocus={true}
              keyboardType="number-pad"
              keyboardAppearance="default"
              onChangeText={handleChange('phone')}
              onChange={()=> validateUserInfo(values.name,values.phone)}
              onBlur={handleBlur('phone')}
              value={values.phone}
            
            />
              <View style={{marginTop:20}}>
            <Button
              style={{ marginTop: 20 }}
              buttonStyle={{ backgroundColor: "#000" }}
              icon={<Icon name="map" color="#fff"></Icon>}
              onPress={handleSubmit}
              disabled={isSubmit}
              title="Submit"
            ></Button>
              </View>
          </View>
        )}
      </Formik>
    </Overlay>
    </SystemContainer>
  );
};

const styles = StyleSheet.create({
  textBoxStyle: {
    borderColor: "#000",
    fontSize: 20,
    borderWidth: 1,
    fontWeight: "600",
    padding: 12,
    marginTop: 10,
    width: Dimensions.get("window").width - 70,
  },
  textStyle: {
    fontSize: 24,
    padding: 12,
    marginTop: 10,
    alignSelf: "center",
  },
});
