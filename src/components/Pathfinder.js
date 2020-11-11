import React, { useState, useEffect } from "react"
import "../styles/Pathfinder.css"
import Node from "./Node"
import Astar from "../Algorithms/Astar"


let cols = 50;
let rows = 25;
var grid = new Array(cols);

var startRow = 0;
var startCol = 0;
var endRow = rows - 1;
var endCol = cols - 1;


//constructing the Spot
function Spot(i, j) {
    this.x = i //row
    this.y = j //column
    this.f = 0;
    this.g = 0;
    this.h = 0;

    this.isStart = this.x === startRow && this.y === startCol
    this.isEnd = this.x === endRow && this.y === endCol

}

const Pathfinder = () => {

    const [Grid, setGrid] = useState([]);

    // this gets called at the beginning to construct the grid
    useEffect(() => {

        initializeGrid(grid)

    }, [])

    const initializeGrid = () => 
    {
        //Making a 2D array of cols with rows things in it
        for(let i = 0; i < cols; i++)
        {
            grid[i] = new Array(rows)
        }

        //another loop for every colum and rows and creates the Spot(i, j)
        for(let i = 0; i < rows; i++)
        {
            for(let j = 0; j < cols; j++)
            {
                grid[i][j] = new Spot(i, j);
            }
        }

        setGrid(grid) //refer to useState above basically Grid = grid
    }
    


    // Construct the grid 
    const constructGrid = (
        <div>
            {Grid.map((row, rowIndex) => {
                return (
                    <div key={rowIndex} className="row">
                        {row.map((col, colIndex) => {
                            const { isStart, isEnd } = col; //destructoring props on Node created col is an element
                            return(
                                <Node 
                                    key={colIndex} 
                                    isStart={isStart} 
                                    isEnd={isEnd} 
                                    row={rowIndex} 
                                    col={colIndex}
                                />
                            )
                        })}
                    </div>
                )
            })}
        </div>
    )

    return(
        <div className="wrapper">
            <h1>Pathfinder</h1>
            {constructGrid}
        </div>
    )

}

export { Pathfinder as default }