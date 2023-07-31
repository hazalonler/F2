import React from "react";

const TaskContext = React.createContext({
    id: "",
    name: "",
    date: "",
    listId: "",
    priority: 1000,
    description: "",
});

export default TaskContext;