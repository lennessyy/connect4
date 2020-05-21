describe('checks for end game', function (){
	beforeEach(function (){
		for (let row of board) {
			row.fill(null);
		}
	});

	it('should be able to check horizontal', function (){
		for (let i = 0; i < 4; i++) {
			board[5][i] = 1;
		}
		expect(checkForWin()).toEqual(true);
	});

	it('should be able to check vertical', function (){
		for (let i = 1; i < 5; i++) {
			board[i][3] = 1;
		}
		expect(checkForWin()).toEqual(true);
	});

	it('should be able to check diagnal', function (){
		board[0][0] = 1;
		board[1][1] = 1;
		board[2][2] = 1;
		board[3][3] = 1;
		expect(checkForWin()).toEqual(true);
	});

	it('should be able to check for tie', function (){
		board[0].fill(3);
		expect(checkForTie()).toEqual(true);
	});

	afterAll(function (){
		for (let row of board) {
			row.fill(null);
		}
		currPlayer = 1;
	});
});
