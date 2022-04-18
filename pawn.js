const Piece = require('./piece')

class Pawn extends Piece {
    isValidMove(end) {

        // Simple case where pawn is moving one space forward
        if (this.sameFile(end) && this.isForward(end, 1) && ! this.game.isOccupied(end)) {
            return true;
        }

        // Pawn is moving two spaces forward
        if (this.sameFile(end) && this.isForward(end, 2) && ! this.game.isOccupied(end)) {
            return true;
        }

        // Pawn is capturing in standard way

        // Pawn is capturing en-passant

        return false;
    }

    getCode() {
        if (this.color === "white") {
            return "P";
        } else {
            return "p";
        }
    }

    sameFile(end) {
        return this.position.x == end.x;
    }

    // Returns true if end position is the given number of ranks "forward"
    // (up for white, down for black).
    isForward(end, ranks) {
        if (this.color === "white") {
            return this.position.y - ranks == end.y;
        } else {
            return this.position.y + ranks == end.y;
        }
    }

}

module.exports = Pawn
