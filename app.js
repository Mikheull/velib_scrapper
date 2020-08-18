const fs = require('fs');
const axios = require('axios');
const mkdirp = require('mkdirp')
const rimraf = require("rimraf");
const cron = require('node-cron');
const compressing = require('compressing');

/**
 * Création du dossier
 */
const now = new Date()
const dir = `./data/${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()}`
const backup_dir = `./backup/${now.getFullYear()}/${now.getMonth() + 1}`

mkdirp(dir)
mkdirp(backup_dir)


/**
 * Sauvegarde des données
 */
cron.schedule('*/30 * * * *', function(){
    axios({
        method: "get",
        url: "https://opendata.paris.fr/api/records/1.0/search/?dataset=velib-disponibilite-en-temps-reel&rows=1500",
        responseType: "stream"
    }).then(function (response) {
        response.data.pipe(fs.createWriteStream(`${dir}/${now.getHours() + 2}-${now.getMinutes()}.json`));
    });
});


/**
 * GZip les données de la journée et suppression du dossier dans data
 */
cron.schedule('59 23 * * *', function () { 
    compressing.tar.compressDir(dir, `${backup_dir}/${now.getDate()}.tar`)
    rimraf(dir, function () {});
})