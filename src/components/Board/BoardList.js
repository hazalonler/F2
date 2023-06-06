import { useCallback, useState } from "react";

import NewTask from "../NewTask/NewTask";
import ListItem from "./ListItem";
import BoardClient from "../../store/BoardClient"


const BoardList =  (props) => {

    const tasks = BoardClient.getTasksByListId(props.listId);

    const [tasksOnBoard, setTasksOnBoard] = useState(tasks);
 
    const addNewTaskHandler = (newTask) => {
        const enteredTask = {
            ...newTask,
            listId: props.listId,
        };

        setTasksOnBoard(prevTasks => {
            if (enteredTask.listId === props.listId) {
                return [enteredTask, ...prevTasks]
            }
        });
    };

    const moveListItem = useCallback(
        (dragIndex, hoverIndex) => {
            const dragItem = tasksOnBoard[dragIndex]
            const hoverItem = tasksOnBoard[hoverIndex]
            setTasksOnBoard(tasksOnBoard  => {
                const updatedTasks = [...tasksOnBoard]
                updatedTasks[dragIndex] = hoverItem
                updatedTasks[hoverIndex] = dragItem
                return updatedTasks
            });
        }, 
        [tasksOnBoard],
    );

 
    return(
        <div className="col-lg mt-3 ml-3 shadow-lg p-3 rounded" style={props.style} >
            <h4>{props.name}</h4>
            <ul className="list-unstyled">
                {tasksOnBoard.map((task, index) => (
                    <ListItem
                        key={index}
                        index={index}
                        item={task}
                        moveListItem={moveListItem}
                    />
                ))}
                <NewTask onAddTask={addNewTaskHandler}/>
            </ul>
        </div>
    );
};

export default BoardList;