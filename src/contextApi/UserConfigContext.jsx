import React from "react";
import { createContext, useState } from "react";

export const ConfigContext = createContext();

function UserConfigContext({ children }) {
  const [darkTheme, setDarkTheme] = useState(true);

  return (
    <ConfigContext.Provider
      value={{
        darkTheme,
        setDarkTheme,
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
}

export default UserConfigContext;
