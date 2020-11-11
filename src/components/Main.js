import React from "react";

const Main = () => {

const grid = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 1, 1],
    [0, 1, 1, 0, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0],
]

const cells = [
    [], [], [], [], [], [], [], [], []
]

let start
let startKey = ""
let startPos = { row: -1, col: -1}

const resetGrid = () => {
    start.setOptions({ fill: "#ff0000"})
    for (let i = 0; i < grid.length; i++) 
    {
        const row = grid[i]
        for (let j = 0; j < row.length; i++)
        {
            if(row[j] > 0) 
            {
                continue
            }

            cells[i][j].setOptions({ fill: "white" })
        }
    }
}

    return( 
        <div></div>
        )
}