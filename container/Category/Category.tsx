import React, {useEffect, useState} from 'react';
import {Alert, Text, View} from "react-native";
import {Button, Input} from "react-native-elements";
import {globalStyles} from "../../Styles/GlobalStyle";
import axios, {AxiosResponse} from "axios";
import {apiEndPoints} from "../../utils/globals";
import {Picker} from "@react-native-picker/picker";
import {uKey} from "../../utils/storageUtils";

export  interface ICategory {
    id: number,
    name:string ,
}

const Category = () => {

    const [formData,setFormData] = useState({
        name:'',
        reset:false
    })
    const [selectedValue, setSelectedValue] = useState(0)

    const [initialOptions,setInitialOptions] = useState<[ICategory]>([{name:'Select Category',id:0}])

    useEffect(()=>{
        initilize();
    },[])

    const initilize =()=> {
        axios({
            baseURL:`${apiEndPoints}/category/`,
            url:"getAll",
            method:"get",
        }).then((res:AxiosResponse<[ICategory]>)=>{ 
            console.log(res,"GET");
            //@ts-ignore
            setInitialOptions([...initialOptions,...res.data])
        }).catch(error=>{
            throw  error;
        })
    }

    const submitForm = (id: string | number = -1)=>{
         
        // @ts-ignore
           id > 0 &&  setSelectedValue(parseInt(id))
      
           if (formData.name.length > 3){
               // @ts-ignore
               if (selectedValue > 0 ) formData['id'] = selectedValue;
            axios({
                baseURL:`${apiEndPoints}/category/`,
                url:selectedValue > 0 ? "update" : "register",
                method: selectedValue > 0 ? "put": "post",
                data:formData
            }).then(res=>{
                if (res.status == 200) {
                    Alert.alert("Success","Request Submitted Successfully")
                    initilize();
                    setFormData({name: '',reset: true})
                    setSelectedValue([{name:'Select Category',id:0}])
                }
            }).catch(error=>{
                Alert.alert("Error","Something went Wrong !!")
            })
        }
       
    }
    const gs = globalStyles();
   return <View style={gs.container}>
        <Text key={uKey()} style={[gs.center,gs.heading]}>Add/Update Category</Text>
       {initialOptions && <Picker  selectedValue={selectedValue} onValueChange={(itemValue, itemIndex) =>
            submitForm(itemValue)
  }  mode={"dropdown"} >
           {
               initialOptions.map((ele:ICategory)=><Picker.Item  value={ele.id} key={uKey()} label={ele.name}/> )
           }
       </Picker>}
        <Input autoFocus={true} key={`category1${formData.reset ? uKey(): ''}`}  placeholder={"Category"} onChangeText={(e)=>setFormData({name: e,reset: false})}  rightIcon={<Text>Category</Text>}/>
        <Button key={uKey()}  title={"submit"} onPress={()=> submitForm(-1)} buttonStyle={gs.defaultButton} />
    </View>
}

export default  Category;