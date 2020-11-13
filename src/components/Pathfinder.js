import React, { useState, useEffect } from "react"
import "../styles/Pathfinder.css"
import Node from "./Node"
import Astar from "../Algorithms/astar"


let cols = 30;
let rows = 20;
var grid = new Array(rows);

var startRow = 0;
var startCol = 0;
var endRow = rows - 1;
var endCol = cols - 1;


const Pathfinder = () => {

    const [Grid, setGrid] = useState([]);
    const [Path, setPath] = useState([])
    const [VisitedNodes, setVisitedNodes] = useState([]) 

    // this gets called at the beginning to construct the grid
    useEffect(() => {

        initializeGrid(grid)

    }, [])

    const initializeGrid = () => 
    {
        //Making a 2D array of cols with rows things in it
        for(let i = 0; i < rows; i++)
        {
            grid[i] = new Array(cols)
        }
        
        createSpot(grid)

        setGrid(grid) //refer to useState above basically Grid = grid

        addNeighbours(grid)

        const startNode = grid[startRow][startCol]
        const endNode = grid[endRow][endCol]
        startNode.isWall = false;
        endNode.isWall = false;

        let path = Astar(startNode, endNode) //setting the path (object with path, visitedNodes and error) as the array return from the Astar
        setPath(path.path) //setting our Path as the return of Astra with useState, path is now an object
        setVisitedNodes(path.visitedNodes)
    }

    //another loop for every colum and rows and creates the Spot(i, j)
    const createSpot = (grid) => {
        for(let i = 0; i < rows; i++)
        {
            for(let j = 0; j < cols; j++)
            {
                grid[i][j] = new Spot(i, j);
            }
        }
    }

    //constructing the Spot
    function Spot(i, j) {
        this.x = i //row
        this.y = j //column
        this.f = 0;
        this.g = 0;
        this.h = 0;

        this.isStart = this.x === startRow && this.y === startCol
        this.isEnd = this.x === endRow && this.y === endCol

        //neighbours to each spot (should have up to 4)
        this.neighbours = [];
        this.previous = undefined;

        //creating walls in the path
        this.isWall=false;
        if(Math.random(1) < 0.2)
        {
            this.isWall = true;
        }

        this.addneighbours = function(grid)
        {   // i is the row spot
            let i = this.x //row
            let j = this.y //column
            //this adds all the neighbour spots into this.neighbour array above
            if(i > 0) this.neighbours.push(grid[i - 1][j]);
            if(i < (rows - 1)) this.neighbours.push(grid[i + 1][j]);
            if(j > 0) this.neighbours.push(grid[i][j - 1])
            if(j < (cols - 1)) this.neighbours.push(grid[i][j + 1]);
        }
    }

    // this add the neighbour spots to each grid spot
    const addNeighbours = (grid) => {
        for(let i = 0; i < rows; i++)
        {
            for(let j = 0; j < cols; j++)
            {
                grid[i][j].addneighbours(grid)
            }
        }
    }
    


    // Construct the grid 
    const constructGrid = (
        <div>
            {Grid.map((row, rowIndex) => {
                return (
                    <div key={rowIndex} className="row">
                        {row.map((col, colIndex) => {
                            const { isStart, isEnd, isWall } = col; //destructoring props on Node created col is an element
                            return(
                                <Node 
                                    key={colIndex} 
                                    isStart={isStart} 
                                    isEnd={isEnd} 
                                    row={rowIndex} 
                                    col={colIndex}
                                    isWall={isWall}
                                />
                            )
                        })}
                    </div>
                )
            })}
        </div>
    )

    //Construct Legend
    const legend = (
        <div className="legend">
            <h3>Legend</h3>
            <div className="float-container">
                <div style={{background: "seagreen"}} className="float legend-node"></div>
                <div className="float">Start Point</div>
            </div>
            <div className="float-container">
                <div style={{background: "rgb(12, 53, 71)"}} className="float legend-node"></div>
                <div className="float">Wall</div>
            </div>
            <div className="float-container">
                <div style={{background: "darkred"}} className="float legend-node"></div>
                <div className="float">End Point</div>
            </div>
        </div>
    )

    //ANIMATE THE PATH
    const visializeShortestPath = (shortestPathNodes) => {
        for(let i = 0; i < shortestPathNodes.length; i++)
        {
            setTimeout(() => {
                const node = shortestPathNodes[i];
                document.getElementById(`node-${node.x}-${node.y}`).className = "node node-shortest-path"
            }, 10 * i)
        }
    }

    const vizualizePath = () => {
            for(let i = 0; i <= VisitedNodes.length; i++)
            {
                if(i === VisitedNodes.length)
                {
                    setTimeout(() => {
                        visializeShortestPath(Path);
                    }, 20 * i)
                }else
                {   setTimeout(() => {
                        const node = VisitedNodes[i];
                        document.getElementById(`node-${node.x}-${node.y}`).className = "node node-visited"
                    }, 20 * i)
                }
            }      
    }

    //RESET GRID

    const resetGrid = () => {
        window.location.reload()
    }    

    return(
        <>
        {legend}
        <div className="wrapper">
            <h1>Pathfinder</h1>
            <button className="button" onClick={resetGrid}>Reset</button>
            <button className="button-algo button" onClick={vizualizePath}>Astar</button>
            <div className="gridWrapper">
                {constructGrid}
            </div>
        </div>
        </>
    )

}

export { Pathfinder as default }