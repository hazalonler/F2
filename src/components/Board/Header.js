import { useState, useEffect } from "react";
import BoardClient from "../../store/BoardClient";

const Header = () => {

    const [boardName, setBoardName] = useState();

    useEffect(() => {
        BoardClient.getBoardConfig()
            .then((data) => {
                    setBoardName(data.board_name);
                });
     }, []);

    return (
        <div className="container-fluid p-3"
            style={{backgroundColor: "rgb(255, 142, 142)", color: "rgb(96, 96, 96)"}}>
            <h2 >{boardName}</h2>
        </div>
    );
};

export default Header;