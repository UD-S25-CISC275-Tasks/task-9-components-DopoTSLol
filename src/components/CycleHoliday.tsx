import React, { useState } from "react";
import { Button } from "react-bootstrap";

export function CycleHoliday(): React.JSX.Element {
    type Holiday =
        | "🥳" //New Years
        | "♥️" //Valentines Day
        | "🤡" //April Fools
        | "🦅" //July 4th
        | "🎃"; //Halloween

    const DATE_TRANSITIONS: Record<Holiday, Holiday> = {
        "🥳": "♥️",
        "♥️": "🤡",
        "🤡": "🦅",
        "🦅": "🎃",
        "🎃": "🥳",
    };

    const ALPHA_TRANSITIONS: Record<Holiday, Holiday> = {
        "🤡": "🎃",
        "🎃": "🦅",
        "🦅": "🥳",
        "🥳": "♥️",
        "♥️": "🤡",
    };

    const [day, setDay] = useState<Holiday>("🥳");

    function changeDayAlpha(): void {
        const tempVar = ALPHA_TRANSITIONS[day];
        setDay(tempVar);
    }

    function changeDayDate(): void {
        const tempVar = DATE_TRANSITIONS[day];
        setDay(tempVar);
    }

    return (
        <span>
            <div>Holiday: {day}</div>
            <Button onClick={changeDayAlpha}>Advance by Alphabet</Button>
            <Button onClick={changeDayDate}>Advance by Year</Button>
        </span>
    );
}
