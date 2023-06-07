import { useCallback, useState } from "react";

import NewTask from "../NewTask/NewTask";
import ListItem from "./ListItem";
import BoardClient from "../../store/BoardClient"
import { useDrop } from "react-dnd";

const BoardList =  ({listId, name, style}) => {

    const board = BoardClient.getBoardConfig().listConfig;
    const tasksByList = BoardClient.getTasksByListId(listId);

    const [tasksOnBoard, setTasksOnBoard] = useState(tasksByList);
 
    const addNewTaskHandler = (newTask) => {
        const enteredTask = {
            ...newTask,
            listId: listId,
        };

        setTasksOnBoard(prevTasks => {
            return [enteredTask, ...prevTasks]
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

    const [{isOver}, drop] = useDrop({
        accept: "ITEM",
        canDrop: (item, monitor) => {
            console.log("canDrop: item:" + JSON.stringify(item));
            const itemIndex = board.findIndex(si => si.id === item.listId);
            const listIndex = board.findIndex(si => si.id === listId);
            return [itemIndex+1, itemIndex-1, itemIndex].includes(listIndex);
        },
        drop: (item, monitor) => {
            console.log("drop: item:" + JSON.stringify(item));
            setTasksOnBoard(prevState => {
                const newItems = prevState
                    .filter(i => i.id !== item.id)
                    .concat({...item, listId: listId});
                return [...newItems];
            })
        },
        collect: monitor => ({
            isOver: monitor.isOver()
        })
    });
    
    const className = isOver ? "bg-info" : "list-unstyled";
 
    return(
        <div className="col-lg mt-3 ml-3 shadow-lg p-3 rounded" style={style} >
            <h4>{name}</h4>
            <ul className={`${className}`} ref={drop}>
                {tasksOnBoard.map((task, index) => (
                    <ListItem
                        key={task.id}
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