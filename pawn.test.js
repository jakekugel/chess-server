const Game = require('./game');
const Pawn = require('./pawn')

test('constructor works', () => {
    // Given
    let start = {'i': 0, 'j': 0};
    let end = {'i': 0, 'j': 0};
    let game = new Game();

    // When
    let pawn = new Pawn(start, end, game);

    // Then
    expect(pawn).toBeDefined();
})

test('pawn can move one space forward', () => {
    // Given
    let start = {'x': 1, 'y': 6};
    let end = {'x': 1, 'y': 5};
    let game = new Game();
    let pawn = new Pawn(start, end, game, "white");

    // When
    let valid = pawn.isValidMove();

    // Then
    expect(valid).toBe(true);
})

test('pawn cannot move backward', () => {
    // Given
    let start = {'x': 1, 'y': 5};
    let end = {'x': 1, 'y': 6};
    let game = new Game();
    let pawn = new Pawn(start, end, game, "white");

    // When
    let valid = pawn.isValidMove()

    // Then
    expect(valid).toBe(false);
})


test('sameFile() returns true when same file', () => {
    // Given
    let start = {'x': 1, 'y': 5};
    let end = {'x': 1, 'y': 6};
    let game = new Game();
    let pawn = new Pawn(start, end, game, "white");

    // When
    let sameFile = pawn.sameFile()

    // Then
    expect(sameFile).toBe(true);
})


test('sameFile() returns false when not same file', () => {
    // Given
    let start = {'x': 1, 'y': 5};
    let end = {'x': 2, 'y': 6};
    let game = new Game();
    let pawn = new Pawn(start, end, game, "white");

    // When
    let sameFile = pawn.sameFile()

    // Then
    expect(sameFile).toBe(false);
})


test('endIsOneSquareForward() returns true when one square forward', () => {
    // Given
    let start = {'x': 1, 'y': 6};
    let end = {'x': 1, 'y': 5};
    let game = new Game();
    let pawn = new Pawn(start, end, game, "white");

    // When
    let endIsOneSquareForward = pawn.endIsOneSquareForward()

    // Then
    expect(endIsOneSquareForward).toBe(true);
})
