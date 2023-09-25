import React from "react";
import moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";
import { useState } from "react";
import { useEffect } from "react";

momentDurationFormatSetup(moment);

const TimeLeft = ({sessionLength}) => {

    const [timeLeft, setTimeLeft] = useState(sessionLength);

    // change timeLeft whenever sessionLength changes

    useEffect (() => {
        setTimeLeft(sessionLength);
    }, [sessionLength])

    const handleStartStopClick = () => {
        // decrement timeleft by one every second (1000 ms)
        // to do this we'll use setInterval

        setInterval(() => {
            setTimeLeft(prevTimeLeft => {
                const newTimeLeft = prevTimeLeft - 1;
                if (newTimeLeft >= 0) {
                    return prevTimeLeft - 1 ;
                } else {
                    return prevTimeLeft;
                }
            });
        }, 100)

    };

    const formattedTimeLeft = moment.duration(timeLeft, 's').format('mm:ss', { trim: false });
    return (
        <div className="d-flex flex-column align-items-center pr-5">
            {formattedTimeLeft}
            <button onClick={handleStartStopClick}>Start</button>
        </div>
    );
};

export default TimeLeft;