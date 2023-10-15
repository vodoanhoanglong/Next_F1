"use client";
import React from "react";
import { LocalStorage, guestToken } from "../shared";

interface IAuthContext {
  [LocalStorage.Token]: string;
  [LocalStorage.RefreshToken]: string;
}

const valueDefault = { [LocalStorage.Token]: guestToken as string, [LocalStorage.RefreshToken]: "" };

export const AuthContext = React.createContext<{
  localStorageValue: IAuthContext;
  setLocalStorageValue: React.Dispatch<React.SetStateAction<IAuthContext>>;
}>({
  localStorageValue: valueDefault,
  setLocalStorageValue: () => null,
});

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [localStorageValue, setLocalStorageValue] = React.useState<IAuthContext>(valueDefault);

  // Init state
  React.useEffect(() => {
    const token = localStorage.getItem(LocalStorage.Token);
    const refreshToken = localStorage.getItem(LocalStorage.RefreshToken);

    if (!token || !refreshToken) setLocalStorageValue(valueDefault);
    else
      setLocalStorageValue({
        [LocalStorage.Token]: token,
        [LocalStorage.RefreshToken]: refreshToken,
      });
  }, []);

  // Change value state
  React.useEffect(() => {
    localStorage.setItem(LocalStorage.Token, localStorageValue[LocalStorage.Token]);
    localStorage.setItem(LocalStorage.RefreshToken, localStorageValue[LocalStorage.RefreshToken]);
  }, [localStorageValue]);

  // Context data
  const authContextData = {
    localStorageValue,
    setLocalStorageValue,
  };

  // Return provider
  return <AuthContext.Provider value={authContextData}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
