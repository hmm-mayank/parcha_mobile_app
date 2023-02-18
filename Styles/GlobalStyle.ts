import { Dimensions, StyleSheet } from "react-native";
import { useThemeContext } from "../Context/ThemeContext";


export const globalStyles = () => {
    const getUser = useThemeContext();
    return StyleSheet.create({
        container:{
            flex:1,
            flexDirection: 'column',
            justifyContent: 'center',
            margin:20
    },
     center:{
           alignSelf:"center"
     },
        heading:{
            textTransform:"uppercase",
            fontSize:20,
            fontWeight:"700"
        },
        uppercase:{
            textTransform:"uppercase"
        },
        defaultButton:{
            backgroundColor:"#000",
            color:"#fff",
            fontSize:15,
            fontWeight:"300"
        }
    })};