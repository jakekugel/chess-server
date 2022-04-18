const Pawn = require('./pawn')
const Game = require('./game');

test('movePiece() moves a piece', () => {
    // Given
    let start = {'x': 1, 'y': 6};
    let end = {'x': 1, 'y': 4};
    let game = new Game();
    let pawn = new Pawn(start, game, "white");

    // When
    pawn.movePiece(end);

    // Then
    expect(game.getPieceCode({'x': 1, 'y': 6})).toBe("");
    expect(game.getPieceCode({'x': 1, 'y': 4})).toBe("P");
})