const express = require('express');
const bodyParser = require('body-parser');
const auth = require('./auth');

const router = express.Router();

const users = [];

router.use(bodyParser.json());

router.get('/', auth.userAuthentication, (req, res) => {
  const userName = auth.getUserInfo(req.session.id).name;
  let playing = 0;
  users.forEach(user => {
    if (user.name === userName) playing = user.playing;
  });
  res.json({ name: userName, playing: playing });
});

router.get('/all', auth.userAuthentication, (req, res) => {
  res.json(users);
});

router.post('/add', auth.addUserToAuthList, (req, res) => {
  users.push({ name: req.body, playing: '' });
  res.sendStatus(200);
});

router.post('/join/:id', auth.userAuthentication, (req, res) => {
  const userInfo = auth.getUserInfo(req.session.id);
  users.forEach(user => {
    if (user.name === userInfo.name) user.playing = req.params.id;
  });
  res.sendStatus(200);
});

router.get('/leave/:id', auth.userAuthentication, (req, res) => {
  const userInfo = auth.getUserInfo(req.session.id);
  users.forEach(user => {
    if (user.name === userInfo.name) user.playing = '';
  });
  res.sendStatus(200);
});

router.get('/logout', [
  (req, res, next) => {
    const userInfo = auth.getUserInfo(req.session.id);
    next();
  },
  auth.removeUserFromAuthList,
  (req, res) => {
    res.sendStatus(200);
  }
]);

module.exports = router;
