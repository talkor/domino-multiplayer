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
  const game = req.body;
  // const userInfo = auth.getUserInfo(req.session.id);
  games.push(JSON.parse(game));
  res.sendStatus(200);
});

router.appendUserLogoutMessage = function(userInfo) {
  games.push({ user: userInfo, text: `user had logout` });
};

module.exports = router;
