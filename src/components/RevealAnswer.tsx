import React, { useState } from "react";
import { Button } from "react-bootstrap";

export function RevealAnswer(): React.JSX.Element {
    const [vis, setVis] = useState<boolean>(false);

    function revealAns(): void {
        setVis(!vis);
    }

    return (
        <span>
            <Button onClick={revealAns}>Reveal Answer</Button>
            {vis && <div>42</div>}
        </span>
    );
}
