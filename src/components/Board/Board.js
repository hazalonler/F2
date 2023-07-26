import BoardList from "./BoardList";
import BoardClient from "../../store/BoardClient";
import { useEffect, useState } from "react";

const Board = () => {

    const [board, setBoard] = useState([]);

    useEffect(() => {
        BoardClient.getBoardConfig()
            .then((data) => {
                console.log(data.list_config);
                setBoard(data.list_config);
            });
     }, []);

    return (
        <div className="d-flex flex-row" style={{width: "1000px"}}>
            {board.map((list) => {
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