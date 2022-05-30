const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
// why is mongo uppercase?
const url = 'mongodb+srv://simple-app:app123@cluster0.wa9nr.mongodb.net/?retryWrites=true&w=majority'
const dbName = "star-wars-quotes"


var db, collection;

app.listen(3000, () => {
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
        if(error) {
            throw error;
        }
        db = client.db(dbName);
        console.log('Connected to `' + dbName + '`!');
    });
});

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/', (req, res) => 
  res.sendFile(__dirname + '/index.html'))


  //gott make sure to match the collection below
  app.post('/quotes', (req, res) => {
    db.collection('quotes').insertOne(req.body)
      .then(result => {
        res.redirect('/')
      })
      .catch(error => console.error(error))
  })
  


