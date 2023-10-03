import Modal from "react-modal";
import { useState, useContext, useEffect } from "react";
import BoardClient from "../../store/BoardClient";
import { RxCross1 } from "react-icons/rx";
import { IoCardOutline } from "react-icons/io5";
import { MdNotes } from "react-icons/md";
import TaskContext from "../../store/task-ctx";
import Break from "../PomodoroTimer/Break";
import Session from "../PomodoroTimer/Session";
import TimeLeft from "../PomodoroTimer/TimeLeft";
import TimeContext from "../../store/time-ctx";


const Window = ({show, onClose}) => {

    const ctx = useContext(TaskContext);
    
    const [input, setInput] = useState(ctx.description);
    const [oldInput, setOldInput] = useState("");
    const [typing, setTyping] = useState(false);

    const [breakLength, setBreakLength] = useState(300);
    const [sessionLength, setSessionLength] = useState(60 * 25);

    const [currentSessionType, setCurrentSessionType] = useState("Session"); // Session or Break
    const [intervalId, setIntervalId] = useState(null);
    const [timeLeft, setTimeLeft] = useState(sessionLength);

    // change timeLeft whenever sessionLength changes

    useEffect (() => {
        setTimeLeft(sessionLength);
    }, [sessionLength]);

    const inputChangeHandler = (event) => {
        setInput(event.target.value);
    };

    const submitHandler = (event) => {
        event.preventDefault();

        const taskData = {
            ...ctx,
            description: input
        }

        BoardClient.updateListData(taskData);
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

    const decrementBreakLengthByOneMinute = () => {
        const newBreakLength = breakLength - 60;
        
        if (newBreakLength < 0) {
            setBreakLength(0);
        } else {
            setBreakLength(newBreakLength);
        }
    };

    const incrementBreakLengthByOneMinute = () => {
        setBreakLength(breakLength + 60);
    };

    const decrementSessionLengthByOneMinute = () => {
        const newSessionLength = sessionLength - 60;
        
        if (newSessionLength < 0) {
            setSessionLength(0);
        } else {
            setSessionLength(newSessionLength);
        }
    };

    const incrementSessionLengthByOneMinute = () => {
        setSessionLength(sessionLength + 60);
    };


    const isStarted = intervalId !== null; 
    const handleStartStopClick = () => {
        if (isStarted) {
            clearInterval(intervalId);
            setIntervalId(null);
        } else {
            const newIntervalId = setInterval(() => {
                setTimeLeft(prevTimeLeft => {
                    const newTimeLeft = prevTimeLeft - 1;
                    if (newTimeLeft >= 0) {
                        return prevTimeLeft - 1 ;
                    }
                    if (currentSessionType === "Session") {
                        setCurrentSessionType("Break");
                        setTimeLeft(breakLength);
                    }
                    else if (currentSessionType === "Break") {
                        setCurrentSessionType("Session");
                        setTimeLeft(sessionLength);
                    }
                });
            }, 100);
            setIntervalId(newIntervalId);
        }
    };


    const handleResetButtonClick = () => {
        clearInterval(intervalId);
        setIntervalId(null);
        setCurrentSessionType("Break");
        setSessionLength(60*25);
        setBreakLength(60*5);
        setTimeLeft(60*25);
    };

    return (
        <Modal
            isOpen={show}
            onRequestClose={onClose}
            style={{content: {borderRadius: "15px", backgroundColor: "rgb(242, 103, 103)", width: "600px"}}}
        >
            <div >
                <div className="modal-content" style={{borderColor: "rgb(255, 204, 204)", backgroundColor: "rgb(255, 204, 204)"}}>
                    <div className="modal-header p-0 align-top" style={{borderColor: "rgb(255, 204, 204)"}}>
                        <IoCardOutline className="mr-2 mt-2" size="16px"/>
                        <h5 className="modal-title" style={{flex: "1 90%"}}>{ctx.name}</h5>
                        <RxCross1 
                            type="button" 
                            className="btn-close mt-2 rounded"
                            style={{width: "30px"}}
                            size="16px" 
                            onMouseOver={({target}) => target.style.backgroundColor="rgb(255, 186, 186)"} 
                            onMouseOut={({target}) => target.style.backgroundColor="rgb(255, 204, 204)"} 
                            onClick={onClose}
                        >
                        </RxCross1>
                    </div>
                </div>
                <div className="model-dialog-scrollable" style={{width: "350px", marginTop: "100px"}}>
                    <div className="modal-header p-0">
                        <MdNotes className="mr-2" size="16px"/>
                        <h6 style={{flex: "1 70%"}}>Description </h6>
                    </div>
                    <div>
                    {!typing && <div 
                                    className="d-flex flex-column mt-2 mb-2 pl-2 pt-2"
                                    style={{
                                        backgroundColor: "rgb(255, 186, 186)", 
                                        height: "100px", 
                                        borderRadius: "12px",
                                        marginRight: "2px"
                                    }}
                                    onMouseOver={({target}) => target.style.backgroundColor="rgb(255, 178, 178)"}
                                    onMouseOut={({target}) => target.style.backgroundColor="rgb(255, 186, 186)"}
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
                                        autoFocus
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
                <div className="d-flex flex-column justify-content-end" style={{marginTop: "280px"}}>
                    <TimeLeft
                        handleStartStopClick={handleStartStopClick}
                        handleResetButtonClick={handleResetButtonClick}
                        startStopButtonLabel={isStarted ? 'Stop' : 'Start'}
                        timeLeft={timeLeft}
                    ></TimeLeft>
                    <div className="d-flex flex-row justify-content-center">
                        <TimeContext.Provider
                            value={{
                                breakLength: breakLength,
                                sessionLength: sessionLength,
                            }}
                        >
                            <Break 
                                decrementBreakLengthByOneMinute={decrementBreakLengthByOneMinute}
                                incrementBreakLengthByOneMinute={incrementBreakLengthByOneMinute}
                            ></Break>
                            <Session
                                decrementSessionLengthByOneMinute={decrementSessionLengthByOneMinute}
                                incrementSessionLengthByOneMinute={incrementSessionLengthByOneMinute}
                            ></Session>
                        </TimeContext.Provider>
                        
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default Window;