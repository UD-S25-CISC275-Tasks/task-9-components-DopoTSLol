import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { QuestionType } from "../interfaces/question";

export function ChangeType(): React.JSX.Element {
    const [state, changeState] = useState<QuestionType>(
        "short_answer_question"
    );

    function changeQuesType(): void {
        if (state === "short_answer_question") {
            changeState("multiple_choice_question");
        } else {
            changeState("short_answer_question");
        }
    }

    return (
        <span>
            <Button onClick={changeQuesType}>Change Type</Button>

            {state === "multiple_choice_question" ? (
                <div>Multiple Choice</div>
            ) : (
                <div>Short Answer</div>
            )}
        </span>
    );
}
