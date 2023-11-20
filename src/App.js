import Board from "./components/Board/Board";
import Header from "./components/Board/Header";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import BoardContext from "./store/board-ctx";
import { useState, useEffect } from "react";
import BoardClient from "../src/store/BoardClient";

const App = () => {

  const [board, setBoard] = useState({
    boardId: "",
    boardName: "",
    listConfig: []
  });

  useEffect(() => {
      BoardClient.getBoardConfig()
          .then((data) => {data.map((firstData) => {
            setBoard({
              boardId: firstData.id,
              boardName: firstData.name,
              listConfig: firstData.list_configs
            });
          })});
   }, []);


  return (
      <DndProvider backend={HTML5Backend}>
            <BoardContext.Provider 
              value={board}
            > 
              <Header />
              <Board 
                key={board.boardId}
              /> 
            </BoardContext.Provider>
      </DndProvider>
  );
}

export default App;
