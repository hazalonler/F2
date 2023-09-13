import React from "react";

const BoardContext = React.createContext({
    boardId: "",
    boardName: "",
    listConfig: [{
        id: "",
        listName: "",
        style: {}
    }]
});

export default BoardContext;