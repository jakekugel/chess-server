const Pawn = require('./pawn')

// A Chess game.
class Game {
    constructor() {
        this.board = [
            ["r", "n", "b", "q", "k", "b", "n", "r"],
            ["p", "p", "p", "p", "p", "p", "p", "p"],
            ["",  "",  "",  "",  "",  "",  "",  "" ],
            ["",  "",  "",  "",  "",  "",  "",  "" ],
            ["",  "",  "",  "",  "",  "",  "",  "" ],
            ["",  "",  "",  "",  "",  "",  "",  "" ],
            ["P", "P", "P", "P", "P", "P", "P", "P"],
            ["R", "N", "B", "Q", "K", "B", "N", "R"],
        ];

        this.activeColor = "w";
        this.castlingAvailability = "KQkq";
        this.enPassantTargetSquare = "-";
        this.halfmoveClock = 0;
        this.fullmoveNumber = 1;

    }

    // Return the state of the game in FEN notation:
    // https://en.wikipedia.org/wiki/Forsyth%E2%80%93Edwards_Notation
    fen() {
        let fen = `${this.getFenPiecePlacement()} ${this.activeColor} ${this.castlingAvailability} ` +
               `${this.enPassantTargetSquare} ${this.halfmoveClock} ${this.fullmoveNumber}`;

        return {
            'fen': fen
        };
    }

    // Get the piece placement in FEN notation
    getFenPiecePlacement() {
        let output = "";
        let empty = 0;
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if (this.board[i][j] === "") {
                    empty += 1;

                    if (j == 7) {
                        output = output + empty;
                        empty = 0;
                    }
                } else {
                    if (empty > 0) {
                        output = output + empty;
                        empty = 0;
                    }
                    output += this.board[i][j];
                }

                if (j == 7 && i < 7) {
                    output = output + '/';
                }
            }
        }

        return output;
    }

    // Move
    move(start, end) {
        let piece = this.getPiece(start, end);

        // Piece is null if nothing found in that position.
        if (piece === null || ! piece.isValidMove()) {
            return false;
        }

        piece.movePiece();

        piece.updateEnpassantTargetSquare();

        piece.updateCastlingAvailability();

        if (this.activeColor === "w") {
            this.activeColor = "b";
        } else {
            this.activeColor = "w";
        }

        this.halfmoveClock += 1;

        if (this.activeColor === "w") {
            this.fullmoveNumber += 1;
        }
    }

    algebraicToXY(algebraic) {
        if (algebraic.length != 2) {
            return null;
        }

        let x = algebraic.charCodeAt(0) - 97;
        if (x < 0 || x > 7) {
            return null;
        }

        let y = 8 - parseInt(algebraic.charAt(1));
        if (isNaN(y) || y < 0 || y > 7) {
            return null;
        }

        return {'x': x, 'y': y};
    }

    // Get a piece object representing the type of piece being moved
    getPiece(start, end) {
        let piece = this.board[start.y][start.x];

        if (piece === "P") {
            return new Pawn(start, end, this, "white");
        }

        if (piece === "p") {
            return new Pawn(start, end, this, "black");
        }

        return null;
    }

    isOccupied(position) {
        let piece = this.board[position.y][position.x];

        if (piece === "") {
            return false;
        }

        return true;
    }

    // Given a position and a Piece object, sets the 
    setPiece(position, piece) {
        if (piece !== null) {
            this.board[position.y][position.x] = piece.getCode();
        } else {
            this.board[position.y][position.x] = "";
        }
    }

    getPieceCode(position) {
        return this.board[position.y][position.x];
    }

    // Code is the single character string representing piece
    setPieceCode(position, code) {
        this.board[position.y][position.x] = code;
    }

    isSameFile(position1, position2) {
        return position1.x === position2.x;
    }

    isSameRank(position1, position2) {
        return position1.y === position2.y;
    }

    isSameDiagonal(position1, position2) {
        return Math.abs(position1.y - position2.y) === Math.abs(position1.x - position2.x);
    };

    // Returns true if there is a piece BETWEEN two positions.  Does not check
    // the positions themselves.
    isObstacle(position1, position2) {
        if (! this.isSameFile(position1, position2) 
         && ! this.isSameRank(position1, position2)
         && ! this.isSameDiagonal(position1, position2)) {
            throw 'Error: must be either same rank, same file, or same diagonal'
        };

        // These will be either +1, 0, or -1
        let xStep = (position2.x === position1.x) ? 0 : (position2.x - position1.x) / Math.abs(position2.x - position1.x);
        let yStep = (position2.y === position1.y) ? 0 : (position2.y - position1.y) / Math.abs(position2.y - position1.y);

        let x = position1.x + xStep;
        let y = position1.y + yStep;

        while ((x !== position2.x) && (y !== position2.y)) {
            if (this.isOccupied({'x': x, 'y': y})) {
                console.log('Position occupied')
                console.log({'x': x, 'y': y});
                return true;
            }

            x += xStep;
            y += yStep;
        }

        return false;
    }
}

module.exports = Game
