import React from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const SystemContainer = ({children}:any) => {
    return <ScrollView contentContainerStyle={{ flex: 1, backgroundColor: "white"}}>
    <KeyboardAvoidingView
      behavior="position"
      style={{ backgroundColor: "white", paddingBottom: 110, flex: 1 }}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
    >
        {children}
    </KeyboardAvoidingView>
    </ScrollView>
}
export default SystemContainer;