import React from "react";
import Modal from "react-modal";
import { useEffect } from "react";
import { useState } from "react";
import ClosePomodoro from "./ClosePomodoro";

const BasicTimer = ( {show, onClose} ) => {
    Modal.setAppElement("#root");

    const [minutes, setMinutes] = useState(1);
    const [seconds, setSeconds] = useState(0);
    const [displayMessage, setDisplayMessage] = useState(true);

    useEffect(() => {
        let interval = setInterval(() => {
            clearInterval(interval);

            if (seconds === 0) {
                if (minutes !== 0) {
                    setSeconds(59)
                    setMinutes(minutes-1);
                } else {
                    let minutes = displayMessage ? 24 : 4;
                    let seconds = 59;

                    setSeconds(seconds);
                    setMinutes(minutes);
                    setDisplayMessage(!displayMessage);
                }
            } else {
                setSeconds(seconds-1)
            }

        }, 1000);
    }, [seconds]);

    const timerMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const timerSeconds = seconds < 10 ? `0${seconds}` : seconds;

    return (
        <Modal
            isOpen={show}
            onRequestClose={onClose}
            style={{content: {borderRadius: "15px", backgroundColor: "rgb(255, 204, 204)", width: "600px"}}}   
        >
            <div>
                <div className='d-flex justify-content-end pb-3'>
                            <ClosePomodoro
                                className="mt-2"
                                style={{ backgroundColor: "transparent", color: "rgba(255, 255, 255, 0.8", border:0, width: "40px"}} 
                                onClick={onClose}
                                onMouseOver={({target}) => target.style.backgroundColor="rgb(255, 186, 186)"} 
                                onMouseOut={({target}) => target.style.backgroundColor="rgb(255, 204, 204)"} 
                            />
                </div>
                <div className='d-flex align-items-center flex-column'>    
                    <div>
                        <div className="display-5 d-flex justify-content-center">
                            {displayMessage ? <p>Break Time! New Session starts in:</p> : <p>Pomodoro Timer:</p>}
                        </div>
                        <div className='display-3 d-flex justify-content-center'>{timerMinutes}:{timerSeconds}</div>
                    </div>
                </div>
            </div>
        </Modal>
    );

    
};

export default BasicTimer;