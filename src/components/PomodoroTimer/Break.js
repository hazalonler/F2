import React from "react";
import moment from "moment";

const Break = (props) => {

    const breakLengthInMinutes = moment.duration(props.breakLength, 's').minutes()

    return (
        <div className="d-flex flex-column align-items-center pr-5">
            <p className="mb-2" id="break-label">Break</p>
            <p className="mb-2" id="break-length">{breakLengthInMinutes}</p>
            <div>
                <button className="btn btn-outline-info btn-sm" id="break-decrement" onClick={props.decrementBreakLengthByOneMinute}>-</button>
                <button className="btn btn-outline-info btn-sm" id="break-increment" onClick={props.incrementBreakLengthByOneMinute}>+</button>
            </div>
            
        </div>
    );
};

export default Break;