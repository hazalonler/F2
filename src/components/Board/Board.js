import BoardList from "./BoardList";
import BoardClient from "../../store/BoardClient";
import { useContext } from "react";
import BoardContext from "../../store/board-ctx";

const Board = () => {

    const boardCtx = useContext(BoardContext);

    console.log(boardCtx.listConfig);

    return (
        <div className="d-flex flex-row" style={{width: "1000px"}}>
            {boardCtx.listConfig.map((list) => {
                return (
                    <BoardList
                        key={list.id}
                        listId={list.id}
                        name={list.name}
                        style={list.style}
                    ></BoardList>
                )
            })}
        </div> 
    );
};

export default Board;