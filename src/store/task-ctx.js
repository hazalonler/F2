import React from "react";

const TaskContext = React.createContext({
    indexTask: 0,
    task: {}
});

export default TaskContext;