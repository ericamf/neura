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


//MODELS E SCHEMAS DE EVENTS PARA AGENDA//

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


//OPERAÇÃO GET PARA OBTER EVENTS NA AGENDA SEGUNDO O DIA//

app.get('/events', function (req, res) {    

    event.find().then(function (events) {
        let querySet = events;

        const dateTime = req.query.dateTime

        if(dateTime) {
            querySet = querySet.filter((event) => new Date(event.dateTime.time).getDate() === new Date(dateTime).getDate())
        }

        res.send(querySet)
    })
    .catch(function(err){
        res.status(500).send ({ message: "Error getting events", error: err})
    })
})


// CONEXÃO À DATABSE 'LOGIN' E COLLETION USERS
const userUri = "mongodb+srv://40230045:neura@neuraagendacultural.yqgw2ak.mongodb.net/LogIn?retryWrites=true&w=majority&appName=NeuraLogIn";

const userConnection = mongoose.createConnection(userUri);

userConnection.on('connected', () => {
    console.log('Connected to MongoDB - LogIn');
});

userConnection.on('error', (err) => {
    console.log('Error connecting to MongoDB - LogIn', err);
});

// MODELS E SCHEMAS DE USERS PARA LOGIN

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    username: String,
    country: String,
    city: String
});

const User = userConnection.model('User', userSchema);

// OPERAÇÃO POST PARA ENVIAR DADOS PARA A BASE DE DADOS

app.post('/users', (req, res) => {
    const { firstName, lastName, username, country, city } = req.body;

    const newUser = new User({ firstName, lastName, username, country, city });

    newUser.save()
        .then(() => res.status(201).send('Dados enviados com sucesso'))
        .catch((err) => res.status(500).send('Erro ao salvar dados: ' + err));
});


app.listen(3000, function () {
    console.log('Server running on http://localhost:3000');
});

