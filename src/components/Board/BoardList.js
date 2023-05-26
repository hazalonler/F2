import { useState } from "react";

import NewTask from "../NewTask/NewTask";
import ListItem from "./ListItem";

const BoardList =  (props) => {

    const [tasksOnBoard, setTasksOnBoard] = useState(props.tasks);
 
    const addNewTaskHandler = (newTask) => {

        const enteredTask = {
            ...newTask,
            listId: props.listId,
        };

        setTasksOnBoard((prevTasks) => {
            return [enteredTask, ...prevTasks];
        });
    };


    return(
        <div className="col-lg mt-3 ml-3 shadow-lg p-3 rounded" style={props.style} >
            <h4>{props.name}</h4>
            <ul className="list-unstyled">
                {tasksOnBoard.map((task) => (
                    <ListItem name={task.name} date={task.date}/>
                ))}
                <NewTask onAddTask={addNewTaskHandler}/>
            </ul>
        </div>
    );
};

export default BoardList;