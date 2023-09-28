import React from "react";
import moment from "moment";
import TimeContext from "../../store/time-ctx";
import { useContext } from "react";

const Break = ({decrementBreakLengthByOneMinute, incrementBreakLengthByOneMinute}) => {

    const timeCtx = useContext(TimeContext);
    const breakLengthInMinutes = moment.duration(timeCtx.breakLength, 's').minutes()

    return (
        <div className="d-flex flex-column align-items-center mr-1">
            <p className="mb-1">Break</p>
            <p className="mb-1">{breakLengthInMinutes}</p>
            <div>
                <button className="btn btn-outline-info btn-sm" onClick={decrementBreakLengthByOneMinute}>-</button>
                <button className="btn btn-outline-info btn-sm" onClick={incrementBreakLengthByOneMinute}>+</button>
            </div>
            
        </div>
    );
};

export default Break;