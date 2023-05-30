import { useState } from "react";

import BoardList from "./components/Board/BoardList";
import BoardClient from "./store/BoardClient";

function App() {

  const tasksByList = new Map(
    BoardClient.getBoardConfig().listConfig.map(list => {
      return [list.id, []]
    })
  );

  BoardClient.getTasks().forEach((task) => {
    if (tasksByList.has(task.listId)) {
      tasksByList.get(task.listId).push(task); 
    }
  });

  const [tasksOnBoard, setTasksOnBoard] = useState(tasksByList)

  const newTaskHandler = (newTask) => {
    setTasksOnBoard(
      tasksByList.get(newTask.listId).push(newTask)
    );
  }

  return (
      <div>
        <div className="container-fluid bg-primary text-white p-3">
          <h2 >Project Name</h2>
        </div>
        <div className="d-flex flex-row" style={{width: "1000px"}}>
          {BoardClient.getBoardConfig().listConfig.map((list) => (
            <BoardList
              key={list.id}
              listId={list.id} 
              name={list.name} 
              style={list.style}
              tasks={tasksOnBoard.get(list.id)}
              onAddNewTask={newTaskHandler}
            />
          ))}
        </div> 
      </div>
  );
}

export default App;
