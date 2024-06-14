const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const uri = "mongodb+srv://40230045:neura@neuraagendacultural.yqgw2ak.mongodb.net/Agenda?retryWrites=true&w=majority&appName=NeuraAgendaCultural";

mongoose.connect(uri)
.then(function () {
    console.log('Connected to MongoDB');
})
.catch(function (err) {
    console.log('Error connecting to MongoDB', err);
});


//MODELS E SCHEMAS DAS COLLETIONS DA BASE DE DADOS DIA 1 DE ABRIL//

const eventSchema = new mongoose.Schema({
    category: String,
    title: String,
    subtitle1: String,
    subtitle2: String,
    dateTime: Object,
    image: String,
    localInfo: Object,
    eventInfo: String,
    datesInfo: Object
})

const event = mongoose.model('Event', eventSchema);

//OPERAÇÃO GET PARA COLLETION EVENTOS DE MANHÃ DIA 1 DE ABRIL//

app.get('/events', function (req, res) {    

    event.find().then(function (events) {
        let querySet = events;

        const dateTime = req.query.dateTime
        const category = req.query.category

        if(dateTime) {
            querySet = querySet.filter((event) => new Date(event.dateTime.time).getDate() === new Date(dateTime).getDate())
        }

        res.send(querySet)
    })
    .catch(function(err){
        res.status(500).send ({ message: "Error getting events", error: err})
    })
})

//app.get('/events', function (req, res) {

 
//})


app.listen(3000, function () {
    console.log('Server running on http://localhost:3000');
});

