const Game = require('./game');
const Pawn = require('./pawn')

test('constructor works', () => {
    // Given
    let start = {'i': 0, 'j': 0};
    let end = {'i': 0, 'j': 0};
    let game = new Game();

    // When
    let pawn = new Pawn(start, game, "white");

    // Then
    expect(pawn).toBeDefined();
})

test('pawn can move one space forward', () => {
    // Given
    let start = {'x': 1, 'y': 6};
    let end = {'x': 1, 'y': 5};
    let game = new Game();
    let pawn = new Pawn(start, game, "white");

    // When
    let valid = pawn.isValidMove(end);

    // Then
    expect(valid).toBe(true);
})

test('pawn cannot move backward', () => {
    // Given
    let start = {'x': 1, 'y': 5};
    let end = {'x': 1, 'y': 6};
    let game = new Game();
    let pawn = new Pawn(start, game, "white");

    // When
    let valid = pawn.isValidMove(end)

    // Then
    expect(valid).toBe(false);
})


test('sameFile() returns true when same file', () => {
    // Given
    let start = {'x': 1, 'y': 5};
    let end = {'x': 1, 'y': 6};
    let game = new Game();
    let pawn = new Pawn(start, game, "white");

    // When
    let sameFile = pawn.sameFile(end)

    // Then
    expect(sameFile).toBe(true);
})


test('sameFile() returns false when not same file', () => {
    // Given
    let start = {'x': 1, 'y': 5};
    let end = {'x': 2, 'y': 6};
    let game = new Game();
    let pawn = new Pawn(start, game, "white");

    // When
    let sameFile = pawn.sameFile(end)

    // Then
    expect(sameFile).toBe(false);
})

test('isForward() returns true when end position is given number of ranks forward', () => {
    // Given
    let start = {'x': 1, 'y': 6};
    let end = {'x': 1, 'y': 4};
    let game = new Game();
    let pawn = new Pawn(start, game, "white");

    // When
    let isForward = pawn.isForward(end, 2);

    // Then
    expect(isForward).toBe(true);
})


test('isForward() returns true when end position is given number of ranks forward', () => {
    // Given
    let start = {'x': 1, 'y': 6};
    let end = {'x': 1, 'y': 4};
    let game = new Game();
    let pawn = new Pawn(start, game, "black");

    // When
    let isForward = pawn.isForward(end, 2);

    // Then
    expect(isForward).toBe(false);
})
