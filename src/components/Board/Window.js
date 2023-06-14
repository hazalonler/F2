import Modal from "react-modal";
import { useState } from "react";
import BoardClient from "../../store/BoardClient";


Modal.setAppElement("#root");

const Window = ({show, onClose, task}) => {

    const board = BoardClient.getBoardConfig().listConfig;
    let taskList = board.find(list => list.id === task.listId); 
    
    const [input, setInput] = useState(task.description);
    const [oldInput, setOldInput] = useState("");
    const [typing, setTyping] = useState(false);

    const inputChangeHandler = (event) => {
        setInput(event.target.value);
    };

    const submitHandler = (event) => {
        event.preventDefault();

        const taskData = {
            ...task,
            description: input
        }

        BoardClient.updateTaskDescription(taskData);
        setOldInput(input);
        setTyping(false);
    };

    const cancelHandler = (event) => {
        setInput(oldInput);
        setTyping(false);
    };

    const clickHandler = () => {
        setTyping(true);
    };
    
    const rowsNum = typing ? 8 : 3;

    let description = "";

    if (input.length === 0) {
        description = "Add a more detailed description... ";
    } else {
        description = input;
    }

    return (
        <Modal
            isOpen={show}
            onRequestClose={onClose}
        >
            <div >
                <div className="modal-content mb-4" style={{borderColor: "white"}}>
                    <div className="modal-header" style={{borderColor: "white"}}>
                        <h2 className="modal-title" style={{flex: "1 90%"}}>Name of Task: {task.name}</h2>
                        <button type="button" className="btn-close btn-warning rounded" onClick={onClose}>X</button>
                    </div>
                    <p className="text-start ml-3" style={{fontSize: "14px"}}>in list {taskList.name}</p>
                </div>
                <div className="model-dialog-scrollable">
                    <div className="modal-header">
                        <h4 className="modal-title">Description </h4>
                    </div>
                    <div>
                    {!typing && <div 
                                    className="d-flex flex-column mt-2 ml-3 mb-2"
                                    type="button"
                                    onClick={clickHandler}
                                >
                                    {description}
                                </div>   
                    }
                    {typing && <div>
                                    <textarea
                                        className="form-control"
                                        type="textarea"
                                        rows={`${rowsNum}`} 
                                        value={input} 
                                        onChange={inputChangeHandler} 
                                    ></textarea>
                                    <button type="button" className="btn-close btn-warning mt-2 rounded mr-2 ml-3" onClick={submitHandler}>Save</button>
                                    <button type="button" className="btn-close btn-secondary mt-2 rounded" onClick={cancelHandler}>Cancel</button>
                                </div>
                    }
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default Window;