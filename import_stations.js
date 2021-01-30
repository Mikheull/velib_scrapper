const axios = require('axios');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config()

/**
 * Mongoose connection
 */
const host = `mongodb+srv://${process.env.NOSQL_USER}:${process.env.NOSQL_PWD}@${process.env.NOSQL_HOST}/${process.env.NOSQL_TABLE}`
const connect = mongoose.createConnection(host, { useNewUrlParser: true, useUnifiedTopology: true })
const db = connect.collection('stations');


/**
 * Sauvegarde des données
 */
axios.get('https://opendata.paris.fr/api/records/1.0/search/?dataset=velib-emplacement-des-stations&rows=1500')
.then(function (response) {

    db.insertMany(response.data.records, function(err,result) {
        if (err) {
        console.log(err);
        }else{
            console.log(result);
        }
    });

}).catch(err => {
    console.log(err);
});
