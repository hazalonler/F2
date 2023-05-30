import { useState } from "react";
import { RxCross1 } from "react-icons/rx";

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
                <div className="input-group-sm mb-2">
                    <input
                        class="form-control"
                        type="text"
                        placeholder="Enter a task name..." 
                        value={enteredName} 
                        onChange={nameChangeHandler}
                    />
                    <div className="input-group-append">
                        <button type="submit" className="btn btn-warning mt-2 mr-2" >Add Task</button>
                        <button type="button" className="btn btn-warning mt-2 mr-2" onClick={props.onCancel}>
                            <RxCross1 />
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );

};

export default TaskForm;