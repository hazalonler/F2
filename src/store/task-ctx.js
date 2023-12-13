import React from "react";

const TaskContext = React.createContext({
    task: {
        indexTask: 0,
        task: {}
    },
});

export default TaskContext;