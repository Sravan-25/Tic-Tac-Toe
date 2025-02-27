let boxes = document.querySelectorAll('.box');
let reset = document.querySelector('#reset-btn');
let newBtn = document.querySelector('#new-btn');
let msgContainer = document.querySelector('.msg-container');
let msg = document.querySelector('#msg');
let draw = document.querySelector('#draw');

let turnO = true;

const patterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

boxes.forEach((box) => {
  box.addEventListener('click', () => {
    if (turnO) {
      box.innerText = 'O';
      box.style.color = 'red';
      turnO = false;
    } else {
      box.innerText = 'X';
      turnO = true;
      box.style.color = 'white';
    }
    box.disabled = true;

    chackWinner();
  });
});

const showWinner = (winner) => {
  msg.innerHTML = `Congratulations, Winner is ${winner}`;
  msgContainer.classList.remove('hide');
  disabledBoxes();
};

const chackWinner = () => {
  for (let pattern of patterns) {
    let pos1Val = boxes[pattern[0]].innerHTML;
    let pos2Val = boxes[pattern[1]].innerHTML;
    let pos3Val = boxes[pattern[2]].innerHTML;

    if (pos1Val != '' && pos2Val != '' && pos3Val != '') {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val);
      }
    }
  }
};

const disabledBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};
const enabledBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerHTML = '';
  }
};
const resetGame = () => {
  turnO = true;
  enabledBoxes();
  msgContainer.classList.add('hide');
};

newBtn.addEventListener('click', resetGame);
reset.addEventListener('click', resetGame);
