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