import { useCallback, useState } from "react";

import NewTask from "../NewTask/NewTask";
import ListItem from "./ListItem";
import BoardClient from "../../store/BoardClient"
import { useDrop } from "react-dnd";
import TaskContext from "../../store/task-ctx";

const BoardList =  ({listId, name, style}) => {

    const board = BoardClient.getBoardConfig().listConfig;
    const tasks = BoardClient.getTasks();
    const tasksByList = BoardClient.getTasksByListId(listId);

    let [tasksOnBoard, setTasksOnBoard] = useState(tasksByList);
 
    const addNewTaskHandler = (newTask) => {
        const enteredTask = {
            ...newTask,
            listId: listId,
            id: Math.random().toString(),
            priorty: tasksOnBoard[tasksOnBoard.length-1].priorty + 1000,
            description: "",
        };
        // BoardClient.pushTasks(enteredTask); new task has to be set on the backend

        setTasksOnBoard(prevTasks => {
            const updatedTasks = [enteredTask, ...prevTasks]; 
            return updatedTasks.sort((a, b) => a.priorty - b.priorty);
        });
            
    };

    const refresh = useCallback(() => {
        setTasksOnBoard(_ => {
            console.log("Refreshing: " + listId);
            return BoardClient.getTasksByListId(listId);
        });
    });

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

    const [ {isOver}, drop] = useDrop({
        accept: "ITEM",
        drop: (dragItem, monitor) => {
            console.log("listId of Board : " + JSON.stringify(listId));
            dragItem.listId = listId;
            BoardClient.updateListIdPr(dragItem);
            refresh();
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    });
/*
    const [{isOver}, drop] = useDrop({
        accept: "ITEM",
        canDrop: (item, monitor) => {
            console.log("canDrop: item:" + JSON.stringify(item));
            const itemIndex = board.findIndex(si => si.id === item.listId);
            const listIndex = board.findIndex(si => si.id === listId);
            return [itemIndex+1, itemIndex-1, itemIndex].includes(listIndex);
        },
        
        drop: (item, monitor) => {
            console.log("start-drop: item:" + JSON.stringify(item));
            setTasksOnBoard(prevState => {
                item.listId = listId;
                console.log("end-drop: item:" + JSON.stringify(item));
                BoardClient.update(item);
                return BoardClient.getTasksByListId(listId)
            })
        },
    }); 
*/
 
    return(
        <div className="col-lg mt-3 ml-3 shadow-lg p-3" style={style} >
            <h4 style={{color: "rgb(96, 96, 96)"}} >{name}</h4>
                <ul ref={drop} className="list-unstyled">
                    {tasksOnBoard.map((task) => (
                        <TaskContext.Provider 
                            value={{
                                id: task.id,
                                name: task.name,
                                date: task.date,
                                listId: task.listId,
                                priorty: task.priorty,
                                description: task.description,
                            }}
                        >
                            <ListItem
                                key={task.id}
                                refresh={refresh}
                            />
                        </TaskContext.Provider>
                    ))}
                    <NewTask onAddTask={addNewTaskHandler}/>
                </ul>
        </div>
    );
};

export default BoardList;