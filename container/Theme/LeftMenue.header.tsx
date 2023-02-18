import React from "react";
import { View, Text } from "react-native";
import { Icon } from "react-native-elements/dist/icons/Icon";


const LeftMenu = () => {
    const leftMenuTouch = ()=> {
        console.log("Hello")
    }
  return (
    <View>
      <Icon onPress={leftMenuTouch} name="menu" color="#fff"  />
    </View>
  );
};
export default LeftMenu;
