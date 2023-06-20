import BoardClient from "../../store/BoardClient";

const Header = () => {

    const project = BoardClient.getBoardConfig();

    return (
        <div className="container-fluid p-3"
            style={{backgroundColor: "rgb(255, 142, 142)", color: "rgb(96, 96, 96)"}}>
            <h2 >{project.boardName}</h2>
        </div>
    );
};

export default Header;