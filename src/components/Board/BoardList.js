import { useEffect, useState,useContext } from "react";

import NewTask from "../NewTask/NewTask";
import ListItem from "./ListItem";
import BoardClient from "../../store/BoardClient"
import { useDrop } from "react-dnd";
import TaskContext from "../../store/task-ctx";
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
            priority: priority,
            description: "",
        };
       
        BoardClient.createTasks(boardCtx.boardId, enteredTask).then(() => {
            refresh();
        });
    };

    const refresh = () => {
        BoardClient.getTasksByListId(boardCtx.boardId, listId)
            .then((data) => {
                setTasksOnBoard(data);
            });
    };

    let list_priority = []

    tasksOnBoard.map((task) => {
        list_priority.push( JSON.stringify(task.name) + ":" + JSON.stringify(task.priority));
    })

    console.log(list_priority);


    const [ {isOver}, drop] = useDrop({
        accept: "ITEM",
        canDrop: (dragItem, monitor) => {
            dragItem.listId = listId;
            BoardClient.updateListData(dragItem).then(() => {
                refresh();
            })
        },

        drop: (dragItem, monitor) => {
            dragItem.listId = listId;
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
                                id: task._id,
                                name: task.name,
                                creationTs: task.creationTs,
                                updatedTs: task.updatedTs,
                                listId: task.listId,
                                boardId: task.boardId,
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