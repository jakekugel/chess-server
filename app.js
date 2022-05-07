const express = require('express')
const cors = require('cors');
const app = express();
const port = 2999;

app.use(cors());
app.use(express.json())


const Game = require('./game.js');
const User = require('./user.js');
const games = [];
const users = [];

function getGame(id) {
    for (var i = 0; i < games.length; i++) {
        if (games[i].id == id) {
            return games[i];
        }
    }
}

function getGameByPassword(password) {
    for (var i = 0; i < games.length; i++) {
        if (games[i].password == password) {
            return games[i];
        }
    }
}

function getUser(id) {
    for (var i = 0; i < users.length; i++) {
        if (users[i].id == id) {
            return users[i];
        }
    }
}

app.post('/play', (req, res) => {
    if (req.body === undefined) {
        res.status(400).json({message: "The post body is empty."});
    }

    let command = req.body.command;
    if (command == "createGame") {
        let password = req.body.password;
        var takenGameIds = [];
        for (var i = 0; i < games.length; i++) {
            takenGameIds.push(games[i].id);
        }

        var gameId = 0;
        while (takenGameIds.includes(gameId)) {
            gameId += 1;
        }
        let game = new Game(gameId, password);
        games.push(game);

        var takenUserIds = [];
        for (var i = 0; i < users.length; i++) {
            takenUserIds.push(users[i].id);
        }
        var userId = 0;
        while (takenUserIds.includes(userId)) {
            userId += 1;
        }
        users.push(new User(userId, game, "w"));
        res.json({"userId": userId});
    } else if (command == "move") {
        let userId = req.body.userId;
        let user = getUser(userId);
        let game = user.game;
        if (game.activeColor != user.color) {
            res.status(400).json({message: "It's not your turn."});
        } else {
            let start = game.algebraicToXY(req.body.start);
            let end = game.algebraicToXY(req.body.end);
            if (start === null || end === null) {
                res.status(400).json({message: "The start and end positions are missing or invalid."});
            }
            let result = game.move(start, end);

            if (result === false) {
                res.status(400).json({message: "Invalid move"});
            } else {
                res.send("null");
                res.status(201).end();
            }
        }
    } else if (command == "joinGame") {
        let password = req.body.password;
        let game = getGameByPassword(password);
        var takenUserIds = [];
        for (var i = 0; i < users.length; i++) {
            takenUserIds.push(users[i].id);
        }
        var userId = 0;
        while (takenUserIds.includes(userId)) {
            userId += 1;
        }
        users.push(new User(userId, game, "b"));
        res.json({"userId": userId});
    } else if (command == "message") {
        let userId = req.body.userId;
        let message = req.body.message;
        let game = getUser(userId).game;
        let date = new Date();
        let timestamp = date.getHours() + ":" + date.getMinutes();
        game.messages.push([message, userId, timestamp]);
        res.send("null");
        res.status(201).end();
    } else if (command == "getMessages") {
        let userId = req.body.userId;
        let game = getUser(userId).game;
        res.json({messages: game.messages});
    } else if (command == "getBoard") {
        let userId = req.body.userId;
        let game = getUser(userId).game;
        res.json(game.fen());
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});
