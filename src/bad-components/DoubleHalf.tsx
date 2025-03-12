import React, { useState } from "react";
import { Button } from "react-bootstrap";

interface doubleProps {
    setValue: (num: number) => void;
    value: number;
}

function Doubler({ setValue, value }: doubleProps): React.JSX.Element {
    return (
        <Button
            onClick={() => {
                setValue(value * 2);
            }}
        >
            Double
        </Button>
    );
}

function Halver({ setValue, value }: doubleProps): React.JSX.Element {
    return (
        <Button
            onClick={() => {
                setValue(value * 0.5);
            }}
        >
            Halve
        </Button>
    );
}

export function DoubleHalf(): React.JSX.Element {
    const [value, setValue] = useState<number>(10);
    return (
        <div>
            <h3>Double Half</h3>
            <div>
                The current value is: <span>{value}</span>
            </div>
            <Doubler setValue={setValue} value={value}></Doubler>
            <Halver setValue={setValue} value={value}></Halver>
        </div>
    );
}
