import React from "react";

const TaskContext = React.createContext({
    id: "",
    name: "",
    creationTs: 0,
    updatedTs: 0,
    listId: "",
    boardId: "",
    priority: 1000,
    description: "",
    activity: [],
});

export default TaskContext;