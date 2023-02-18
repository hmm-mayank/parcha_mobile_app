// @ts-ignore
// @ts-nocheck
import  React, { SetStateAction, useEffect, useLayoutEffect, useState }  from "react";
import { View,Modal, Alert, StyleSheet, Text, Pressable,Dimensions,FlatList, ActivityIndicator } from "react-native";
import { Avatar, ListItem } from "react-native-elements";
import { Button } from "react-native-elements/dist/buttons/Button";
import { Input } from "react-native-elements/dist/input/Input";
import { ScrollView } from "react-native-gesture-handler";
import { useVendorProductListContext } from "../../Context/VendorProductContext";
import { delay, rupeeSymbol } from "../../utils/globals";
import { IVendorProductList } from "./VendorProductInterface";
import AppLoading from 'expo-app-loading';
import { ScreenHeight } from "react-native-elements/dist/helpers";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "../../Styles/GlobalStyle";
import { uKey } from "../../utils/storageUtils";

const width = Dimensions.get("window").width;


const VendorProductList = ({ navigation }) => {
  const gs =  globalStyles();
  let sewarchSe: string | null = '';

    const {init,productList,update} = useVendorProductListContext();
    const [show,setShow] = useState(false);
    const [clearSearchQuery,setClearSearchQuery] = useState(false);
    const [loading,setLoading] = useState(false);
    const [searchText,setSearchText] = useState(sewarchSe);
    const [fullProductList,setfullProductList] = useState(productList)
    const [product, setProduct] = useState({ mrp: '' , name: "", sp: "" ,productId:0});
    const [copyProduct, setcopyProduct] = useState({ mrp: '' , name: "", sp: "" ,productId:0});

  

      React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
          getIniProduct();
        });
    
        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
      }, [navigation]);
    const getIniProduct = async (refresh=false) => {
      let prouct = await init();
      if (fullProductList.length >= 1 || refresh){
        
        setfullProductList([]);
        setfullProductList([ ...prouct]);
      }
    } 
    const searchElement =async (productList: [IVendorProductList],input:string,clear:boolean=false)=> {
      if (clear)  {
        setClearSearchQuery(true)
         let prouct = await init();
        setfullProductList([ ...prouct]);
        setClearSearchQuery(false)
      }
      else {
        let element = productList.filter(ele => ele.name?.toLocaleLowerCase().trim().includes(input?.toLocaleLowerCase()) );
        setfullProductList([...element]);
      }
         
    }
    const editProduct  = (product:IVendorProductList) => {
     
      setLoading(true);
        setProduct({
          ...product,
          productId: product.id,
          name:  product.name  || '',
          mrp: product.mrp || '',
          sp:product.sp || ''
        });
        setLoading(false);
        getIniProduct(true);
        setShow(!show)
    }

    const filterText = async (e: SetStateAction<string>)=> {
      await delay(1000);
      if (e) setSearchText(e);
      else setfullProductList(productList)
    }
    const updateForm = () => {
      if (parseInt(product.sp) > parseInt(product.mrp )) {
          Alert.alert("SP can't be more then MRP");
          return;
      }
       let {sp,name,mrp} = product;
       if (!sp || !name || !mrp  ) {
        Alert.alert("Please Check the Field");
        return;
       }
        update(product);
        setShow(false);
    }

    return (
     loading ?  <ActivityIndicator key={uKey.toString()} size="large" color={"black"} /> : !loading && <View key={uKey.toString()+"View"}  style={{ backgroundColor: "#fff", display:"flex",opacity:show ? 0.1 : 1 }}>
        {!clearSearchQuery && <View style={{marginBottom:10}}>
         <Input
          placeholder="Search Product"
          key={uKey.toString()+"SearchBox"}
          onChangeText={(e: string)=> searchElement(productList, e,false)}
          rightIcon={
            <Button
              // disabled={searchText.length < 2 ? true : false}
              onPress={(e) => searchElement(productList, searchText,true)}
              title={"clear"}
              buttonStyle={{ backgroundColor: "#000" }}
            />
          }
        /> 
        </View>}
       
        <SafeAreaView style={{top:0,marginTop:-55,height:ScreenHeight-10}} >
          {(fullProductList.length == 0 || fullProductList[0]["name"]  == null) ? (
            <View
              style={{
                flex: 1,
                marginBottom:10,
                justifyContent: "center",
                alignSelf: "center",
              }}
            >
              <Text style={gs.heading}>No Product</Text>
              <Button title={"Refresh"} onPress={ ()=> getIniProduct()} buttonStyle={{backgroundColor:"#000"}} />
            </View>
          ) : (
            <View >
            <FlatList
              data={fullProductList}
             
              renderItem={({ item, index, separators }) => (
                <React.Fragment  key={uKey.toString()+"frag"+index}>
                
                  <View
                    style={{
                      backgroundColor: "#fff",
                      height: 60,
                      borderWidth: 0.3,
                      borderBottomColor: "#000",
                    }}
                    key={uKey.toString()+"view"+index}
                  >
                    <Pressable onPress={() => editProduct(item)}  key={uKey.toString()+"press"+index}>
                      <ListItem.Title key={uKey.toString()+"List"+index}>
                        <Text key={uKey.toString()+"Listname"+index} style={styles.name}>{item.name} {item.weight} </Text>
                        <Text  key={uKey.toString()+"Listnamemrp"+index}  style={styles.mrp}>
                          MRP: {rupeeSymbol} {item.mrp}
                        </Text>
                        <Text  key={uKey.toString()+"Listsp"+index} style={styles.sp}>
                          &nbsp;&nbsp;SP : {rupeeSymbol}
                          {item.sp}
                        </Text>
                      </ListItem.Title>
                    </Pressable>
                  </View>
                </React.Fragment>
              )}
              keyExtractor={(item) => item.id}
            />
            </View>
          )}
          {show && (
            <Modal
              animationType="slide"
              key={uKey.toString()+"modal"} 
              style={{ width: 5400 }}
              transparent={true}
              visible={true}
              onRequestClose={() => {
                setShow(false);
                //   setModalVisible(!modalVisible);
              }}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Input
                    onChangeText={(e) => setProduct({ ...product, name: e })}
                    defaultValue={product.name}
                    placeholder="Name"
                    key="name"
                    rightIcon={<Text>Name</Text>}
                  />
                  <Input
                    keyboardType="numeric"
                    defaultValue={product.mrp}
                    onChangeText={(e) => setProduct({ ...product, mrp: e })}
                    placeholder="MRP"
                    key="mrp"
                    rightIcon={<Text>MRP</Text>}
                  />
                  <Input
                    keyboardType="numeric"
                    defaultValue={product.sp}
                    onChangeText={(e) => setProduct({ ...product, sp: e })}
                    placeholder="SP"
                    key="sp"
                    rightIcon={<Text>SP</Text>}
                  />

                  <Pressable
                    style={[styles.button, styles.buttonClose, { width: 100 }]}
                    onPress={() => updateForm()}
                  >
                    <Text style={styles.textStyle}>Submit</Text>
                  </Pressable>
                  <Pressable
                    style={[
                      styles.button,
                      { backgroundColor: "red", marginTop: 10, width: 100 },
                    ]}
                    onPress={() => setShow(false)}
                  >
                    <Text style={styles.textStyle}>Close</Text>
                  </Pressable>
                </View>
              </View>
            </Modal>
          )}
        </SafeAreaView>
      </View>
    );
}

export default React.memo(VendorProductList);

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
     
      backgroundColor: "white",
     borderRadius: 20,
      padding: 15,
      width:width - 40,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.55,
      shadowRadius: 4,
      elevation: 5
    },
    button: {
    borderRadius: 5,
      padding: 10,
      elevation: 4
    },
    buttonOpen: {
      backgroundColor: "#000",
    },
    buttonClose: {
      backgroundColor: "#000",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    },
    mrp: {
        color:'red',
        fontSize:15,
        textDecorationLine:'line-through'
    },
    sp: {
        color:'green',
        fontSize:18,
        fontWeight:'bold'
    },
    name:{
        fontWeight:"800",
        fontSize:16,
        textTransform:'uppercase'
    }
  });