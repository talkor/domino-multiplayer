const express = require('express');
const bodyParser = require('body-parser');
const auth = require('./auth');

const router = express.Router();

const users = [];

router.use(bodyParser.json());

router.get('/', auth.userAuthentication, (req, res) => {
  const userName = auth.getUserInfo(req.session.id).name;
  res.json({ name: userName });
});

router.get('/all', auth.userAuthentication, (req, res) => {
  res.json(users);
});

router.post('/add', auth.addUserToAuthList, (req, res) => {
  users.push({ name: req.body });
  res.sendStatus(200);
});

router.get('/logout', [
  (req, res, next) => {
    const userinfo = auth.getUserInfo(req.session.id);
    // chatManagement.appendUserLogoutMessage(userinfo);
    next();
  },
  auth.removeUserFromAuthList,
  (req, res) => {
    res.sendStatus(200);
  }
]);

module.exports = router;
