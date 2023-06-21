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
                        className="form-control"
                        style={{borderRadius: "12px"}}
                        type="text"
                        autoFocus
                        placeholder="Enter a task name..." 
                        value={enteredName} 
                        onChange={nameChangeHandler}
                    />
                    <div className="input-group-append">
                        <button type="submit" className="btn mt-2 mr-2" style={{borderRadius: "12px", backgroundColor: "rgb(255, 178, 178)", borderColor: "rgb(255, 178, 178)"}} >Add Task</button>
                        <RxCross1 
                            type="button" 
                            className="btn-close mt-3 mr-2 rounded"
                            size="18px" 
                            onMouseOver={({target}) => target.style.backgroundColor="rgb(255, 178, 178)"} 
                            onMouseOut={({target}) => target.style.backgroundColor="rgb(255, 204, 204)"} 
                            onClick={props.onCancel} />
                    </div>
                </div>
            </form>
        </div>
    );

};

export default TaskForm;