import React from "react";
import moment from "moment";

const Session = (props) => {

    const sessionLengthInMinutes = moment.duration(props.sessionLength, 's').minutes()

    return (
        <div className="d-flex flex-column align-items-center">
            <p className="mb-2" id="session-label">Session</p>
            <p className="mb-2" id="session-length">{sessionLengthInMinutes}</p>
            <div>
                <button className="btn btn-outline-info btn-sm" id="session-decrement" onClick={props.decrementSessionLengthByOneMinute}>-</button>
                <button className="btn btn-outline-info btn-sm" id="session-increment" onClick={props.incrementSessionLengthByOneMinute}>+</button>
            </div>
            
        </div>
    );
};

export default Session;