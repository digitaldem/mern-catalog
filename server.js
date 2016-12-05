var express = require('express');
var mongodb = require('mongodb');
var cors = require('cors')
var bodyParser = require('body-parser');
var path = require('path');
var webpack = require('webpack');
var config = require('./webpack.config');

var app = express();
var compiler = webpack(config);
var port = process.env.PORT || 8080;
var crossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,PATCH,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
}

app.use('/images', express.static('images'));
app.use('/mocks', express.static('mocks'));
app.use('/styles', express.static('styles'));
app.use('/fonts', express.static('fonts'));
app.use(cors());
app.use(bodyParser.json());
app.use(require('webpack-dev-middleware')(compiler, { noInfo: true, publicPath: config.output.publicPath }));
app.use(require('webpack-hot-middleware')(compiler));


app.get('/api/items.json', function(req, res) {
  var query = {
    active: true
  };
  var options = {
    limit: req.query.limit || 50,
    skip: req.query.offset || 0,
    sort: [[(req.query.sortkey || 'name'), (req.query.sortdir || 1)]],
    fields: { _id: 1, name: 1 }
  }

  db.collection('items').count(query, function(err, count) {
    db.collection('items').find(query, options).toArray(function(err, docs) {
      res.json({ totalCount: count, results: docs });
    });
  });
});

app.post('/api/items.json', function(req, res) {
  var item = req.body;
  item.active = true;

  db.collection('items').insertOne(item, function(err, result) {
    db.collection('items').findOne({ _id: result.insertedId }, function(err, doc) {
      res.json({ totalCount: 1, results: [doc] });
    });
  });
});

app.get('/api/items/:id.json', function(req, res) {
  var query = {
    _id: mongodb.ObjectId(req.params.id)
  };

  db.collection('items').findOne(query, function(err, doc) {
    res.json({ totalCount: 1, results: [doc] });
  });
});

app.delete('/api/items/:id.json', function(req, res) {
  var query = {
    _id: mongodb.ObjectId(req.params.id)
  };

  db.collection('items').updateOne(query, { $set: { active: false } }, function(err, result) {
    res.json({ totalCount: 0, results: [] });
  });
});

app.put('/api/items/:id.json', function(req, res) {
  var query = {
    _id: mongodb.ObjectId(req.params.id)
  };
  var item = req.body;

  db.collection('items').replaceOne(query, item, function(err, result) {
    db.collection('items').findOne(query, function(err, doc) {
      res.json({ totalCount: 1, results: [doc] });
    });
  });
});

app.patch('/api/items/:id.json', function(req, res) {
  var query = {
    _id: mongodb.ObjectId(req.params.id)
  };
  var item = req.body;

  db.collection('items').updateOne(query, { $set: item }, function(err, result) {
    db.collection('items').findOne(query, function(err, doc) {
      res.json({ totalCount: 1, results: [doc] });
    });
  });
});

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});


mongodb.MongoClient.connect('mongodb://localhost/catalog', function(err, dbConnection) {
  db = dbConnection;

  app.listen(port, 'localhost', function (err) {
    if (err) {
      console.log(err);
      return;
    }
    console.log('Listening at http://localhost:' + port);
  });
});
