let turnX = true;
let playerXScore = 0;
let playerOScore = 0;
let drawScore = 0;
let boxes = document.querySelectorAll(".box");
let announcementBtn = document.querySelector(".announcement");
let resultX = document.querySelector(".playerXResult");
let resultO = document.querySelector(".playerOResult");
let resultDraw = document.querySelector(".drawResult");
let results = document.querySelectorAll(".resultNumber");
let newGame = document.querySelector(".new-game-btn");
let count = 0;
let gotWinner = false;
let restartGame = document.querySelector(".restart-btn");

let winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

results[0].innerText = "0";
results[1].innerText = "0";
results[2].innerText = "0";

const turner = () => {
  if (turnX == true) {
    announcementBtn.innerText = "X turn";
    announcementBtn.style.backgroundColor = "#4bd1f9";
    announcementBtn.style.color = "black";
    announcementBtn.classList.remove("hide");
  } else {
    announcementBtn.innerText = "O turn";
    announcementBtn.style.backgroundColor = "#e2bb04";
    announcementBtn.style.color = "black";
    announcementBtn.classList.remove("hide");
  }
};
turner();

for (let i = 0; i < boxes.length; i++) {
  boxes[i].addEventListener("click", () => {
    if (turnX == true) {
      boxes[i].innerText = "X";
      boxes[i].style.color = "#4bd1f9";
      boxes[i].style.fontSize = "2rem";
      boxes[i].style.fontWeight = "bolder";
      turnX = false;
      turner();
    } else {
      boxes[i].innerText = "O";
      boxes[i].style.color = "#e2bb04";
      boxes[i].style.fontSize = "2rem";
      boxes[i].style.fontWeight = "bolder";
      turnX = true;
      turner();
    }
    boxes[i].disabled = true;

    checkWinner();
  });
}

const checkWinner = () => {
  for (i = 0; i < winPatterns.length; i++) {
    let pos1Val = boxes[winPatterns[i][0]].innerText;
    let pos2Val = boxes[winPatterns[i][1]].innerText;
    let pos3Val = boxes[winPatterns[i][2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val == pos2Val && pos2Val == pos3Val) {
        announcementBtn.innerText = `Game over. Player ${pos1Val} wins!`;
        gotWinner = true;
        announcementBtn.style.backgroundColor = "#05842D";
        announcementBtn.classList.remove("hide");

        if (pos1Val == "X") {
          playerXScore = playerXScore + 1;
          results[0].innerText = playerXScore;
        } else {
          playerOScore = playerOScore + 1;
          results[2].innerText = playerOScore;
        }

        buttonDisable();
      }
    }
  }
  if (gotWinner == false) {
    count = count + 1;
  } else {
    gotWinner = false;
  }

  checkDraw();
};

const buttonDisable = () => {
  for (let i = 0; i < boxes.length; i++) {
    boxes[i].disabled = true;
  }
};

const checkDraw = () => {
  if (count == 9) {
    announcementBtn.innerText = `Game over. It's a Draw!`;
    announcementBtn.style.backgroundColor = "#05842D";
    announcementBtn.classList.remove("hide");
    drawScore = drawScore + 1;
    results[1].innerText = drawScore;
  }
};

newGame.addEventListener("click", () => {
  for (let i = 0; i < boxes.length; i++) {
    boxes[i].innerText = "";
    boxes[i].disabled = false;
    announcementBtn.classList.add("hide");
    count = 0;
  }
  turner();
});

restartGame.addEventListener("click", () => {
  for (let i = 0; i < boxes.length; i++) {
    boxes[i].innerText = "";
    boxes[i].disabled = false;
    announcementBtn.classList.add("hide");
    count = 0;
    results[0].innerText = "0";
    results[1].innerText = "0";
    results[2].innerText = "0";
  }
  turner();
});
