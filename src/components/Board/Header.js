import { useState, useEffect, useContext } from "react";
import BoardClient from "../../store/BoardClient";
import BoardContext from "../../store/board-ctx";

const Header = () => {

    const boardCtx = useContext(BoardContext);
    console.log(boardCtx);

    return (
        <div className="container-fluid p-3"
            style={{backgroundColor: "rgb(255, 142, 142)", color: "rgb(96, 96, 96)"}}>
            <h2 >{boardCtx.boardName}</h2>
        </div>
    );
};

export default Header;