import React, { useState } from "react";
import { Button } from "react-bootstrap";

/**
 * Here is a helper function you *must* use to "roll" your die.
 * The function uses the builtin `random` function of the `Math`
 * module (which returns a random decimal between 0 up until 1) in order
 * to produce a random integer between 1 and 6 (inclusive).
 */
export function d6(): number {
    return 1 + Math.floor(Math.random() * 6);
}

export function TwoDice(): React.JSX.Element {
    const [die1, changeDie1] = useState<number>(1);
    const [die2, changeDie2] = useState<number>(2);

    return (
        <div>
            <span data-testid="left-die">
                <div>Left Die: {die1}</div>
            </span>

            <span data-testid="right-die">
                <div>Right Die: {die2}</div>
            </span>

            <Button
                onClick={() => {
                    changeDie1(d6());
                }}
            >
                Roll Left
            </Button>

            <Button
                onClick={() => {
                    changeDie2(d6());
                }}
            >
                Roll Right
            </Button>

            {die1 === die2 && die1 === 1 ? (
                <div>Lose</div>
            ) : die1 === die2 && die1 !== 1 ? (
                <div>Win</div>
            ) : (
                <div></div>
            )}
        </div>
    );
}
