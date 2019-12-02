let gameWidth;
let gameHeight;
let mines;
let minefield;
let numLoops = 0;

startGame = () => {
  numLoops = 0;
  gameHeight = Number(document.getElementById("height").value);
  gameWidth = Number(document.getElementById("width").value);
  mines = Number(document.getElementById("mines").value);
  createMinefieldObject();
  renderGame();
  console.log(numLoops);
};

const createMinefieldObject = () => {
  minefield = [];
  let minesToPlace = mines;
  let squares = gameWidth * gameHeight;
  for (let i = 0; i < gameHeight; i++) {
    numLoops++;
    let minefieldRow = new Array(gameWidth).fill("");
    minefield.push(minefieldRow);
  }

  minefield.forEach((row, yIndex) => {
    row.forEach((square, xIndex) => {
      numLoops++;
      let likelihoodOfPlacingMine = minesToPlace / squares;
      if (likelihoodOfPlacingMine >= Math.random()) {
        minefield[yIndex][xIndex] = "X";
        minefield = addHintsToMinefieldObject(minefield, {
          x: xIndex,
          y: yIndex
        });
        minesToPlace--;
      }
      squares--;
    });
  });
};

const addHintsToMinefieldObject = (minefieldObject, coordinates) => {
  for (let y = coordinates.y - 1; y <= coordinates.y + 1; y++) {
    for (let x = coordinates.x - 1; x <= coordinates.x + 1; x++) {
      numLoops++;
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

const renderGame = () => {
  let gameArea = document.getElementById("game-area");
  let gameHtml = "";
  let gameAreaStyle = "";

  minefield.forEach((row, yIndex) => {
    let gameLine = "";
    row.forEach((square, xIndex) => {
      gameHtml += generateSquareHTML(square, xIndex, yIndex);
      gameLine += `y${yIndex}x${xIndex} `;
    });
    gameAreaStyle += `"${gameLine.trim()}" `;
  });
  gameArea.innerHTML = gameHtml;
  gameArea.style = `grid-template-areas: ${gameAreaStyle}`;
};

const generateSquareHTML = (text, x, y) => {
  let colorStyle = "";
  switch (text) {
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
    case 5:
      colorStyle = "color:maroon";
      break;
    case 6:
      colorStyle = "color:turquoise";
      break;
    case 8:
      colorStyle = "color:gray";
      break;
    default:
      break;
  }

  return `<div class=\"mine-section\" id="y${y}x${x}" style="grid-area:y${y}x${x};${colorStyle}">${text}</div>`;
};
