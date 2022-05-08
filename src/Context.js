
import React from "react";
export const Context = React.createContext();
export let AuthContext = React.createContext({ user: undefined, setUser: undefined });