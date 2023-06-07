import BoardList from "./BoardList";
import BoardClient from "../../store/BoardClient";

const Board = () => {

    const board = BoardClient.getBoardConfig();

    return (
        <div className="d-flex flex-row" style={{width: "1000px"}}>
            {board.listConfig.map((list) => {
                return (
                    <BoardList
                        key={list.id}
                        listId={list.id} 
                        name={list.name} 
                        style={list.style}
                    > </BoardList>
                )
            })}
        </div> 
    );
};

export default Board;