import BoardList from "./BoardList";
import BoardClient from "../../store/BoardClient";

const Board = () => {
    return (
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
    );
};

export default Board;