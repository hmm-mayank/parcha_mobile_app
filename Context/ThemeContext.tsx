import React, { useState, FC, useContext, useEffect } from "react";
import { DefaultTheme, DarkTheme } from "@react-navigation/native";
import { IappTheme, ITheme } from "../App";
import AsyncStorage from "@react-native-async-storage/async-storage";

const contextParamenter: IappTheme = {
  themeMeta: {
    themeLabel: "Light",
    statusColor: "dark",
    theme: DefaultTheme,
  },
  changeTheme: () => {},
};

const ThemeContext = React.createContext(contextParamenter);

export const ThemeContextProvider: FC<any> = ({ children }) => {
  let { changeTheme } = contextParamenter;
  const [themeMeta, setTheme] = useState(contextParamenter.themeMeta); // set theme type

  changeTheme = async () => {
    await AsyncStorage.clear();

    // TODO - when implement color theme please uncomment below code


    // if (themeMeta.theme === DefaultTheme) {
    //   let obj: ITheme = {
    //     theme: DarkTheme,
    //     themeLabel: "Light",
    //     statusColor: "light",
    //   };
    //   setTheme(obj);
    // } else if (themeMeta.theme === DarkTheme) {
    //   let obj: ITheme = {
    //     theme: DefaultTheme,
    //     themeLabel: "Dark",
    //     statusColor: "dark",
    //   };
    //   setTheme(obj);
    // }
    // TODO - when implement color theme please uncomment above code
  };

  return (
    <ThemeContext.Provider value={{ themeMeta, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export function useThemeContext() {
  const { themeMeta, changeTheme } = useContext(ThemeContext);
  return { themeMeta, changeTheme };
}
export default ThemeContext;
