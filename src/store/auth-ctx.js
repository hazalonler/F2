import React from "react";
import BoardClient from "./BoardClient"; 

const AuthContext = React.createContext({
    id: "",
    name: "",
    date: null,
    listId: "",
    priorty: 1000,
    description: "",
});

export default AuthContext;