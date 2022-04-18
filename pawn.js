const Piece = require('./piece')

class Pawn extends Piece {
    isValidMove() {
        if (this.sameFile() && this.endIsOneSquareForward() && ! this.game.isOccupied(this.end)) {
            return true;
        }

        return false;
    }

    sameFile() {
        return this.start.x == this.end.x;
    }

    endIsOneSquareForward() {
        if (this.color === "white") {
            return this.end.y == this.start.y - 1;
        } else {
            return this.end.y == this.start.y + 1;
        }
    }

    getCode() {
        if (this.color === "white") {
            return "P";
        } else {
            return "p";
        }
    }
}

module.exports = Pawn
