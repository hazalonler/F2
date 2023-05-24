import { useState } from "react";

const TaskForm = (props) => {

    const [enteredName, setEnteredName] = useState("");

    const nameChangeHandler = (event) => {
        setEnteredName(event.target.value);
    };

    const submitHandler = (event) => {
        event.preventDefault();

        const taskData = {
            name: enteredName,
            date: null,
        };

        props.onSaveTaskName(taskData);
        setEnteredName("");
    };

    return (
        <div >
            <form onSubmit={submitHandler}>
                <div>
                    <div>
                        <label>Task Name</label>
                        <input 
                            type="text" 
                            value={enteredName} 
                            onChange={nameChangeHandler}/>
                    </div>
                </div>
                <div>
                    <button type="submit">Add Task</button>
                    <button type="button" onClick={props.onCancel}>Carpi Ikonu Konacak</button>
                </div>
            </form>
        </div>
    );

};

export default TaskForm;