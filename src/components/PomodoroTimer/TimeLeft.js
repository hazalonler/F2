import React from "react";
import moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";
import { useState } from "react";
import { useEffect } from "react";

momentDurationFormatSetup(moment);

const TimeLeft = ({sessionLength, breakLength}) => {

    const [currentSessionType, setCurrentSessionType] = useState("Session");
    const [intervalId, setIntervalId] = useState(null);
    const [timeLeft, setTimeLeft] = useState(sessionLength);

    // change timeLeft whenever sessionLength changes

    useEffect (() => {
        setTimeLeft(sessionLength);
    }, [sessionLength]);

    const isStarted = intervalId !== null; 
    const handleStartStopClick = () => {
        if (isStarted) {
        // if we are in started mode:
        // we want to stop the timer
        // clearInterval
            clearInterval(intervalId);
            setIntervalId(null);
        } else {
        // if we are in stopped mode:
        // decrement timeleft by one every second (1000 ms)
        // to do this we'll use setInterval
            const newIntervalId = setInterval(() => {
                setTimeLeft(prevTimeLeft => {
                    const newTimeLeft = prevTimeLeft - 1;
                    if (newTimeLeft >= 0) {
                        return prevTimeLeft - 1 ;
                    } else {
                        return prevTimeLeft;
                    }
                });
            }, 100);
            setIntervalId(newIntervalId);
        }
    };

    const formattedTimeLeft = moment.duration(timeLeft, 's').format('mm:ss', { trim: false });
    return (
        <div className="d-flex flex-column align-items-center pr-5">
            {formattedTimeLeft}
            <button onClick={handleStartStopClick}>{isStarted? "Stop" : "Start"}</button>
        </div>
    );
};

export default TimeLeft;