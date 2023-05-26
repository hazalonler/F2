
import BoardList from "./components/Board/BoardList";
import BoardClient from "./store/BoardClient";

function App() {

  const boardClient = new BoardClient();

  const boardConfig = boardClient.getBoardConfig();
  const tasks = boardClient.getTasks();

  const tasksByList = new Map(
    boardConfig.listConfig.map(list => {
      return [list.id, []]
    })
  );

  tasks.forEach((task) => {
    if (tasksByList.has(task.listId)) {
      tasksByList.get(task.listId).push(task); 
    }
  });


  return (
      <div>
        <div className="container-fluid bg-primary text-white p-3">
          <h2 >Project Name</h2>
        </div>
        <div className="d-flex flex-row" style={{width: "1000px"}}>
          {boardConfig.listConfig.map((list) => (
            <BoardList
              key={list.id}
              listId={list.id} 
              name={list.name} 
              style={list.style}
              tasks={tasksByList.get(list.id)}
            />
          ))}
        </div> 
      </div>
  );
}

export default App;
