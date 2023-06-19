import BoardClient from "../../store/BoardClient";

const Header = () => {

    const project = BoardClient.getBoardConfig();

    return (
        <div className="container-fluid bg-primary text-white p-3">
            <h2 >{project.boardName}</h2>
        </div>
    );
};

export default Header;