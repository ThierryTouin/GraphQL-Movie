const express = require('express');
const models = require('./models');
const expressGraphQL = require('express-graphql');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const schema = require('./schema/schema');

const app = express();

// Remplacer avec ton url mlab
//const MONGO_URI = 'mongodb://robinuser:robinuser@ds245347.mlab.com:45347/dbrobin001';
//const MONGO_URI = 'mongodb://admin:admin@cluster0-gzjcw.mongodb.net/test?retryWrites=true&w=majority';
//const MONGO_URI = 'mongodb://admin:admin@cluster0-rsha9.mongodb.net/test?retryWrites=true&w=majority';
const MONGO_URI = 'mongodb://admin:admin@127.0.0.1:27017/mongodb';
if (!MONGO_URI) {
  throw new Error('Tu dois fournir une url mongoDB');
}

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URI, 
{
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.connection
    .once('open', () => console.log('Connecté à MongoLab'))
    .on('error', error => console.log('Erreur de connexion à MongoLab:', error));

app.use(bodyParser.json());
app.use('/graphql', expressGraphQL({
  schema,
  graphiql: true,
}));

const webpackMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config.js');
app.use(webpackMiddleware(webpack(webpackConfig)));

module.exports = app;
