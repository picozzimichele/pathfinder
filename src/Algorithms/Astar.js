function heruistic(a, b) 
{
    let d = Math.abs(a.x - a.y) + Math.abs(b.x - b.y) //calculating the distance using the Manhattan method also called taxi driver
    return d
}


function Astar(startNode, endNode) 
{
    var openSet = []; //this contains all the Nodes/Spot we still have to visit
    var closedSet = []; //this contains the Nodes that we have already visited
    let path = []; //this will contain the shortest path to our end node

    openSet.push(startNode) //our starting point we push this immediately

    while(openSet.length > 0) //this loops while our openSet still has nodes to check
    {
        let leastIndex = 0; //this is the index with the lowest f score
        for(let i = 0; i < openSet.length; i++)
        {
            if(openSet[i].f < openSet[leastIndex].f) //this compares the two f(distances) scores of the nodes
            {
                leastIndex = i; //i f score is better so new leastIndex is replaced by this new node getting us the node with the lowest f value
            }
        }

        let current = openSet[leastIndex]; //this is the current lowest f node that we found

        if(current === endNode) // we have found the endNode and path
        {
            console.log("Path Found!")
        }

        openSet = openSet.filter(elt => elt !== current) //this removes the current from the openSet (we have one less node to check) there is no remove function unfortunately
        closedSet.push(current) //adding then the current to the closedSet which was removed from openSet

        console.log(current) //DEBUGGING

        let neighbours = current.neighbours; //we need to check all the 4 neighbours nodes of the current node
        console.log(neighbours) //DEBUGGING
        for(let i = 0; i < neighbours.length; i++)
        {
            let neighbour = neighbours[i]; //exctracting each of the 4 neighbour from the different array index
            console.log(neighbour) //RETURNS UNDEFINED
            if(!closedSet.includes(neighbour)) //if closedSet does not include the neighbour
            {

                let tempG = current.g + 1 //temporary G value
                let newPath = false;

                if(openSet.includes(neighbour))//if openSet includes that neighbour
                {
                    if(tempG < neighbour.g) //if the tempG (current.g +1) is lower than the neighbour g value
                    {
                        neighbour.g = tempG; //set the neighbour.g to current.g +1
                        newPath = true;
                    }
                }else 
                {
                    neighbour.g = tempG; //set the neighbour.g to current.g +1
                    newPath = true;
                    openSet.push(neighbour); //add this neighbour to the openSet again since in this case is not part of it
                }

                if(newPath) //if newPath is true, meaning we have found a newPath
                {
                    neighbour.h = heruistic(neighbour, endNode) //basically calculating the assumed distance from where we are to the end
                    neighbour.f = neighbour.h + neighbour.g //recalculating the toal distance the f value
                    neighbour.previous = current; //previous is a value in the Spot that starts as undefined check pathfinder.js
                }
            }
        }
    }
}


export default Astar;