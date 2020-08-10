const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const myFunction = require('./public/myFunction');

const url = 'mongodb://localhost:127.0.0.1:27017/result';
mongoose.connect(url, { useNewUrlParser: true,  useUnifiedTopology: true } );
const hostname = 'localhost';
const port = 3000;

const app = express();
const urlencodedParser = bodyParser.urlencoded({extended: false}); 

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.render('form');
});

const resultSchema = new mongoose.Schema({
  f_name: {type: String, minlength: 1, required: true},
  l_name: {type: String, minlength: 1, required: true},
  m_marks: {type: Number, required: true},
  e_marks: {type: Number, required: true}
});
const Result = mongoose.model('Result',resultSchema);

app.post('/', urlencodedParser, (req, res) => {
  const { f_name, l_name, m_marks, e_marks } = req.body;
  const Input = {f_name, l_name, m_marks, e_marks};
  Result(Input).save((err, data) => {
    if (err) throw err;
    res.redirect('/details');  
  });
});

app.get('/details', (req, res) => {
  const inputList = [];
  Result.find({}, (err, data) => {
    if (err) throw err;
    data.forEach((item) => {
      const { f_name,l_name,m_marks,e_marks } = item;
      inputList.push(`${f_name} ${l_name} ${m_marks} ${e_marks}`)
    })
    const sortedList = myFunction(inputList);  
    res.render('details', {data: sortedList});
  });
});

const server = http.createServer(app);
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}`)
});

