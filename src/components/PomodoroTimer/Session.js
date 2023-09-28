import React from "react";
import moment from "moment";
import TimeContext from "../../store/time-ctx";
import { useContext } from "react";

const Session = ({decrementSessionLengthByOneMinute, incrementSessionLengthByOneMinute}) => {

    const timeCtx = useContext(TimeContext);
    const sessionLengthInMinutes = moment.duration(timeCtx.sessionLength, 's').minutes()

    return (
        <div className="d-flex flex-column align-items-center">
            <p className="mb-1">Session</p>
            <p className="mb-1">{sessionLengthInMinutes}</p>
            <div>
                <button className="btn btn-outline-info btn-sm" onClick={decrementSessionLengthByOneMinute}>-</button>
                <button className="btn btn-outline-info btn-sm" onClick={incrementSessionLengthByOneMinute}>+</button>
            </div>
            
        </div>
    );
};

export default Session;