const express = require('express')
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
// app.use(function(req, res, next) {
//     console.log(req);
// });
app.use(express.json())


const Game = require('./game.js')
const games = [];
games.push(new Game());


// Get state of given game
app.get('/games/0', (req, res) => {
    res.json(games[0].fen());
});

// Create a move
app.post('/moves', (req, res) => {
    let gameId = req.query.gameId;
    let game = games[gameId];

    if (req.body === undefined) {
        res.status(400).json({message: 'The post body is empty.'});
    }

    console.log(req.body);

    // Get start and end in cartesian notation
    let start = game.algToCart(req.body.start);
    let end = game.algToCart(req.body.end);
    if (start === null || end === null) {
        res.status(400).json({message: 'The start and end positions either missing or invalid.'});
    }

    // Move the piece
    let result = game.move(start, end);

    if (result === false) {
        res.status(400).json({message: 'Invalid move.'})
    } else {
        res.send('null');
        res.status(201).end();
    }

});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});
