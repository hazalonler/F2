import { useState } from "react";

import NewTask from "./NewTask/NewTask";
import ListItem from "./ListItem";
import BoardClient from "../clients/BoardClient";


const BoardList =  (props) => {


    const boardClient = new BoardClient();

    const boardConfig = boardClient.getBoardConfig();
    const tasks = boardClient.getTasks();

    const tasksByList = new Map(
        boardConfig.listConfig.map(list => {
        return [list.id, []]
        })
    );

    tasks.forEach((task) => {
        if (tasksByList.has(task.listId)) {
        tasksByList.get(task.listId).push(task); 
        }
    });

    const [tasksOnBoard, setTasksOnBoard] = useState(tasksByList);
 
    const addNewTaskHandler = (task) => {
        setTasksOnBoard();
    };

    return (
        <div className="col-lg mt-3 ml-3 shadow-lg p-3 rounded" style={props.style} >
            <h4>{props.name}</h4>
            <ul className="list-unstyled">
                {props.tasks.map((task) => (
                    <ListItem name={task.name} date={task.date}/>
                ))}
                <NewTask onAddTask={addNewTaskHandler}/>
            </ul>
        </div>
    );
};

export default BoardList;