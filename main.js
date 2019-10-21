const Player = (name,letter) => {
	let moves = ''; //012,345,678,036,147,258,048,246 ['012']
	let scores = 0;
	const addMove = (position) => moves += position
	const getName =() => name;
	const getMoves = () => moves.length;
	const winningMoves=['012','345','678','036','147','258','048','246'];
	const clearMoves = () => moves = '';
	
	const checkIfWon = () => {
		let check=false;
		winningMoves.forEach((winMove)=>{
			let count=0;
			for(let j=0;j<moves.length;j++){
				if(winMove.includes(moves[j])){
					count++;
					}
				}
				if(count>2){
					check=true;
				}
				
		})
		return check;
	} 
	const won = ()=> scores += 1
	const getScores = ()=> scores
    return {letter,addMove,checkIfWon,getName,getMoves,clearMoves,getScores,won,scores}
};
const gameBoard = (() =>{
	let board = ["1","2","3","4","5","6","7","8","9"];
	const enterMove = (position,letter) => {
		if(board[position]=='X' || board[position]=='O'){
			return false
		}
		board[position] = letter
		return true
	};
	const render = () => {
		const gameBoard=document.getElementById("board");
		board.forEach((pos,index) => {
			const position=document.getElementById(`pos-${index+1}`);
			position.innerHTML=pos;
		});
	}
	const clearBoard = () => board = ["1","2","3","4","5","6","7","8","9"];
	return {
		render,enterMove,clearBoard
	}
})();

const Game = (player_one,player_two,board) => {
	let c_player = player_one;
	let active = true;
	const start = () => active = true;
	const end = () => active = false;
	const state = () =>  active
	const togglePlayer = () => {
		if(c_player === player_one){
			c_player = player_two;
		}
		else{
			c_player = player_one;
		}
	}
	const current_player = () => c_player 
	const game_info = ()=> {
		document.getElementById('display-info').innerHTML = `${game.player_one.getName()} : ${game.player_one.letter} &nbsp; &nbsp; ${game.player_two.getName()}  : ${game.player_two.letter}</br>
		Scores :  ${player_one.getScores()} &nbsp;  ${player_two.getScores()}`
		dd = player_one.getScores();
	}

	return {
		current_player,
		start,
		end,
		state,
		player_one,
		player_two,
		board,
		togglePlayer,
		game_info
	}
}

let game = {}
function getClickIndex(event){
	const id = event.target.id
	const move = Number(id.slice(-1)) - 1;
	if (game.state()){
		if(game.board.enterMove(move,game.current_player().letter) && !Number.isNaN(move))
		{
			game.current_player().addMove(move);
			game.board.render();
			if(game.current_player().checkIfWon()){
				document.getElementById("result").innerHTML=`${game.current_player().getName()} has won!!`;
				document.getElementById("p-again").style.display ='block';
				game.current_player().won();
				game.game_info();
			}
			else if((game.player_one.getMoves()+game.player_two.getMoves())===9){
				document.getElementById("result").innerHTML=`It's a tie!!`;
				document.getElementById("p-again").style.display = 'block';
			}
			game.togglePlayer();
		}
	}

}

function startGame(){
	player_one_name = document.getElementById("first_player").value;
	player_two_name = document.getElementById("second_player").value;
	document.getElementById("players-info").innerHTML="";
	player_one = Player(player_one_name, 'X');
	player_two = Player(player_two_name, 'O');
	game = Game(player_one,player_two,gameBoard);
	gameBoard.render();
	game.game_info();
	document.getElementById('board').style.display='block';
}

function playAgain(){
	game.player_one.clearMoves();
	game.player_two.clearMoves();
	game.board.clearBoard();
	game.board.render();
}
