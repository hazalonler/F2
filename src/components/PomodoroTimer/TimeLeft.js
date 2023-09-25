import React from "react";
import moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";
import { useState } from "react";

momentDurationFormatSetup(moment);

const TimeLeft = ({sessionLength}) => {

    const [timeLeft, setTimeLeft] = useState(sessionLength);

    const formattedTimeLeft = moment.duration(timeLeft, 's').format('mm:ss');
    return (
        <div className="d-flex align-items-center pr-5">
            {formattedTimeLeft}
        </div>
    );
};

export default TimeLeft;