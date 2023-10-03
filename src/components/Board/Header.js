import { useState, useEffect, useContext } from "react";
import BoardContext from "../../store/board-ctx";

const Header = () => {

    const boardCtx = useContext(BoardContext);

    return (
        <div className="container-fluid p-3"
            style={{backgroundColor: "rgb(242, 103, 103)", color: "rgb(96, 96, 96)"}}>
            <h2 >{boardCtx.boardName}</h2>
        </div>
    );
};

export default Header;