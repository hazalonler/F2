import BoardList from "./components/BoardList";
import BoardClient from "./clients/BoardClient";

function App() {

  const boardClient = new BoardClient();

  const boardConfig = boardClient.getBoardConfig();

  const backlogList = [
    {
        name: "Prepare a new board",
        date: new Date(2023, 4, 3),
        listId: 'e1',
    },
    {
        name: "Prepare a task list",
        date: new Date(2023, 5, 6),
        listId: 'e2',
    },
    {
        name: "Prepare a task list",
        date: new Date(2023, 5, 6),
        listId: 'e3',
    },
    {
        name: "Prepare a new board",
        date: new Date(2023, 4, 3),
        listId: 'e1',
    },
    {
        name: "Prepare a task list",
        date: new Date(2023, 5, 6),
        listId: 'e2',
    },
    {
        name: "Prepare a task list",
        date: new Date(2023, 5, 6),
        listId: 'e3',
    },
  ];


  const tasksInColumns = {
    "e1" : [
      {
          name: "Prepare a new board",
          date: new Date(2023, 4, 3),
      },
    ],
    "e2" : backlogList,
    "e3" : backlogList,
    "e4" : backlogList,
  };


  return (
    <div>
      <div className="container-fluid bg-primary text-white p-3">
        <h2 >Project Name</h2>
      </div>
      <div className="d-flex flex-row" style={{width: "1000px"}}>
        {boardConfig.listConfig.map((column) => (
          <BoardList
            key={column.id} 
            name={column.name} 
            style={column.style}
            tasks={tasksInColumns[column.id]}  
          />
        ))}
      </div> 
    </div>
  );
}

export default App;
