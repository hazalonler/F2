import Modal from "react-modal";


Modal.setAppElement("#root");

const Window = ({show, onClose, item}) => {
    return (
        <Modal
            isOpen={show}
            onRequestClose={onClose}
            className="container"  
        >
            <div className="container">
                <h1 style={{flex: "1 90%"}}>Name of Task: {item.name}</h1>
                <button className="btn-warning mb-3" onClick={onClose}>X</button>
            </div>
        </Modal>
    );
};

export default Window;