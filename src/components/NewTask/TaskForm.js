import { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import "./TaskForm.css"

const TaskForm = (props) => {

    const [enteredName, setEnteredName] = useState("");

    const nameChangeHandler = (event) => {
        setEnteredName(event.target.value);
    };

    const submitHandler = (event) => {
        event.preventDefault();

        const taskData = {
            name: enteredName,
            date: "",
        };

        props.onSaveTaskName(taskData);
        setEnteredName("");
    };

    return (
        <div >
            <form className="task-form" onSubmit={submitHandler}>
                <input
                    className=""
                    style={{borderRadius: "12px"}}
                    type="text"
                    autoFocus
                    placeholder="Enter a task name..." 
                    value={enteredName} 
                    onChange={nameChangeHandler}
                />
                <div className="append-btn">
                    <button type="submit" className="add-btn" >Add Task</button>
                    <RxCross1 
                        type="button" 
                        className="close-btn"
                        onClick={props.onCancel} />
                </div>
            </form>
        </div>
    );

};

export default TaskForm;