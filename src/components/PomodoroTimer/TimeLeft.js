import React from "react";
import moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";

momentDurationFormatSetup(moment);

const TimeLeft = ({
    handleStartStopClick,
    handleResetButtonClick, 
    startStopButtonLabel, 
    timeLeft
}) => {
    const formattedTimeLeft = moment.duration(timeLeft, 's').format('mm:ss', { trim: false });
    return (
        <div className="d-flex flex-column align-items-center mb-1">
            <h1>{formattedTimeLeft}</h1>
            <div>
                <button className="btn btn-info mr-2" onClick={handleStartStopClick}>{startStopButtonLabel}</button>
                <button className="btn btn-info" onClick={handleResetButtonClick}>Reset</button>
            </div>
        </div>
    );
};

export default TimeLeft;