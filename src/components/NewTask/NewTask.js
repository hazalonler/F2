import { Fragment, useState } from "react";
import TaskForm from "./TaskForm";
import "../NewTask/CSS-Folder/NewTask.css";

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
        <Fragment>
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
        </Fragment>
    )

};

export default NewTask;