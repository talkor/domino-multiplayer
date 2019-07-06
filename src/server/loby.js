const express = require('express');
const bodyParser = require('body-parser');
const auth = require('./auth');

const chatContent = [];

const loby = express.Router();

loby.use(bodyParser.text());

loby
  .route('/')
  .get(auth.userAuthentication, (req, res) => {
    res.json(chatContent);
  })
  .post(auth.userAuthentication, (req, res) => {
    const body = req.body;
    const userInfo = auth.getUserInfo(req.session.id);
    chatContent.push({ user: userInfo, text: body });
    res.sendStatus(200);
  });

loby.appendUserLogoutMessage = function(userInfo) {
  chatContent.push({
    user: { name: 'Chat Bot' },
    text: `User ${userInfo.name} has logout`,
    isBot: true
  });
};

module.exports = loby;
