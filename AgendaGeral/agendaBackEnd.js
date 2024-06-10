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
        res.send(events)
    })
    .catch(function(err){
        res.status(500).send ({ message: "Error getting events", error: err})
    })
})

function populateDummyData() {
    const user = new events({
        "category":"DIDACTIC",
        "title":"X-Tense",
        "subtitle1":"Serralves Museum",
        "subtitle2":"Foz do Douro",
        "dateTime":{"time": "October 13, 2014 11:13:00", "duration":"2H"},
        "image": "Imagens\\imagensEventos\\evento 9.jpg",
        "localInfo": {"name": "Serralves Museum", "subname": "Rua D. João de Castro, 210", "email":"serralves@serralves.pt", "contact": "+351 226 156 500"},
        "eventInfo":"Our workshop o be creative together with your children from home. Suitable for children in the ages 6-12.",
        "datesInfo":{ "date1": "WEDNESDAY 10/04", "date2":"THURSDAY 11/04"}
    });

    user.save().then(function (doc) {
        console.log(doc._id.toString());
    }).catch(function (error) {
        console.log(error);
    });
}

app.listen(3000, function () {
    console.log('Server running on http://localhost:3000');
});

