let game = {};
const Player = (name, letter) => {
  let moves = ''; // 012,345,678,036,147,258,048,246 ['012']
  let scores = 0;
  const addMove = (position) => {
    moves += position;
  };
  const getName = () => name;
  const getMoves = () => moves.length;
  const winningMoves = ['012', '345', '678', '036', '147', '258', '048', '246'];
  const clearMoves = () => {
    moves = '';
  };

  const checkIfWon = () => {
    let check = false;
    winningMoves.forEach((winMove) => {
      let count = 0;
      for (let j = 0; j < moves.length; j += 1) {
        if (winMove.includes(moves[j])) {
          count += 1;
        }
      }
      if (count > 2) {
        check = true;
      }
    });
    return check;
  };
  const won = () => {
    scores += 1;
  };
  const getScores = () => scores;
  return {
    letter, addMove, checkIfWon, getName, getMoves, clearMoves, getScores, won, scores,
  };
};
const gameBoard = (() => {
  let board = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
  const enterMove = (position, letter) => {
    if (board[position] === 'X' || board[position] === 'O') {
      return false;
    }
    board[position] = letter;
    return true;
  };
  const render = () => {
    board.forEach((pos, index) => {
      const position = document.getElementById(`pos-${index + 1}`);
      position.innerHTML = pos;
    });
  };
  const clearBoard = () => {
    board = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
  };
  return {
    render, enterMove, clearBoard,
  };
})();

const Game = (playerOne, playerTwo, board) => {
  let cPlayer = playerOne;
  let active = true;
  const start = () => {
    active = true;
  };
  const end = () => {
    active = false;
  };
  const state = () => active;
  const togglePlayer = () => {
    if (cPlayer === playerOne) {
      cPlayer = playerTwo;
    } else {
      cPlayer = playerOne;
    }
  };
  const currentPlayer = () => cPlayer;
  const gameInfo = () => {
    document.getElementById('display-info').innerHTML = `${game.playerOne.getName()} : ${game.playerOne.letter} &nbsp; &nbsp; ${game.playerTwo.getName()}  : ${game.playerTwo.letter}</br>
      Scores :  ${playerOne.getScores()} &nbsp; &nbsp; ${playerTwo.getScores()}`;
  };

  return {
    currentPlayer,
    start,
    end,
    state,
    playerOne,
    playerTwo,
    board,
    togglePlayer,
    gameInfo,
  };
};

function getClickIndex(event) {
  const { id } = event.target;
  const move = Number(id.slice(-1)) - 1;
  if (game.state()) {
    if (game.board.enterMove(move, game.currentPlayer().letter) && !Number.isNaN(move)) {
      game.currentPlayer().addMove(move);
      game.board.render();
      if (game.currentPlayer().checkIfWon()) {
        document.getElementById('result').innerHTML = `${game.currentPlayer().getName()} has won!!`;
        document.getElementById('p-again').style.display = 'block';
        game.currentPlayer().won();
        game.end();
        game.gameInfo();
      } else if ((game.playerOne.getMoves() + game.playerTwo.getMoves()) === 9) {
        document.getElementById('result').innerHTML = 'It\'s a tie!!';
        game.end();
        document.getElementById('p-again').style.display = 'block';
      }
      game.togglePlayer();
    }
  }
}

function startGame() {
  const playerOneName = document.getElementById('first_player').value;
  const playerTwoName = document.getElementById('second_player').value;
  document.getElementById('players-info').innerHTML = '';
  const playerOne = Player(playerOneName, 'X');
  const playerTwo = Player(playerTwoName, 'O');
  game = Game(playerOne, playerTwo, gameBoard);
  gameBoard.render();
  game.gameInfo();
  document.getElementById('board').style.display = 'block';
}

function playAgain() {
  game.playerOne.clearMoves();
  game.playerTwo.clearMoves();
  game.board.clearBoard();
  game.board.render();
  game.start();
}
