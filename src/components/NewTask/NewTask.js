import { useState } from "react";
import TaskForm from "./TaskForm";
import "./NewTask.css";

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
                (<button 
                    className="new-task" 
                    onClick={addButtonHandler}
                > 
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