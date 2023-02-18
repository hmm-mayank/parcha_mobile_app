import React, { useEffect } from "react";
import { IappTheme } from "../../App";

const AppTheme = (props: IappTheme) => {
  useEffect(() => {
    console.log(props);
  }, []);
  return <></>;
};
export default AppTheme;
