const Player = (name) => {
    const sayName = () => console.log(`my name is ${name}`)
    return {sayName}
};
const gameBoard = (() =>{
	let board = ["1","2","3","4","5","6","7","8","9"];
	const enterMove = (position) => board.push(position);
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

// const displayController= () = {

// }
function startGame(){
	gameBoard.render();
}

