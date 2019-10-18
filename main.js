const Player = (name,letter) => {
	let moves = '';
	scores = 0;
	const addMove = (position) => moves + position
    return {letter,addMove}
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
	return {
		render,enterMove
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
	return {
		current_player,
		start,
		end,
		state,
		player_one,
		player_two,
		board,
		togglePlayer
	}
}

let game = {}
function getClickIndex(event){
	const id = event.target.id
	move = Number(id.slice(-1)) - 1;
	if (game.state()){
		if(game.board.enterMove(move,game.current_player().letter))
		{
			game.current_player().addMove(move)
			game.togglePlayer();
			game.board.render();
		}
	}

}

function startGame(){
	
	player_one_name = document.getElementById("first_player").value;
	player_two_name = document.getElementById("second_player").value;
	player_one = Player(player_one_name, 'X');
	player_two = Player(player_two_name, 'O');
	game = Game(player_one,player_two,gameBoard);
	gameBoard.render();


}

