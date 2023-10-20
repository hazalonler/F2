import { useState, useEffect, useContext } from "react";
import BoardContext from "../../store/board-ctx";
import "../Board/BoardCSS/Header.css"

const Header = () => {

    const boardCtx = useContext(BoardContext);

    return (
        <div className="header"
            style={{ color: "black"}}>
            <h2 >{boardCtx.boardName}</h2>
        </div>
    );
};

export default Header;