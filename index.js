const express = require('express')
const app = express()
const port = 3300
const csv = require('csv-parser')
const fs = require('fs')
const { createPatient } = require('./api/controllers/patients')
const mongoose = require('mongoose');
mongoose.connect('URI', {useNewUrlParser: true, useUnifiedTopology: true}) //TODO change it to your URI DB mongo
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connected to mongoDB");
});

app.get('/', (req, res) => {
  getData(req,res);
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

function getData(req,res){
    let results = [];
    fs.createReadStream("data.csv")
        .pipe(csv())
        .on("data", (data)=> results.push(data))
        .on("end", ()=>{
            console.log("Entries:", results.length);
            results.forEach(patientInfo => {
                createPatient(patientInfo,res)
            });
            //res.send(results)
        })
}

