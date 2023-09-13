import BoardList from "./BoardList";
import { Fragment, useContext } from "react";
import BoardContext from "../../store/board-ctx";

const Board = () => {

    const boardCtx = useContext(BoardContext);

    return (
        <Fragment>
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
        </Fragment>
    );
};

export default Board;