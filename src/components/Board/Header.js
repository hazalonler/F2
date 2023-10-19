import { useState, useEffect, useContext } from "react";
import BoardContext from "../../store/board-ctx";

const Header = () => {

    const boardCtx = useContext(BoardContext);

    return (
        <div className="container-fluid p-3 m-3"
            style={{ color: "black", }}>
            <h2 >{boardCtx.boardName}</h2>
        </div>
    );
};

export default Header;