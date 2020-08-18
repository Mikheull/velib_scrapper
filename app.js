const fs = require('fs');
const axios = require('axios');
const mkdirp = require('mkdirp')
const cron = require('node-cron');

let today, month, date, hour, minute, dir


/**
 * Création du dossier et sauvegarde des données
 */
cron.schedule('* * * * *', function(){

    today = new Date()
    month = `${today.getMonth() + 1}`.padStart(2, "0")
    date = today.getDate()
    hour = today.getHours() + 2
    minute = `${today.getMinutes()}`.padStart(2, "0")

    dir = `./data/${today.getFullYear()}`
    mkdirp(dir)

    axios({
        method: "get",
        url: "https://opendata.paris.fr/api/records/1.0/search/?dataset=velib-disponibilite-en-temps-reel&rows=1500",
        responseType: "stream"
    }).then(function (response) {
        // console.log(`Saved successfully at ${dir}/${date}_${month}__${hour}_${minute}.json`)
        response.data.pipe(fs.createWriteStream(`${dir}/${date}_${month}__${hour}_${minute}.json`));
    }).catch(err => {
        // console.log(err);
    });
});