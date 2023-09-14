import { CircularProgressbar,buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Modal from "react-modal";
import PlayButton from './PlayButton';
import PauseButton from './PauseButton';
import { RxCross1 } from 'react-icons/rx';
import ClosePomodoro from './ClosePomodoro';
import { useState } from 'react';
import { useEffect } from 'react';


const Timer = ( {show, onClose}) => {

    Modal.setAppElement("#root");

    const red = "#f54e4e";
    const green = "#4aec8c";

    const [isPaused, setIsPaused] = useState(true);
    const [minutes, setMinutes] =  useState(25);
    const [seconds, setSeconds] = useState(0);
    const [displayMessage, setDisplayMessage] = useState(false);

    useEffect( () => {

    }, [seconds])


    return (
        <Modal
            isOpen={show}
            onRequestClose={onClose}
            style={{content: {borderRadius: "15px", backgroundColor: "rgb(255, 204, 204)", width: "600px"}}}
        >
            <div className='d-flex flex-column'>
                <ClosePomodoro
                    className="d-flex justify-content-end mt-2"
                    style={{ backgroundColor: "transparent", color: "rgba(255, 255, 255, 0.8", border:0, width: "40px"}} 
                    onClick={onClose}
                />
                <div className='d-flex justify-content-center' style={{width: 300, height: 300}}>
                    <CircularProgressbar value={25} text={`25`} styles={buildStyles({ 
                        textColor: "#fff",
                        pathColor: red,
                        trailColor: "rgba(255,255,255,2)"
                    })}/>
                </div>
                <div className='d-flex justify-content-center'>
                    {isPaused ?                    
                        <PlayButton
                            className="mt-4"
                            size="38px"
                            style={{ backgroundColor: "transparent", color: "rgba(255, 255, 255, 0.8", border:0, display: "inline-block", width: "90px"}} 
                            onMouseOver={({target}) => target.style.backgroundColor="rgb(255, 186, 186)"} 
                            onMouseOut={({target}) => target.style.backgroundColor="rgb(255, 204, 204)"} 
                        /> : 
                        <PauseButton 
                            className="mt-4"
                            size="38px" 
                            style={{ backgroundColor: "transparent", color: "rgba(255, 255, 255, 0.8", border:0, display: "inline-block", width: "90px"}} 
                        /> 
                    }
                </div>
            </div>
        </Modal>
    );
}

export default Timer;
