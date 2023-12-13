import { useEffect, useState, useContext } from "react";
import NewTask from "../NewTask/NewTask";
import ListItem from "./ListItem";
import BoardClient from "../../store/BoardClient";
import { useDrop } from "react-dnd";
import TaskContext from "../../store/task-ctx";
import BoardContext from "../../store/board-ctx";
import "../Board/CSS-Folder/BoardList.css";
import ListContext from "../../store/list-ctx";
const BoardList = ({ listId, name, style }) => {
  const boardCtx = useContext(BoardContext);

  const [tasksOnBoard, setTasksOnBoard] = useState([]);

  useEffect(() => {
    BoardClient.getTasksByListId(boardCtx.boardId, listId).then((data) => {
      setTasksOnBoard(data);
    });
  }, []);

  let priority = 0;

  if (tasksOnBoard.length !== 0) {
    priority = tasksOnBoard[tasksOnBoard.length - 1].priority + 1000;
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
    BoardClient.getTasksByListId(boardCtx.boardId, listId).then((data) => {
      setTasksOnBoard(data);
    });
  };

  const [{ isOver }, drop] = useDrop({
    accept: "ITEM",
    canDrop: (dragItem, monitor) => {
      dragItem.listId = listId;
      BoardClient.updateListData(dragItem).then(() => {
        refresh();
      });
    },

    drop: (dragItem, monitor) => {
      dragItem.listId = listId;
      BoardClient.updateListData(dragItem).then(() => {
        refresh();
      });
    },

    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });
  
  return (
    <div className="board-list">
      <h4>{name}</h4>
      <ul ref={drop} className="un-list">
        {tasksOnBoard.map((task, index) => ( 
          <TaskContext.Provider
            value={{
              indexTask: index,
              ...task
            }}
          >
            <ListItem key={task.id} refresh={refresh} />
          </TaskContext.Provider>
        ))}
        <NewTask onAddTask={addNewTaskHandler} />
      </ul>
    </div>
  );
};

export default BoardList;
