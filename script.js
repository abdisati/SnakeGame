const board=document.getElementById("game-board");
const scoreEl=document.getElementById("score");
const startBtn=document.getElementById("start-btn");

const size = 20; //20x20 grid
let cells=[];

function createGrid(){
    board.innerHTML="";

    cells=[];

    for(let i=0;i<size*size;i++){
        const cell=document.createElement("div");
        //add a class list
        cell.classList.add("cell");
        //append it to the board
        board.appendChild(cell);
        //push it to the cells
        cells.push(cell);
    }
}

createGrid();

//add snake state
let snake=[{x:10,y:10}]; //start position
let food={x:5, y:5};
let direction="RIGHT";
let gameInterval=null;
let score=0;

//Draw snake and food
function draw(){
    //clear board first
    cells.forEach(cell=>{
        cell.classList.remove("snake","food");
    });

    //draw snake
    snake.forEach(part => {
        const index=part.y*size+part.x;
        cells[index].classList.add("snake");
    });

    //draw food
    const foodIndex=food.y*size + food.x;
    cells[foodIndex].classList.add("food");
}

draw();