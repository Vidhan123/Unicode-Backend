const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const myFunction = require('./public/myFunction');

const hostname = 'localhost';
const port = 3000;

const app = express();
const urlencodedParser = bodyParser.urlencoded({extended: false}); 

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.render('form');
});

const inputList = ["Rashmil Panchani 99 97", "Parag Vaid 95 93", "Siddharth Sanghavi 98 100"];
app.post('/', urlencodedParser, (req, res) => {
  const { f_name,l_name,m_marks,e_marks } = req.body;
  inputList.push(`${f_name} ${l_name} ${m_marks} ${e_marks}`);
  res.redirect('/details');
});

app.get('/details', (req, res) => {
  const sortedList = myFunction(inputList);
  res.render('details', {data: sortedList});
});

const server = http.createServer(app);
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}`)
});

