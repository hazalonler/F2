import React from "react";
import BoardClient from "./BoardClient"; 

const AuthContext = React.createContext({
    taskContext: {},
});

export default AuthContext;