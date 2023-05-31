import BoardList from "./components/Board/BoardList";
import BoardClient from "./store/BoardClient";

function App() {

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
            />
          ))}
        </div> 
      </div>
  );
}

export default App;
