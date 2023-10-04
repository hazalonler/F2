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
            <h3>{formattedTimeLeft}</h3>
            <div>
                <button className="btn btn-info btn-sm mr-2" onClick={handleStartStopClick}>{startStopButtonLabel}</button>
                <button className="btn btn-info btn-sm" onClick={handleResetButtonClick}>Reset</button>
            </div>
        </div>
    );
};

export default TimeLeft;