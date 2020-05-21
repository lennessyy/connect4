/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

var height = 7;
var width = 6;

var currPlayer = 1; // active player: 1 or 2
var board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard (){
	// TODO: set "board" to empty width x height matrix array
	board = Array(height).fill(null).map(() => Array(width).fill(null));
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard (){
	// TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
	const htmlBoard = document.querySelector('#board');
	// create the top of the grid that handles click with
	var top = document.createElement('tr');
	top.setAttribute('id', 'column-top');
	top.addEventListener('click', handleClick);

	for (var x = 0; x < width; x++) {
		var headCell = document.createElement('td');
		headCell.setAttribute('id', x);
		top.append(headCell);
	}
	htmlBoard.append(top);

	// make each column as tall as width assign each cell an id according to the coordinates
	for (var y = 0; y < height; y++) {
		const row = document.createElement('tr');
		for (var x = 0; x < width; x++) {
			const cell = document.createElement('td');
			cell.setAttribute('id', `${y}-${x}`);
			row.append(cell);
		}
		htmlBoard.append(row);
	}
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol (x){
	// TODO: write the real version of this, rather than always returning 0
	for (let y = width; y >= 0; y--) {
		if (!board[y][x]) {
			board[y][x] = currPlayer;
			return y;
		}
	}
	return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable (y, x){
	// TODO: make a div and insert into correct table cell
	const piece = document.createElement('div');
	if (currPlayer === 1) {
		piece.classList.add('player1');
		piece.classList.add('piece');
	}
	else if (currPlayer === 2) {
		piece.classList.add('player2');
		piece.classList.add('piece');
	}
	const tablePosition = document.getElementById(`${y}-${x}`);
	tablePosition.appendChild(piece);
}

/** endGame: announce game end */

function endGame (msg){
	// TODO: pop up alert message
	alert(msg);
}

/** handleClick: handle click of column top to play piece */

function handleClick (evt){
	// get x from ID of clicked cell
	var x = +evt.target.id;

	// get next spot in column (if none, ignore click)
	var y = findSpotForCol(x);
	if (y === null) {
		return;
	}

	// place piece in board and add to HTML table
	// TODO: add line to update in-memory board
	placeInTable(y, x);

	// check for win
	if (checkForWin()) {
		return endGame(`Player ${currPlayer} won!`);
	}

	// check for tie
	// TODO: check if all cells in board are filled; if so call, call endGame
	if (checkForTie()) {
		endGame('it is a tie');
	}
	// switch players
	// TODO: switch currPlayer 1 <-> 2
	if (currPlayer === 1) {
		currPlayer = 2;
	}
	else if (currPlayer === 2) {
		currPlayer = 1;
	}
}

function checkForTie (){
	if (board[0].every((val) => val)) {
		return true;
	}
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin (){
	function _win (cells){
		// Check four cells to see if they're all color of current player
		//  - cells: list of four (y, x) cells
		//  - returns true if all are legal coordinates & all match currPlayer

		return cells.every(([ y, x ]) => y >= 0 && y < height && x >= 0 && x < width && board[y][x] === currPlayer);
	}

	// TODO: read and understand this code. Add comments to help you.

	for (var y = 0; y < height; y++) {
		for (var x = 0; x < width; x++) {
			var horiz = [ [ y, x ], [ y, x + 1 ], [ y, x + 2 ], [ y, x + 3 ] ];
			var vert = [ [ y, x ], [ y + 1, x ], [ y + 2, x ], [ y + 3, x ] ];
			var diagDR = [ [ y, x ], [ y + 1, x + 1 ], [ y + 2, x + 2 ], [ y + 3, x + 3 ] ];
			var diagDL = [ [ y, x ], [ y + 1, x - 1 ], [ y + 2, x - 2 ], [ y + 3, x - 3 ] ];

			if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
				return true;
			}
		}
	}
}

makeBoard();
makeHtmlBoard();
