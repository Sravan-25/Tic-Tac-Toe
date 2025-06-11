let boxes = document.querySelectorAll('.box');
let reset = document.querySelector('#reset-btn');
let newBtn = document.querySelector('#new-btn');
let msgContainer = document.querySelector('.msg-container');
let msg = document.querySelector('#msg');
let draw = document.querySelector('#draw');
let soundBtn = document.querySelector('#sound-btn');
let clickSound = document.querySelector('#click-sound');
let winSound = document.querySelector('#win-sound');
let drawSound = document.querySelector('#draw-sound');

let turnO = true;
let moveCount = 0;
let soundOn = true;

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
    if (box.innerHTML !== '') return;
    if (soundOn) clickSound.play();
    if (turnO) {
      box.innerHTML = 'O';
      box.classList.add('o');
      turnO = false;
    } else {
      box.innerHTML = 'X';
      box.classList.add('x');
      turnO = true;
    }
    box.disabled = true;
    moveCount++;
    checkWinner();
  });
});

const showWinner = (winner) => {
  msg.innerHTML = `🎉 Player ${winner} Wins! 🎉`;
  msgContainer.classList.remove('hide');
  if (soundOn) winSound.play();
  disableBoxes();
};

const showDraw = () => {
  draw.innerHTML = `🤝 It's a Draw! 🤝`;
  msgContainer.classList.remove('hide');
  if (soundOn) drawSound.play();
  disableBoxes();
};

const checkWinner = () => {
  let isWinner = false;
  for (let pattern of patterns) {
    let pos1Val = boxes[pattern[0]].innerHTML;
    let pos2Val = boxes[pattern[1]].innerHTML;
    let pos3Val = boxes[pattern[2]].innerHTML;

    if (pos1Val !== '' && pos2Val !== '' && pos3Val !== '') {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val);
        isWinner = true;
        break;
      }
    }
  }
  if (!isWinner && moveCount === 9) {
    showDraw();
  }
};

const disableBoxes = () => {
  boxes.forEach((box) => (box.disabled = true));
};

const enableBoxes = () => {
  boxes.forEach((box) => {
    box.disabled = false;
    box.innerHTML = '';
    box.classList.remove('o', 'x');
  });
};

const resetGame = () => {
  turnO = true;
  moveCount = 0;
  enableBoxes();
  msgContainer.classList.add('hide');
};

const toggleSound = () => {
  soundOn = !soundOn;
  soundBtn.innerHTML = soundOn ? '🔊 Sound On' : '🔇 Sound Off';
};

newBtn.addEventListener('click', resetGame);
reset.addEventListener('click', resetGame);
soundBtn.addEventListener('click', toggleSound);
