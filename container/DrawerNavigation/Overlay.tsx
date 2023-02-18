import React from 'react';
import { Text } from 'react-native';
import {  ThemeProvider } from "react-native-elements";

import { useThemeContext } from '../../Context/ThemeContext';

const OverlayContainer = () => {
  const {  changeTheme } = useThemeContext();
    const actionClick = () => {

      // changeTheme();
    }
  return <ThemeProvider>
   <Text onPress={actionClick}>apple</Text>
  </ThemeProvider>;
};

export default OverlayContainer;
