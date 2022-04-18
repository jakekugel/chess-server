class Piece {
    constructor(position, game, color) {
        this.position = position;
        this.game = game;
        this.color = color;
    }

    // Subclass should always provide an implementation of this method!
    getCode() {
        throw new Error('Subclass needs to implement getCode()');
    }

    // Subclass should always provide an implementation of this method!
    isValidMove(end) {
        throw new Error('Subclass needs to implement isValidMove()')
    }

    // Subclass may override if needed, not required
    movePiece(end) {
        this.game.setPiece(end, this);
        this.game.setPiece(this.position, null);
    }

    // Subclass may override if needed, not required
    updateEnpassantTargetSquare() {}

    // Subclass may override if needed, not required
    updateCastlingAvailability() {}
}

module.exports = Piece
