import React from "react";
import { Fragment } from "react";
import { MdNotes } from "react-icons/md";
import { useContext, useState } from "react";
import TaskContext from "../../store/task-ctx";
import BoardClient from "../../store/BoardClient";
import "../PopUpPage/CSS-Folder/Activity.css";

const Activity = () => {

    const ctx = useContext(TaskContext);

    const [input, setInput] = useState(ctx.description);
    const [typing, setTyping] = useState(false);

    const inputChangeHandler = (event) => {
        setInput(event.target.value);
    };

    const submitHandler = (event) => {
        event.preventDefault();

        const taskData = {
            ...ctx,
            activity: input
        }

        // BoardClient.updateListData(taskData);
        setTyping(false);
    };

    const cancelHandler = () => {
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
        <div className="activity-title">
            <MdNotes size="16px"/>
            <h6>Activity</h6>
        </div>
        <div>
            {!typing && <div 
                            className="activity-not-typing"
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