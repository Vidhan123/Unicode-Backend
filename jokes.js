const express = require('express');
const http = require('http');
const fetchJoke = require('./fetchJoke');

const hostname = 'localhost';
const port = 3000;

const app = express();

app.get('/',(req,res) => {
  res.send('Enter a joke category to get started')
});

app.get(`/:category`, async (req,res) => {
  const result = await fetchJoke.storeJoke(req.params.category);
  if (result!=null){
    res.statusCode = 200;
    res.setHeader('Content-type','application/json');
    res.end(JSON.stringify(result));
  }
  else {
    res.statusCode = 404;
    res.setHeader('Content-type','text/html');
    res.end('<html><body><h1>Error 404: ' + req.params.category + ' category not found');
  }
});


const server = http.createServer(app);
server.listen(port,hostname, () => {
  console.log(`Server running at http://${hostname}:${port}`)
});