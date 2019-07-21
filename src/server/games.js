const express = require('express');
const bodyParser = require('body-parser');
const auth = require('./auth');
const tilesMap = require('./TilesMap.js');

const NUM_TILES = 28;
const NUM_STACK = 5;
const BOARD_SIZE = 784;
const MIDDLE_TILE = 406;
const games = [];

const router = express.Router();

router.use(bodyParser.json());

router.get('/all', auth.userAuthentication, (req, res) => {
  res.json(games);
});

router.post('/new', auth.userAuthentication, (req, res) => {
  const createdBy = auth.getUserInfo(req.session.id).name;
  const game = {
    id: Math.random()
      .toString(36)
      .substr(2, 9),
    ...JSON.parse(req.body),
    active: false,
    createdBy,
    players: [],
    playing: false,
    currentPlayer: 0,
    gameTiles: new Array(NUM_TILES).fill(0).map((_, index) => index),
    boardTiles: generateBoardTiles()
  };

  const gameTitle = game.title;
  for (let i = 0; i < games.length; i++) {
    if (games[i].title == gameTitle) {
      res.sendStatus(403);
      return;
    }
  }

  games.push(game);
  res.sendStatus(200);
});

router.get('/:id', auth.userAuthentication, (req, res) => {
  const user = auth.getUserInfo(req.session.id).name;
  const currentGame = games.find(game => game.id === req.params.id);
  const { playerTiles, stats } = currentGame.players.find(
    player => player.userName === user
  );

  const gameObj = { ...games.find(game => game.id === req.params.id) };
  const gameData = {
    ...gameObj,
    playerTiles,
    boardTiles: currentGame.boardTiles,
    stats,
    active: gameObj.players.length === gameObj.numPlayers,
    playing: gameObj.players[gameObj.currentPlayer].userName === user
  };

  res.json(gameData);
});

router.get('/:id/join', auth.userAuthentication, (req, res) => {
  const userName = auth.getUserInfo(req.session.id).name;
  const currentGame = games.find(game => game.id === req.params.id);

  const playerTiles = generatePlayerTiles(req.params.id);

  currentGame.players.push({
    userName,
    playerTiles,
    stats: {
      score: playerTiles.reduce(
        (sum, value) => sum + tilesMap[value].a + tilesMap[value].b,
        0
      )
    }
  });

  if (currentGame.players.length === currentGame.numPlayers) {
    currentGame.active = true;
  } else {
    currentGame.active = false;
  }

  res.sendStatus(200);
});

router.get('/:id/leave', auth.userAuthentication, (req, res) => {
  const userName = auth.getUserInfo(req.session.id).name;
  const currentGame = games.find(game => game.id === req.params.id);

  const playerIndex = currentGame.players.forEach((player, index) => {
    if (player.userName === userName) return index;
  });
  currentGame.players.splice(playerIndex, 1);
  res.sendStatus(200);
});

router.post('/:id/update', auth.userAuthentication, (req, res) => {
  let currentGame = games.find(game => game.id === req.params.id);
  const userName = auth.getUserInfo(req.session.id).name;
  const data = JSON.parse(req.body);

  currentGame.players.find(player => player.userName === userName).playerTiles =
    data.playerTiles;

  currentGame.boardTiles = data.boardTiles;
  currentGame.currentPlayer =
    (currentGame.currentPlayer + 1) % currentGame.numPlayers;

  res.sendStatus(200);
});

router.appendUserLogoutMessage = function(userInfo) {
  games.push({ user: userInfo, text: `user had logout` });
};

const generatePlayerTiles = id => {
  const currentGame = games.find(game => game.id === id);
  const gameTiles = currentGame.gameTiles;
  const playerTiles = [];

  Array(NUM_STACK)
    .fill('')
    .map(() => {
      const randomIndex = Math.floor(
        Math.random() * Math.floor(gameTiles.length)
      );

      playerTiles.push(gameTiles[randomIndex]);
      gameTiles.splice(randomIndex, 1);
    });

  return playerTiles;
};

const generateBoardTiles = () => {
  const boardTiles = new Array(BOARD_SIZE).fill({}).map((_, index) => {
    return {
      id: index,
      tile: 0,
      placed: false,
      placeholder: true,
      rotated: true,
      rendered: false
    };
  });

  boardTiles[MIDDLE_TILE].rendered = true;
  boardTiles[MIDDLE_TILE].isFirst = true;

  return boardTiles;
};

module.exports = router;
