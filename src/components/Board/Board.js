import BoardList from "./BoardList";
import { Fragment, useContext } from "react";
import BoardContext from "../../store/board-ctx";
import { CircularProgressbar,buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

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
            <CircularProgressbar value={25} text={`25%`} />
        </Fragment>
    );
};

export default Board;