import { useState } from "react";

import TaskForm from "./TaskForm";

const NewTask = (props) => {

    const [showTaskForm, setShowTaskForm] = useState(false);

    const addButtonHandler = () => {
        setShowTaskForm(true);
    };

    const saveTaskNameHandler = (enteredTaskName) => {
        const enteredTask = {
            ...enteredTaskName,
            id: Math.random().toString() 
        };

        // board id eklenecek

        props.onAddTask(enteredTask);
        setShowTaskForm(false);

    };

    return (

        <div>
            {!showTaskForm && 
                (<button type="button" className="btn btn-warning mb-3" onClick={addButtonHandler}> 
                    + Add Task
                </button>
            )}
            {showTaskForm && 
                (<TaskForm  onSaveTaskName={saveTaskNameHandler} />
            )}
        </div>
    )

};

export default NewTask;