import { useEffect, useCallback, useState } from "react";

import NewTask from "../NewTask/NewTask";
import ListItem from "./ListItem";
import BoardClient from "../../store/BoardClient"
import { useDrop } from "react-dnd";
import TaskContext from "../../store/task-ctx";
import Board from "./Board";

const BoardList =  ({listId, name, style}) => {

    const [tasksOnBoard, setTasksOnBoard] = useState([]);

    useEffect(() => {
        BoardClient.getTasksByListId()
            .then((data) => {
                setTasksOnBoard(data.filter(task => task.list_id === listId).sort((a,b) => a.priority - b.priority));
            });
    }, []);

    console.log(tasksOnBoard);

 
    const addNewTaskHandler = (newTask) => {
        const enteredTask = {
            ...newTask,
            listId: listId,
            id: Math.random().toString(),
            priorty: tasksOnBoard[tasksOnBoard.length-1].priorty + 1000,
            description: "",
        };
        // BoardClient.pushTasks(enteredTask); new task has to be set on the backend
        BoardClient.pushTasks(enteredTask);

        setTasksOnBoard(prevTasks => {
            const updatedTasks = [enteredTask, ...prevTasks]; 
            return updatedTasks.sort((a, b) => a.priorty - b.priorty);
        });
            
    };

    const refresh = useCallback(() => {
        console.log("Refreshing: " + listId);
        return (
            BoardClient.getTasksByListId()
                .then((data) => {
                    setTasksOnBoard(data.filter(task => task.list_id === listId).sort((a,b) => a.priority - b.priortiy));
                })
        );
    });

    const [ {isOver}, drop] = useDrop({
        accept: "ITEM",
        canDrop: (dragItem, monitor) => {
            console.log("listId of Board : " + JSON.stringify(listId));
            dragItem.listId = listId;
            BoardClient.updateListIdPr(dragItem);
            refresh();
        },

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