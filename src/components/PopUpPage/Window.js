import Modal from "react-modal";
import { useState, useContext, useEffect } from "react";
import { RxCross1 } from "react-icons/rx";
import { IoCardOutline } from "react-icons/io5";
import TaskContext from "../../store/task-ctx";
import Break from "../PomodoroTimer/Break";
import Session from "../PomodoroTimer/Session";
import TimeLeft from "../PomodoroTimer/TimeLeft";
import TimeContext from "../../store/time-ctx";
import Description from "./Description";
import Activity from "./Activity";


const Window = ({show, onClose}) => {

    const ctx = useContext(TaskContext);

    const [breakLength, setBreakLength] = useState(300);
    const [sessionLength, setSessionLength] = useState(60 * 25);

    const [currentSessionType, setCurrentSessionType] = useState("Session"); // Session or Break
    const [intervalId, setIntervalId] = useState(null);
    const [timeLeft, setTimeLeft] = useState(sessionLength);

    // change timeLeft whenever sessionLength changes

    useEffect (() => {
        setTimeLeft(sessionLength);
    }, [sessionLength]);

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
        >
            <div >
                <div className="modal-content" style={{backgroundColor: "rgb(242,103,103)", borderColor: "rgb(242,103,103)"}}>
                    <div className="modal-header p-0 align-top" style={{borderColor: "rgb(255, 204, 204)"}}>
                        <IoCardOutline className="mr-2 mt-2" size="16px"/>
                        <h5 className="d-flex flex-row mt-1" style={{flex: "1"}}>{ctx.name}</h5>
                        <button className="btn btn-outline-danger pb-0" type="button" onClick={onClose}><RxCross1></RxCross1></button>
                    </div>
                </div>
                <div className="model-dialog-scrollable" style={{marginTop: "100px"}}>
                    <div className="d-flex flex-row" style={{width: "550px"}}>
                        <div className="d-flex flex-column mr-auto" style={{flexBasis: "60%"}}>
                            <Description></Description>
                            <Activity></Activity>
                        </div>
                        <div className="d-flex flex-column justify-content-start mr-4 mt-2">
                            <div className="d-flex flex-row justify-content-center">
                                <h6>Pomodoro</h6>
                            </div>
                            <div className="d-flex flex-row">
                                <div className="d-flex flex-column"> 
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
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default Window;