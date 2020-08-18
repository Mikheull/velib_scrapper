const fs = require('fs');
const axios = require('axios');
const mkdirp = require('mkdirp')
const cron = require('node-cron');

/**
 * Création du dossier
 */
const today = new Date()
const month = `${today.getMonth() + 1}`.padStart(2, "0")
const date = today.getDate()
const hour = today.getHours() + 2
const minute = `${today.getMinutes()}`.padStart(2, "0")

const dir = `./data/${today.getFullYear()}`
mkdirp(dir)


/**
 * Sauvegarde des données
 */
cron.schedule('* * * * *', function(){
    axios({
        method: "get",
        url: "https://opendata.paris.fr/api/records/1.0/search/?dataset=velib-disponibilite-en-temps-reel&rows=1500",
        responseType: "stream"
    }).then(function (response) {
        response.data.pipe(fs.createWriteStream(`${dir}/${date}_${month}__${hour}_${minute}.json`));
    });
});
