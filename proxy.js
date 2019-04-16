//后台代码
const path = require('path');
const express = require('express');
var FormData = require('form-data');
const fetch = require('node-fetch');

const app = new express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/login', (req, res) => {
  console.log(req.query);
  const { userName, userPassword } = req.query;

  var form = new FormData();
  form.append('userName', userName);
  form.append('userPassword', userPassword);

  const proxyUrl = 'http://172.18.23.53:8087/login';

  fetch(proxyUrl, { method: 'POST', body: form })
    .then(function(res) {
      return res.json();
    })
    .then(function(json) {
      res.send(json);
    });
});

app.listen(3000, () => {
  console.log('server started at http://localhost:3000');
});

module.exports = app;
