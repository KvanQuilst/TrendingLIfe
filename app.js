const express = require('express');
const trendsRouter = require('./routes/getTrends')

const app = express();
const http = require('http');

const hostname = '127.0.0.1'
const port = 3000;

app.use('/assets', express.static('assets'))

app.use('/trends', trendsRouter);

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
})

app.get('/trends', function (req, res) {
  console.log('/trends')
  res.send('/trends')
})

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
})
