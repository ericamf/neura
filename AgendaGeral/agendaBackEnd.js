const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const app = express();



app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const uri = "mongodb+srv://40230045:neura@neuraagendacultural.yqgw2ak.mongodb.net/Agenda?retryWrites=true&w=majority&appName=NeuraAgendaCultural";

mongoose.connect(uri)
.then(function () {
    console.log('Connected to MongoDB');
})
.catch(function (err) {
    console.log('Error connecting to MongoDB', err);
});


// Configurar Multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });


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
            querySet = querySet.filter((event) => { 
                return new Date(event.dateTime.time).getDate() === new Date(dateTime).getDate() &&
                new Date(event.dateTime.time).getMonth() === new Date(dateTime).getMonth() &&
                new Date(event.dateTime.time).getFullYear() === new Date(dateTime).getFullYear()
            })
        }

        res.send(querySet)
    })
    .catch(function(err){
        res.status(500).send ({ message: "Error getting events", error: err})
    })
})



// OPERAÇÃO POST PARA ADICIONAR UM EVENTO //
app.post('/events', upload.single('image'), (req, res) => {
    console.log('Dados recebidos no backend:', req.body);
    const { category, title, subtitle1, subtitle2, dateTime, localInfo, eventInfo, datesInfo } = req.body;
    const imagePath = req.file.path.replace('public\\', '');
    console.log(imagePath)
    const newEvent = new event({
        category,
        title,
        subtitle1,
        subtitle2,
        dateTime: JSON.parse(dateTime), // Convertendo string para objeto
        image: imagePath,
        localInfo: JSON.parse(localInfo), // Convertendo string para objeto
        eventInfo,
        datesInfo: JSON.parse(datesInfo) // Convertendo string para objeto
    })
    
    newEvent.save().then(() => res.status(201).send('Event added successfully'))
        .catch((err) => res.status(500).send('Error saving event: ' + err));
});




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

