const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
// why is mongo uppercase?
const url = 'mongodb+srv://supermarket-list:list123@supermarket-express.vywtz.mongodb.net/supermarketExpressList?retryWrites=true&w=majority'

app.listen(2000, function() {
  console.log('listening on 2000')
})

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html')})


// MongoClient.connect('mongodb+srv://star-wars-quotes:app123@cluster0.wa9nr.mongodb.net/?retryWrites=true&w=majority', useUnifiedTopology: true, (err, client) =>
//   const db = client.db('simple-application')
//   console.log('Connected to data base')
// )


// promise version of the code above, using then and catch
// useUnifedTropology: true is to get rid of the depracation warning sign in terminal
MongoClient.connect(url, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('supermarketExpressList')
    const expressListCollection = db.collection('expressList')

    app.set('view engine', 'ejs')
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json())
    app.use(express.static('public'))

    //how it's grabbing the list of quotes from the database
  app.get('/', (req, res) => {
    db.collection('expressList').find().toArray()
    .then(results => {
        res.render('index.ejs', { expressList: results })
      })
      .catch(error => console.error(error))
  })

    //This inserts the added quote from the form, into the (this collection, insert one from req.body of the form request)
  app.post('/quotes', (req, res) => {
    expressListCollection.insertOne(req.body)
      .then(result => {
        res.redirect('/')
      })
      .catch(error => console.error(error))
  })

  app.put('/replace', (req, res) => {
    expressListCollection.findOneAndUpdate(
      { item: req.body.item },
      {
        $set: {
          item: req.body.updatedItem,
          note: req.body.note
        }
      },
      {
        upsert: false
      }
    )
      .then(result => res.json('Success'))
      .catch(error => console.error(error))
  })

  app.delete('/quotes', (req, res) => {
    expressListCollection.deleteOne(
      { name: req.body.name }
    )
    .then(result => {
      if (result.deletedCount === 0) {
        return res.json('No quote to delete')
      }
      res.json(`Deleted Darth Vadar's quote`)
    })
    .catch(error => console.error(error))
  })

  // app.delete('/quotes', (req, res) => {
  //   expressListCollection.findOneAndDelete(
  //     { item: req.body.item,

  //       name: req.body.name, 
  //       msg: req.body.msg 
  // }
  //   )
  //   .then(result => {
  //     if (result.deletedCount === 0) {
  //       return res.json('No quote to delete')
  //     }
  //     res.json(`Deleted Darth Vadar's quote`)
  //   })
  //   .catch(error => console.error(error))
  // })


  app.delete('/itemsAll', (req, res) => {
    expressListCollection.deleteMany(
      // when deleting all the data in the collection, you just have to leave the query blank..
    )
    .then(result => {
      if (result.deletedCount === 0) {
        return res.json('No quote to delete')
      }
      res.json(`Deleted Darth Vadar's quote`)
    })
    .catch(error => console.error(error))
  })


})