import React from "react";

const BoardContext = React.createContext({
    boardId: "",
    boardName: "",
    listConfig: [{
        id: "",
        name: "",
        style: {}
    }]
});

export default BoardContext;