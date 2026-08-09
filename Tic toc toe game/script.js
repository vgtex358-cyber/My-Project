let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let winContainer = document.querySelector(".winner-container");
let whoWin = document.querySelector("#winner");
let newBtn = document.querySelector(".new-btn");

let turnO = true; //playerX playerO

const winPatten = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
  [1, 4, 7],
];


boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      box.innerText = "O";
      box.style.backgroundColor = "#8807f8";
      turnO = false;
    } else {
      box.innerText = "X";
      box.style.backgroundColor = "#6212a8";
      turnO = true;
    }
    box.disabled = true;
      // Check winner first
    const isWinner = checkWinner();

    // Only check draw if nobody won
    if (!isWinner) {
      checkDraw();
    }
  });
});

let checkWinner = () => {
  for (let patten of winPatten) {
    let pos1Val = boxes[patten[0]].innerText;
    let pos2Val = boxes[patten[1]].innerText;
    let pos3Val = boxes[patten[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        console.log("Winner ", pos1Val);
        whoWinner(pos1Val);
         return true; // Winner found
      }
    }
  }
   return false; // No winner
};

let checkDraw = () => {
    let bool = true;
    for(let box of boxes){
        if(box.innerText === ''){
           bool = false
        }
    }
    if(bool){
       whoWin.innerText = "Game DRAW";
    whoWin.style.backgroundColor = "#9c5e5e";
  winContainer.classList.remove("hide"); 
    }
}

let whoWinner = (p) => {
  if (p) {
    whoWin.innerText = "Player " + p + " is Winner";
    whoWin.style.backgroundColor = "#7f5e9c";
  }
  winContainer.classList.remove("hide");
  disableBox();
};


let disableBox = () => {
  for (box of boxes) {
    box.disabled = true;
  }
};

let enableBox = () => {
  for (box of boxes) {
    box.disabled = false;
    box.innerText = "";
    box.style.backgroundColor = "#7f5e9c";
  }
};

let reset = () => {
  turnO = true;
  enableBox();
};

let newGame = () => {
  turnO = true;
  enableBox();
  winContainer.classList.add("hide");
};
resetBtn.addEventListener("click", reset);
newBtn.addEventListener("click", newGame);
