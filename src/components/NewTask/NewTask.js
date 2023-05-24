import { useState } from "react";

import TaskForm from "./TaskForm";

const NewTask = (props) => {

    const [showTaskForm, setShowTaskForm] = useState(false);

    const addButtonHandler = () => {
        setShowTaskForm(true);
    };

    const cancelButtonHandler = () => {
        setShowTaskForm(false);
    };

    const saveTaskNameHandler = (enteredTaskData) => {
        props.onAddTask(enteredTaskData);
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
                (<TaskForm  onSaveTaskName={saveTaskNameHandler} onCancel={cancelButtonHandler}/>
            )}
        </div>
    )

};

export default NewTask;