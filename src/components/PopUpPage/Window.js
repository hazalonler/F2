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
import "../PopUpPage/CSS-Folder/Window.css"


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
            className="window"
            style={{overlay: {backgroundColor:"#000000a3"}}}
        >
            <div className="content">
                <div className="header" >
                    <IoCardOutline className="card" />
                    <h5 className="task-name">{ctx.name}</h5>
                    <RxCross1 className="cross-button" type="button" onClick={onClose} ></RxCross1>
                </div>
            </div>
            <div className="scrollable" >
                <div className="explaination">
                    <Description></Description>
                    <Activity></Activity>
                </div>
                <div className="other-feature">
                    <h6 className="pomodoro-title">Pomodoro</h6>
                    <div className="pomodoro-item"> 
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
        </Modal>
    );
};

export default Window;