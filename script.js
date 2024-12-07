//get all elements
let buttonsRef = document.querySelectorAll(".game-box");
let popupRef = document.querySelector(".popup");
let restartBtn = document.getElementById("restart-btn");
let newGameBtn = document.getElementById("new-game");
let messageRef = document.getElementById("message");

//winning pattern
let winningPattern = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

//Player 'X' plays first
let xTurn = true;
let count = 0;

//disable all buttons
const disableButtons = () => {
  buttonsRef.forEach((element) => {
    element.disabled = true;
  });
  //enable popup
  popupRef.classList.remove("hide");
};

const enableButtons = () => {
  buttonsRef.forEach((element) => {
    element.innerText = "";
    element.disabled = false;
  });
  popupRef.classList.add("hide");
};

//Game outcome functions
//this function is executed when the player wins
const winFunction = (letter) => {
  disableButtons();
  if (letter == "X") {
    messageRef.innerHTML = "&#x1F389 <br> 'X' Wins";
  } else {
    messageRef.innerHTML = "&#x1F389 <br> 'O' Wins";
  }
};

//New Game - these listeners are executed when someone clicks on New game button
// or if someone press the Restart game button
newGameBtn.addEventListener("click", () => {
  count = 0;
  enableButtons();
});
restartBtn.addEventListener("click", () => {
  count = 0;
  enableButtons();
});

//this function is executed when game is a draw
const drawFunction = () => {
  disableButtons();
  messageRef.innerHTML = "&#x1F60E; <br> It's is a Draw";
};

const winChecker = () => {
  for (let i of winningPattern) {
    let [element1, element2, element3] = [
      buttonsRef[i[0]].innerText,
      buttonsRef[i[1]].innerText,
      buttonsRef[i[2]].innerText,
    ];
    if (element1 != "" && element2 != "" && element3 != "") {
      if (element1 == element2 && element2 == element3) {
        winFunction(element1);
      }
    }
  }
};

//Display X/O on click
//if the player is X then
buttonsRef.forEach((element) => {
  element.addEventListener("click", () => {
    if (xTurn) {
      xTurn = false;
      //Display X
      element.innerText = "X";
      element.disabled = true;
    } else {
      xTurn = true;
      //Display O
      element.innerText = "O";
      element.disabled = true;
    }
    //increment count on each click
    count = count + 1;
    if (count == 9) {
      drawFunction();
    }
    winChecker();
  });
});
// inner text = x
// else
// inner text = o

///
//increment count
//if count = 9 - call drawfunction
//call winChecker

//when windows load - enable buttons
window.onload = enableButtons;