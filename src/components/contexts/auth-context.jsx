import { createContext } from "react";

export const AuthContext = createContext({
    currentUser : {},
    setAuthUser: () => {},
    getUserData: () => {},
    userSigIn: () => {},
    userSignOut: () => {}
})