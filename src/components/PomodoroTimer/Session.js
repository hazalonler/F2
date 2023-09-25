import React from "react";
import moment from "moment";

const Session = (props) => {

    const sessionLengthInMinutes = moment.duration(props.sessionLength, 's').minutes()

    return (
        <div className="d-flex flex-column align-items-center">
            <p id="session-label">Session</p>
            <p id="session-length">{sessionLengthInMinutes}</p>
            <div>
                <button id="session-decrement" onClick={props.decrementSessionLengthByOneMinute}>-</button>
                <button id="session-increment" onClick={props.incrementSessionLengthByOneMinute}>+</button>
            </div>
            
        </div>
    );
};

export default Session;