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
          .then((data) => {
              setBoard({
                boardId: data.board_id,
                boardName: data.board_name,
                listConfig: data.list_config
              });
          });
   }, []);

   console.log(board);



  return (
      <DndProvider backend={HTML5Backend}>
        <Header />
            <BoardContext.Provider 
              value={board}
            > 
              <Board 
                key={board.boardId}
              /> 
            </BoardContext.Provider>
      
      </DndProvider>
  );
}

export default App;
