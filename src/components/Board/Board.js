import BoardList from "./BoardList";
import { Fragment, useContext } from "react";
import BoardContext from "../../store/board-ctx";
import "../Board/CSS-Folder/Board.css"

const Board = () => {

    const boardCtx = useContext(BoardContext);

    return (
        <Fragment>
            <div className="board">
                {boardCtx.listConfig.map((list) => {
                    return (
                        <BoardList
                            key={list.id}
                            listId={list.id}
                            name={list.listName}
                            style={list.style}
                        ></BoardList>
                    )
                })}
            </div>
        </Fragment>
    );
};

export default Board;