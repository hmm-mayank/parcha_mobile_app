import AsyncStorage from "@react-native-async-storage/async-storage";
import  React, { useEffect, useState }  from "react";
import { Alert, KeyboardAvoidingView, Platform, Text, View } from "react-native";
import { Button } from "react-native-elements/dist/buttons/Button";
import { Input } from "react-native-elements/dist/input/Input";
import { ScrollView } from "react-native-gesture-handler";
import { globalStyles } from "../../Styles/GlobalStyle";
import { defaultVendorSetting, IVendorSetting } from "./VendorSettingInterface";


const VendorSetting = () => {


    const [customerSetting, setCustomerSetting] = useState(defaultVendorSetting);

        useEffect(()=>{init()},[])

        const init = async ()=> {
            try {
               let setting = await AsyncStorage.getItem('@billSetting');
               //@ts-ignore
               setting = JSON.parse(setting);
                //@ts-ignore
               setCustomerSetting(setting)
               
            } catch (error) {
                
            }
        }
    const submitSetting =async () => {
        AsyncStorage.setItem('@billSetting',JSON.stringify(customerSetting));
        Alert.alert("Setting Saved");
        // setCustomerSetting(defaultVendorSetting)
    }
    const gs = globalStyles();
    return (
      <KeyboardAvoidingView style={{flex:1}} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <ScrollView keyboardShouldPersistTaps={false} keyboardDismissMode={"on-drag"} style={{ backgroundColor: "#fff" }}>
           <Text style={[gs.center,gs.heading]} >Shop Fields</Text>
        <Input
          rightIcon={<Text>Shop Name</Text>}
          placeholder="Shop Name"
          onChangeText={(e) =>
            setCustomerSetting({ ...customerSetting, name: e })
          }
          value={customerSetting?.name || ''}
        />
        <Input
          rightIcon={<Text>Shop Address</Text>}
          placeholder="Shop Address"
          returnKeyType='done'
          
          onChangeText={(e) =>
            setCustomerSetting({ ...customerSetting, address: e })
          }
          value={customerSetting?.address || ''}
        />
        <Input
          rightIcon={<Text>Shop Phone</Text>}
          placeholder="Shop Phone"
          onChangeText={(e) =>
            setCustomerSetting({ ...customerSetting, phone: e })
          }
          value={customerSetting?.phone || ''}
        />
        <Input
          rightIcon={<Text>Shop Name</Text>}
          placeholder="Thanks Text"
          
          onChangeText={(e) =>
            setCustomerSetting({ ...customerSetting, thanksText: e })
          }
          value={customerSetting?.thanksText || ''}
        />

        <Text style={[gs.center,gs.heading]} >Billing Fields</Text>

        <Input
          rightIcon={<Text>Items</Text>}
          placeholder="items"
          
          onChangeText={(e) =>
            setCustomerSetting({ ...customerSetting, rItemText: e })
          }
          value={customerSetting?.rItemText || ''}
        />
        <Input
          rightIcon={<Text>Quantity</Text>}
          placeholder="qty"
          onChangeText={(e) =>
            setCustomerSetting({ ...customerSetting, rQtyText: e })
          }
          value={customerSetting?.rQtyText || ''}
        />
        <Input
          rightIcon={<Text>MRP</Text>}
          placeholder="mrp"
          onChangeText={(e) =>
            setCustomerSetting({ ...customerSetting, rMrpText: e })
          }
          value={customerSetting?.rMrpText || ''}
        />
        <Input
          rightIcon={<Text>SP</Text>}
          placeholder="total"
          onChangeText={(e) =>
            setCustomerSetting({ ...customerSetting, rTotalText: e })
          }
          value={customerSetting?.rTotalText || ''}
        />
        <Input
          rightIcon={<Text>Item Font Size</Text>}
          placeholder="font size"
          keyboardType="numeric"
          onChangeText={(e) =>
            setCustomerSetting({ ...customerSetting, rItemFontSize: e })
          }
          value={customerSetting?.rItemFontSize || ''}
        />
        <Input
          rightIcon={<Text>Item Heading Font Size</Text>}
          placeholder="font size"
          keyboardType="numeric"
          onChangeText={(e) =>
            setCustomerSetting({ ...customerSetting, rItemHeadingFontSize: e })
          }
          value={customerSetting?.rItemHeadingFontSize || ''}
        />
        <Button
          title={"Submit"}
          buttonStyle={{ backgroundColor: "#000" }}
          onPress={()=> submitSetting()}
        ></Button>
      </ScrollView>
      </KeyboardAvoidingView>
    );
}

export default VendorSetting;