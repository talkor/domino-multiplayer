const express = require('express');
const router = express.Router();
const auth = require('./auth');
const loby = require('./loby');

const users = express.Router();

users.get('/', auth.userAuthentication, (req, res) => {
  const userName = auth.getUserInfo(req.session.id).name;
  res.json({ name: userName });
});

users.get('/all', auth.userAuthentication, (req, res) => {
  res.json(userList);
});

users.post('/add', auth.addUserToAuthList, (req, res) => {
  res.sendStatus(200);
});

users.get('/logout', [
  (req, res, next) => {
    const userinfo = auth.getUserInfo(req.session.id);
    loby.appendUserLogoutMessage(userinfo);
    next();
  },
  auth.removeUserFromAuthList,
  (req, res) => {
    res.sendStatus(200);
  }
]);

module.exports = users;
