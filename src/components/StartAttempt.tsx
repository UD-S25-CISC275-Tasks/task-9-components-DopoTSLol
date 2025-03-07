import React, { useState } from "react";
import { Button } from "react-bootstrap";

export function StartAttempt(): React.JSX.Element {
    const [attempts, changeAttempts] = useState<number>(4);
    const [progress, changeProgress] = useState<boolean>(false);

    return (
        <span>
            <div>Current Attempts: {attempts}</div>
            <Button
                onClick={() => {
                    changeProgress(true);
                    changeAttempts(attempts - 1);
                }}
                disabled={attempts <= 0 || progress}
            >
                Start Quiz
            </Button>

            <Button
                onClick={() => {
                    changeProgress(false);
                }}
                disabled={!progress}
            >
                Stop Quiz
            </Button>

            <Button
                onClick={() => {
                    changeAttempts(attempts + 1);
                }}
                disabled={progress}
            >
                Mulligan
            </Button>
        </span>
    );
}
