import { useCallback, useState } from "react";

import NewTask from "../NewTask/NewTask";
import ListItem from "./ListItem";
import BoardClient from "../../store/BoardClient"
import { useDrop } from "react-dnd";


const BoardList =  ({listId, name, style}) => {

    const tasksByList = BoardClient.getTasksByListId(listId);

    const [tasksOnBoard, setTasksOnBoard] = useState(tasksByList);
 
    const addNewTaskHandler = (newTask) => {
        const enteredTask = {
            ...newTask,
            listId: listId,
        };

        setTasksOnBoard(prevTasks => {
            if (enteredTask.listId === listId) {
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

    const [{isOver}, drop] = useDrop({
        accept: "ITEM",
        canDrop: (item, monitor) => {
            const itemIndex = (listId === item.listId);
            return [itemIndex+1, itemIndex-1, itemIndex].includes(listId);
        },
        drop: (item, monitor) => {
            setTasksOnBoard(prevState => {
                const newItems = prevState
                    .filter(i => i.listId !== item.listId)
                    .concat({ ...item, listId})
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
                <ul className={`${className}`}>
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