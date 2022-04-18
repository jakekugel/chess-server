const Game = require('./game');
const Pawn = require('./pawn')

test('returns correct initial state in FEN notation', () => {
    // Given
    let game = new Game();

    // When
    let fen = game.fen();

    // Then
    expect(fen.fen).toBe('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
})

test('algToCart() converts e8 correctly', () => {
    // Given
    let game = new Game();

    // When
    let cartesian = game.algToCart('e8');

    // Then
    expect(cartesian.x).toBe(4);
    expect(cartesian.y).toBe(0);
})

test('algToCart() converts a1 correctly', () => {
    // Given
    let game = new Game();

    // When
    let cartesian = game.algToCart('a1');

    // Then
    expect(cartesian.x).toBe(0);
    expect(cartesian.y).toBe(7);
})

test('algToCart() returns appropriate error for "aaa"', () => {
    // Given
    let game = new Game();

    // When
    let cartesian = game.algToCart('aaa');

    // Then
    expect(cartesian).toBe(null);
})


test('algToCart() returns appropriate error for "G3" (uppercase not allowed)', () => {
    // Given
    let game = new Game();

    // When
    let cartesian = game.algToCart('G3');

    // Then
    expect(cartesian).toBe(null);
})


test('algToCart() returns appropriate error for "b9" (rank too high)', () => {
    // Given
    let game = new Game();

    // When
    let cartesian = game.algToCart('b9');

    // Then
    expect(cartesian).toBe(null);
})


test('algToCart() returns appropriate error for "bb" (rank must be digit)', () => {
    // Given
    let game = new Game();

    // When
    let cartesian = game.algToCart('bb');

    // Then
    expect(cartesian).toBe(null);
})


test('isOccupied() works as expected', () => {
    // Given
    let game = new Game();

    // When
    let occupied = game.isOccupied({'x': 0, 'y': 0});

    // Then
    expect(occupied).toBe(true);
})

test('isOccupied() works as expected', () => {
    // Given
    let game = new Game();

    // When
    let occupied = game.isOccupied({'x': 4, 'y': 4});

    // Then
    expect(occupied).toBe(false);
})

test('getPiece() works as expected', () => {
    // Given
    let game = new Game();

    // When
    let piece = game.getPiece({'x': 3, 'y': 1});

    // Then
    expect(piece).toBeInstanceOf(Pawn);
})

test('setPiece() can be used to place a piece', () => {
    // Given
    let game = new Game();
    let piece = game.getPiece({'x': 3, 'y': 1});

    // When
    game.setPiece({'x': 3, 'y': 3}, piece);

    // Then
    expect(game.board[3][3]).toBe("p");
})


test('setPiece() can be used to remove a piece', () => {
    // Given
    let game = new Game();

    // When
    game.setPiece({'x': 3, 'y': 3}, null);

    // Then
    expect(game.board[3][3]).toBe("");
})
