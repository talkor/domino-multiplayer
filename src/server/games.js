const express = require('express');
const bodyParser = require('body-parser');
const auth = require('./auth');

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
    players: [createdBy]
  };
  games.push(game);
  res.sendStatus(200);
});

router.appendUserLogoutMessage = function(userInfo) {
  games.push({ user: userInfo, text: `user had logout` });
};

module.exports = router;
