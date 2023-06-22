import React from "react";

const TaskContext = React.createContext({
    id: "",
    name: "",
    date: null,
    listId: "",
    priorty: 1000,
    description: "",
});

export default TaskContext;