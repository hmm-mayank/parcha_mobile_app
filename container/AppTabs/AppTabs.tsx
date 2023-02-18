import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import OverlayContainer from '../DrawerNavigation/Overlay';
import Scanner from "../Scanner";

const Tab = createBottomTabNavigator();

function ApplicationTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Scanner} />
      {/* <Tab.Screen name="Settings" component={OverlayContainer} /> */}
    </Tab.Navigator>
  );
}
export default ApplicationTabs;