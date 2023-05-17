import BoardColumn from "./components/BoardColumn";
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
      <h2 className="bg-primary text-white p-3 ml-5 mr-5 mt-3 mb-3">Project Name</h2>
      <div className="container">  
        <div className="row">
          {boardConfig.listConfig.map((column) => (
            <BoardColumn 
              key={column.id} 
              name={column.name} 
              style={column.style}
              tasks={tasksInColumns[column.id]}  
            />
          ))}
        </div>
      </div>  
    </div>
  );
}

export default App;
