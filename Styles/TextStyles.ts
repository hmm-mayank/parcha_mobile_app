import { Dimensions, StyleSheet } from "react-native";
import { useThemeContext } from "../Context/ThemeContext";


export const textStyles = () => {
    const getUser = useThemeContext();
   return StyleSheet.create({
        container: {
          flex: 1,
         paddingRight:10,
         marginBottom:3,
         borderBottomColor:"#BFA2DB",
         borderBottomWidth:0.5,
         borderRadius:8,
         width: Dimensions.get('screen').width,
          flexDirection:"column", // by default column only
          backgroundColor: getUser.themeMeta.statusColor == "light" ? "#000" :  "#ffff"
        },
        rowContainer:{
            flexGrow:2,
            flexDirection:'row',
            alignItems:"center",
            height: 70,
        },rightSpan :{
            flexDirection:'row',
            flexGrow:3
        },
        leftSpan : {
            flexDirection:'row',
            flexGrow:0
        },
       bottomDiv:{
            height:100
       },
        qtyInput:{
           
            borderRadius:2,
            borderWidth:0.7,
            borderTopWidth:0,
            borderLeftWidth:0,
            borderRightWidth:0,
            padding:9,
            marginRight:25,
            borderTopEndRadius:4,
            borderBottomEndRadius:4,
            borderBottomLeftRadius:4,
            borderBottomRightRadius:4,
            borderTopRightRadius:4,
            borderTopLeftRadius:4,
            fontSize:17,
            color:getUser.themeMeta.statusColor == "light" ? "#ffff" :  "#000" ,
            borderColor:"#000"
        },
        mrp:{
            color:"#FF2442",
            textDecorationLine:"line-through",
            fontWeight:"700",
            fontSize:12
        },
        sp:{
            color:"#5D8233",
            fontSize:13,
            fontWeight:"900"
        },
        productName:{
            color: getUser.themeMeta.statusColor == "light" ? "#ffff" :  "#000" ,
           textTransform:"capitalize",
            fontWeight:"500",
            fontSize:18,
    
        },
        weight:{
            color:"#610094",
            textTransform:"capitalize",
             fontWeight:"500",
             fontSize:15,
        },boxStyle:{
            // flexDirection:"column",
             marginBottom:81,

            // paddingEnd:10,
            // paddingBottom:23
        },
        barScannerStyle:{
            height : 400
        },
        cameraBox:{
            // height : 400
        },
        description:{
            fontSize:23,
            alignSelf:"center",
            color:"yellow"
        },tinyLogo: {
            width: 60,
            resizeMode: 'contain',
            height: 60,
          },
          card:{
            borderWidth: 1,
            borderRadius: 5,
            borderColor: '#ddd',
            borderBottomWidth: 0,
            shadowColor: '#000000',
            shadowOffset: { width: 0, height: 3 },
            padding:2,
            shadowOpacity: 1,
            flexDirection:'row',
            justifyContent:'space-around',
            backgroundColor:"#fff",
            height:44
          },savingPrice:{
            fontWeight:'400',color:"#0000",fontSize:12
          }
       
      });
} 