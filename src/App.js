import Board from "./components/Board/Board";
import Header from "./components/Board/Header";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const App = () => {
  return (
      <DndProvider backend={HTML5Backend}>
        <Header />
        <Board />
      </DndProvider>
  );
}

export default App;
