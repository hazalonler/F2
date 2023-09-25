import React from "react";
import moment from "moment";

const Break = (props) => {

    const breakLengthInMinutes = moment.duration(props.breakLength, 's').minutes()

    return (
        <div className="d-flex flex-column align-items-center pr-5">
            <p id="break-label">Break</p>
            <p id="break-length">{breakLengthInMinutes}</p>
            <div>
                <button id="break-decrement" onClick={props.decrementBreakLengthByOneMinute}>-</button>
                <button id="break-increment" onClick={props.incrementBreakLengthByOneMinute}>+</button>
            </div>
            
        </div>
    );
};

export default Break;