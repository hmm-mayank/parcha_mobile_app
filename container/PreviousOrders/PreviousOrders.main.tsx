import React, {useEffect, useState} from "react";
import { Text, View } from "react-native";
import { Card, Chip, Divider, Overlay, Button } from "react-native-elements";
import { usePreviousOrderContext } from "../../Context/PreviousOrderContext";
import { productDetails, rupeeSymbol } from "../../utils/globals";
import moment from "moment";
import { ScrollView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import {parse} from "react-native-svg";
import {uKey} from "../../utils/storageUtils";
import { useFocusEffect } from '@react-navigation/native';
const PreviousOrderScreen: React.FC<{}> = () => {
  const [visible, setVisible] = useState(false);
  const [overLayProduct,setOverLayProduct] = useState([]);
  const toggleOverlay = (products:any) => {
      setOverLayProduct(products);
    setVisible(!visible);
  };
    const getOrders = usePreviousOrderContext();
    useFocusEffect(
        React.useCallback(() => {

            getOrders.fetchNew();
        }, [])
    );

  // @ts-ignore


    return (
    <ScrollView style={{ backgroundColor: "#fff" }} key={uKey()}>

      {getOrders?.orders &&
        getOrders?.orders.reverse().map((element, i) => {
          return (

            <Card
                key={uKey()}
              containerStyle={{
                borderColor:
                  element?.cashierId  ? "#064420" : "#FF5C58",
                borderWidth: 0.3,
                opacity: 1,
                borderRadius: 5,
                shadowOffset: {
                  width: 3,
                  height: 2,
                },
                shadowOpacity: 0.3,
              }}
            >

              <Card.Title key={uKey()}>
                {element?.customer?.name} / {element?.customer?.phone}
              </Card.Title>
              <View key={uKey()} style={{ flexDirection: "row" }}>
                <View key={uKey()} style={{ flex: 1 }}>
                  <Text key={uKey()}>
                    Amount :{" "}
                    <Text key={uKey()} style={{ fontWeight: "bold", fontSize: 18 }}>
                      {rupeeSymbol + " " +  element?.cartProduct.reduce((total:number,product:any)=> total + parseFloat(product.sp)*parseInt(product.units),0)}
                    </Text>
                  </Text>
                </View>
                <Divider key={uKey()} orientation="vertical" style={{ marginRight: 30 }} />
                <View key={uKey()} style={{ flex: 1 }}>
                  <Text key={uKey()}>
                    Date:
                    <Text key={uKey()} style={{ fontWeight: "bold", fontSize: 15 }}>
                      {" "}
                      {moment.utc(element?.createdAt).local().format("DD-MM-YY | HH:mm A")}
                    </Text>
                  </Text>
                </View>
              </View>
              <View style={{ flexDirection: "row" }}>

                <View key={uKey()} style={{ flex: 1 }}>
                  <Chip
                    title={"Order Detail"}
                    key={uKey()}
                    onPress={() => toggleOverlay(element?.cartProduct)}
                    containerStyle={{ paddingTop: 10 }}
                    titleStyle={{ color: "#fff", fontWeight: "bold" }}
                    buttonStyle={{
                      borderColor: "#000",
                      backgroundColor: "#000",
                      borderWidth: 1,
                      borderRadius: 3,
                    }}
                  />
                </View>
              </View>
            </Card>
          );
        })}

      <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
        
          <StatusBar hidden />
          <View
            style={{
              flexDirection: "row",
            }}
            key={uKey()}
          >
            <View style={{ flexBasis: "40%" }} key={uKey()}>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "bold",
                  textTransform: "uppercase",
                }}
                key={uKey()}
              >
                Name
              </Text>
            </View>

            <View style={{ flexBasis: "27.5%" }}>
              <Text
                  key={uKey()}
                style={{
                  fontSize: 12,
                  fontWeight: "bold",
                  textTransform: "uppercase",
                }}
              >
                COST PRICE
              </Text>
            </View>

            <View style={{ flexBasis: "27%" }}>
              <Text
                  key={uKey()}
                style={{
                  fontSize: 12,
                  fontWeight: "bold",
                  textTransform: "uppercase",
                }}
              >
                Selling Price
              </Text>
            </View>
          </View>
          <Divider
              key={uKey()}
            orientation="horizontal"
            style={{
              borderWidth: 1,
              borderColor: "grey",
              marginTop: 4,
              opacity: 0.2,
              marginBottom: 4,
            }}
          />
          {overLayProduct.length > 0 &&  <View key={uKey()} style={{flex: 1}}>
              <ScrollView key={uKey()} showsVerticalScrollIndicator>
                  {overLayProduct?.map((ele, id) => {
                      return (
                          <>
                              <View
                                  key={uKey()}
                                  style={{
                                      flexDirection: "row",
                                  }}
                              >
                                  <View key={uKey()}style={{flexBasis: "45%"}}>
                                      <Text key={uKey()} style={{fontSize: 18}}>{`${ele.productName.split(" ")} (${ele.units})`}</Text>
                                  </View>


                                  <View key={uKey()} style={{flexBasis: "27.5%"}}>
                                      <Text key={uKey()} style={{fontSize: 18}}>
                                          {rupeeSymbol + ele.mrp}
                                      </Text>
                                  </View>

                                  <View key={uKey()} style={{flexBasis: "27%"}}>
                                      <Text style={{fontSize: 18}}>
                                          {rupeeSymbol + ele.sp}
                                      </Text>
                                  </View>
                              </View>
                              <Divider
                                  key={uKey()}
                                  orientation="horizontal"
                                  style={{
                                      borderWidth: 1,
                                      borderColor: "grey",
                                      marginTop: 4,
                                      opacity: 0.2,
                                      marginBottom: 4,
                                  }}
                              />
                          </>
                      );
                  })}
              </ScrollView>
          </View>}

          <Card
          wrapperStyle={{  
              margin: 0,
              alignSelf:"center",
             
                padding: 0,
              } }
            containerStyle={{
              margin: 0,
              padding: 0,
              borderWidth: 1,
              justifyContent:'center'
              
            }}
          >
            <View key={uKey()} style={{ flexDirection: "row" }}>
              <View key={uKey()} style={{ flexBasis: "50%", bottom: 0 }}>
                <Button
                    key={uKey()}
                  title={"close"}
                  onPress={toggleOverlay}
                  style={{ top: 0 }}
                />
              </View>
                {overLayProduct.length > 0 && <View style={{flexBasis: "50%"}} key={uKey()}>
                    <Text
                        key={uKey()}
                        style={{
                            fontSize: 20,
                            textAlign: "center",
                        }}
                    >
                        TOTAL:{" "}
                        {`${overLayProduct?.reduce(
                            (initial, product) => +initial + parseFloat(product.sp) * parseInt(product.units),
                            0
                        )}`}
                    </Text>
                </View>}
            </View>
          </Card>
       
      </Overlay>
    </ScrollView>
  );
};

export default PreviousOrderScreen;
