const axios = require('axios');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config()

/**
 * Mongoose connection
 */
mongoose.connect(`mongodb+srv://${process.env.NOSQL_USER}:${process.env.NOSQL_PWD}@${process.env.NOSQL_HOST}/${process.env.NOSQL_TABLE}`);

var connection = mongoose.connection;

connection.on('error', console.error.bind(console, 'connection error:'));
connection.once('open', function () {

    connection.db.collection("velib", function(err, collection){
        collection.find({}).toArray(function(err, data){
            console.log(data); // it will print your collection data
        })
    });

});


/**
 * Récupérer les données d'une station
 */
// db.find().then(datas => {
//     console.log(datas);
// }).catch(err => {
//     console.log(err);
// });