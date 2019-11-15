const gameWidth = 15;
const gameHeight = 15;
let mines = 30;
let minefield;

const resetGame = () => {
  let gameArea = document.getElementById("game-area");
  let gameHtml = "";
  let gameAreaStyle = "";

  minefield.forEach((row, yIndex) => {
    let gameLine = "";
    row.forEach((square, xIndex) => {
      let colorStyle = "";
      switch (square) {
        case 1:
          colorStyle = "color:blue";
          break;

        case 2:
          colorStyle = "color:green";
          break;
        case 3:
          colorStyle = "color:red";
          break;
        case 4:
          colorStyle = "color:purple";
          break;
        default:
          break;
      }

      gameHtml += `<div class=\"mine-section\" id="h${yIndex}w${xIndex}" style="grid-area:h${yIndex}w${xIndex};${colorStyle}">${square}</div>`;
      gameLine += `h${yIndex}w${xIndex} `;
    });
    gameAreaStyle += `"${gameLine.trim()}" `;
  });
  gameArea.innerHTML = gameHtml;
  gameArea.style = `grid-template-areas: ${gameAreaStyle}`;
};

const addHintsToMinefieldObject = (minefieldObject, coordinates) => {
  for (let y = coordinates.y - 1; y <= coordinates.y + 1; y++) {
    for (let x = coordinates.x - 1; x <= coordinates.x + 1; x++) {
      if (
        x >= 0 &&
        y >= 0 &&
        x < gameWidth &&
        y < gameHeight &&
        minefieldObject[y][x] !== "X"
      ) {
        minefieldObject[y][x] = +minefieldObject[y][x] + 1;
      }
    }
  }
  return minefieldObject;
};

const setMinesInMinefieldObject = () => {
  minefield = [];
  let originalMines = mines;
  let squares = gameWidth * gameHeight;
  for (let i = 0; i < gameHeight; i++) {
    let minefieldRow = new Array(gameWidth).fill("");
    minefield.push(minefieldRow);
  }

  minefield.forEach((row, yIndex) => {
    row.forEach((square, xIndex) => {
      let likelihoodOfPlacingMine = mines / squares;
      let cofactor = Math.random();
      let placeMine = likelihoodOfPlacingMine >= cofactor;
      if (placeMine) {
        minefield[yIndex][xIndex] = "X";
        minefield = addHintsToMinefieldObject(minefield, {
          x: xIndex,
          y: yIndex
        });
        mines--;
      }
      squares--;
    });
  });
  mines = originalMines;
  resetGame();
};
