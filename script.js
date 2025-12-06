let highScore=localStorage.getItem("highScore") || 0;

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

function move(){
    const head = {...snake[0]};

    if(direction==="UP") head.y--;
    if(direction==="DOWN") head.y++;
    if(direction==="LEFT") head.x--;
    if(direction==="RIGHT") head.x++;

    //wall collision
    if(head.x<0 || head.x>=size || head.y<0 || head.y>=size){
        clearInterval(gameInterval);
        alert(`Game Over! Score: ${score}`);
        return;
    }

    //check self-collision
    for(let i=1;i<snake.length;i++){
        if(head.x===snake[i].x && head.y===snake[i].y){
            clearInterval(gameInterval);
            alert(`Game Over! You ran into yourself! Score:${score}`);
            return;
        }
    }

    //add it to the snake array
    snake.unshift(head);

    //if food eaten
    if(head.x===food.x&&head.y===food.y){
        score++; //increment score
        //display the score
        scoreEl.textContent="Score: "+score;

        //check and update high score
        if(score>highScore){
            highScore=score; //update the score
            localStorage.setItem("highScore",highScore);
            //update the highscore div
            document.getElementById("high-score").textContent=`High Score: ${highScore}`;
        }
        placeFood();
    } else{
        snake.pop();
    }

    draw();
}

function placeFood(){
    food.x=Math.floor(Math.random()*size);
    food.y=Math.floor(Math.random()*size);
}

//keyboard controls
document.addEventListener("keydown", e=>{
    if(e.key==="ArrowUp"&&direction!=="DOWN") direction ="UP";
    if(e.key==="ArrowDown"&&direction!=="UP") direction="DOWN";
    if(e.key==="ArrowLeft"&&direction!=="RIGHT") direction ="LEFT";
    if(e.key==="ArrowRight"&&direction!=="LEFT") direction="RIGHT";
});

//start button logic
startBtn.addEventListener("click",()=>{
    clearInterval(gameInterval);
    createGrid();

    snake=[{x:10,y:10}];
    direction="RIGHT";
    score=0;
    scoreEl.textContent="Score: 0";
    placeFood();
    draw();

    gameInterval=setInterval(move,200);
});