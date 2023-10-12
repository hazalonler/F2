import React from "react";
import { Fragment } from "react";
import { MdNotes } from "react-icons/md";
import { useContext, useState } from "react";
import TaskContext from "../../store/task-ctx";
import BoardClient from "../../store/BoardClient";

const Activity = () => {

    const ctx = useContext(TaskContext);

    const [input, setInput] = useState(ctx.description);
    const [oldInput, setOldInput] = useState("");
    const [typing, setTyping] = useState(false);

    const inputChangeHandler = (event) => {
        setInput(event.target.value);
    };

    const submitHandler = (event) => {
        event.preventDefault();

        const taskData = {
            ...ctx,
            description: input
        }

        BoardClient.updateListData(taskData);
        setOldInput(input);
        setTyping(false);
    };

    const cancelHandler = () => {
        setInput(oldInput);
        setTyping(false);
    };

    const clickHandler = () => {
        setTyping(true);
    };

    let description = "";

    if (input.length === 0) {
        description = "Write a comment";
    } else {
        description = input;
    }

    return(
        <Fragment>
        <div className="d-flex flex-row" style={{marginTop: "10px"}}>
            <MdNotes size="16px"/>
            <h6 className="pl-1">Activity</h6>
        </div>
        <div>
            {!typing && <div 
                            className="d-flex flex-column mt-2 mb-2 pl-3 pt-2"
                            style={{
                                backgroundColor: "rgb(255, 186, 186)", 
                                height: "50px", 
                                borderRadius: "12px",
                            }}
                            onMouseOver={({target}) => target.style.backgroundColor="rgb(255, 178, 178)"}
                            onMouseOut={({target}) => target.style.backgroundColor="rgb(255, 186, 186)"}
                            type="button"
                            onClick={clickHandler}
                        >
                            {description}
                        </div>   
            }
            {typing && <div>
                            <textarea
                                className="form-control"
                                type="textarea"
                                autoFocus
                                rows={`${1}`} 
                                value={input} 
                                onChange={inputChangeHandler} 
                            ></textarea>
                            <button type="button" className="btn-close btn-warning mt-2 rounded mr-2 ml-3" onClick={submitHandler}>Save</button>
                            <button type="button" className="btn-close btn-secondary mt-2 rounded" onClick={cancelHandler}>Cancel</button>
                        </div>
            }
        </div>
    </Fragment>

    );
};


export default Activity;