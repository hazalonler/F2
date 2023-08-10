import { useEffect, useState,useContext } from "react";

import NewTask from "../NewTask/NewTask";
import ListItem from "./ListItem";
import BoardClient from "../../store/BoardClient"
import { useDrop } from "react-dnd";
import TaskContext from "../../store/task-ctx";
import Board from "./Board";
import BoardContext from "../../store/board-ctx";

const BoardList =  ({listId, name, style}) => {

    const boardCtx = useContext(BoardContext);

    const [tasksOnBoard, setTasksOnBoard] = useState([]);

    useEffect(() => {
        BoardClient.getTasksByListId(boardCtx.boardId, listId)
            .then((data) => {
                setTasksOnBoard(data);
            });
    }, []);

    console.log(tasksOnBoard);

    let priority = 0;

    if (tasksOnBoard.length !== 0) {
        priority = tasksOnBoard[tasksOnBoard.length-1].priority + 1000;
    } else {
        priority = 1000;
    }

 
    const addNewTaskHandler = (newTask) => {
        const enteredTask = {
            ...newTask,
            listId: listId,
            id: Math.random().toString(),
            priority: priority,
            description: "",
        };
       
        BoardClient.createTasks(boardCtx.boardId, enteredTask);

        setTasksOnBoard(prevTasks => {
            const updatedTasks = [enteredTask, ...prevTasks]; 
            return updatedTasks.sort((a, b) => a.priority - b.priority);
        });
            
    };

    const refresh = () => {
        BoardClient.getTasksByListId(boardCtx.boardId, listId)
            .then((data) => {
                setTasksOnBoard(data.filter(task => task.list_id === listId).sort((a,b) => a.priority - b.priority));
            });
    };


    const [ {isOver}, drop] = useDrop({
        accept: "ITEM",
        canDrop: (dragItem, monitor) => {
            console.log("listId of Board : " + JSON.stringify(listId));
            dragItem.list_id = listId;
            BoardClient.updateListData(dragItem).then(() => {
                refresh();
            })
        },

        drop: (dragItem, monitor) => {
            console.log("listId of Board : " + JSON.stringify(listId));
            dragItem.list_id = listId;
            BoardClient.updateListData(dragItem).then(() => {
                refresh();
            })
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
                                listId: task.list_id,
                                priority: task.priority,
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