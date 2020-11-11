import React from "react";
import "../styles/Node.css";

const Node = ({ isStart, isEnd, row, col }) => {
    const classes = isStart ? "node-start" : isEnd ? "node-end" : "";
    
    return(
        <div className={`node ${classes}`} id={`node-${row}-${col}`}>

        </div>
    )
}

export { Node as default }