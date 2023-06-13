import Modal from "react-modal";
import { useState } from "react";
import BoardClient from "../../store/BoardClient";


Modal.setAppElement("#root");

const Window = ({show, onClose, task}) => {

    const board = BoardClient.getBoardConfig().listConfig;

    const [input, setDescription] = useState(task.description);
    const [typing, setTyping] = useState(false);

    const inputChangeHandler = (event) => {
        setTyping(true);
        setDescription(event.target.value);
    };

    const submitHandler = (event) => {
        event.preventDefault();

        const taskData = {
            ...task,
            description: input
        }

        console.log(taskData);

        BoardClient.updateTaskDescription(taskData);
        setDescription("");
        setTyping(false);
    };

    const cancelHandler = (event) => {
        setDescription("");
        setTyping(false);
    };

    let taskList = board.find(list => list.id === task.listId); 

    const rowsNum = typing ? 8 : 3;

    return (
        <Modal
            isOpen={show}
            onRequestClose={onClose}
        >
            <div >
                <div className="modal-content mb-4">
                    <div className="modal-header">
                        <h2 className="modal-title" style={{flex: "1 90%"}}>Name of Task: {task.name}</h2>
                        <button type="button" className="btn-close btn-warning rounded" onClick={onClose}>X</button>
                    </div>
                    <div className="modal-header">
                        <p className="fs-1">in list {taskList.name}</p>
                    </div>
                </div>
                <div className="model-dialog-scrollable">
                    <div className="modal-header">
                        <h4 className="modal-title">Description </h4>
                    </div>
                    <textarea
                        className="form-control"
                        type="textarea"
                        rows={`${rowsNum}`}
                        placeholder="Add a more detailed description... "
                        value={input} 
                        onChange={inputChangeHandler} 
                    ></textarea>
                    <button type="button" className="btn-close btn-warning mt-2 rounded mr-2" onClick={submitHandler}>Save</button>
                    <button type="button" className="btn-close btn-secondary mt-2 rounded" onClick={cancelHandler}>Cancel</button>
                </div>
            </div>
        </Modal>
    );
};

export default Window;