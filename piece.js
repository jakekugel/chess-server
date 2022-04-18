class Piece {
    constructor(start, end, game, color) {
        this.start = start;
        this.end = end;
        this.game = game;
        this.color = color;
    }

    movePiece() {
        this.game.setPiece(this.end, this);
        this.game.setPiece(this.start, null);
    }

    updateEnpassantTargetSquare() {}

    updateCastlingAvailability() {}

}

module.exports = Piece
