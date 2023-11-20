import React from "react";

const BoardContext = React.createContext({
    boardId: "",
    boardName: "",
    listConfig: [],
});

export default BoardContext;