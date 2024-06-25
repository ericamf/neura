const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const bcrypt = require('bcrypt');
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


//OPERAÇÃO GET PARA OBTER EVENTS NA AGENDA SEGUNDO O DIA 
//+ EVENTOS FILTRADOS POR SUBTITLE PARA CONTA DE UTILIZADOR

app.get('/events', function (req, res) {
    let query = {};

    if (req.query.subtitle1) {
        query.subtitle1 = req.query.subtitle1;
    }

    event.find(query).then(function (events) {
        let querySet = events;

        const dateTime = req.query.dateTime;

        if (dateTime) {
            querySet = querySet.filter((event) => {
                return new Date(event.dateTime.time).getDate() === new Date(dateTime).getDate() &&
                    new Date(event.dateTime.time).getMonth() === new Date(dateTime).getMonth() &&
                    new Date(event.dateTime.time).getFullYear() === new Date(dateTime).getFullYear();
            });
        }

        res.send(querySet);
    })
    .catch(function (err) {
        res.status(500).send({ message: "Error getting events", error: err });
    });
});


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
    console.log('Conectado ao MongoDB - Login');
});

userConnection.on('error', (err) => {
    console.error('Erro ao conectar ao MongoDB - Login:', err);
});

// SCHEMA E MODEL DE USER
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    name: String,
    country: String,
    city: String
});

// DEFINIR SENHA COM BCRYPT
userSchema.methods.setPassword = async function(password) {
    const saltRounds = 10;
    this.passwordHash = await bcrypt.hash(password, saltRounds);
};

// VERIFICAR SENHA
async function checkPassword(password, userPassword) {
    console.log(password, userPassword)
    return await bcrypt.compare(password, userPassword);
};

const User = userConnection.model('User', userSchema);

// REGISTAR NOVO USER
app.post('/users/register', async (req, res) => {
    const { name, password, username, country, city } = req.body;

    try {
        const newUser = new User({ name, password, username, country, city });
        await newUser.setPassword(password); // DEFINIR SENHA COM BCRYPT

        await newUser.save();
        res.status(201).send('Usuário registrado com sucesso');
    } catch (err) {
        console.error('Erro ao registrar usuário:', err);
        res.status(500).send('Erro ao registrar usuário: ' + err);
    }
});

// ROTA PARA AUTENTICAR USER (LOG IN)
app.post('/users/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).send('Usuário não encontrado');
        }
        
        const isPasswordValid = await checkPassword(password, user.passwordHash);
        console.log("projeto");
        if (!isPasswordValid) {
            return res.status(401).send('Senha incorreta');
        }

        res.status(200).send('Login bem-sucedido');
    } catch (err) {
        console.error('Erro ao autenticar usuário:', err);
        res.status(500).send('Erro ao autenticar usuário: ' + err);
    }
});


app.listen(3000, function () {
    console.log('Server running on http://localhost:3000');
});



// CONEXÃO À DATABSE 'HOME' E COLLETION CARDS
const cardUri = "mongodb+srv://40230045:neura@neuraagendacultural.yqgw2ak.mongodb.net/HomePage?retryWrites=true&w=majority&appName=NeuraHomePage";

const cardConnection = mongoose.createConnection(cardUri);

cardConnection.on('connected', () => {
    console.log('Connected to MongoDB - HomePage');
});

cardConnection.on('error', (err) => {
    console.log('Error connecting to MongoDB - HomePage', err);
});

// MODELS E SCHEMAS DE CARDS NA HOMEPAGE
const cardSchema = new mongoose.Schema({
    category: String,
    title: String,
    subtitle1: String,
    subtitle2: String,
    dateTime: Object,
    image: String,
    localInfo: Object,
    eventInfo: String,
    datesInfo: Object
});

const card = cardConnection.model('Card', cardSchema);

// OPERAÇÃO GET PARA RETORNAR OS CARDS PARA TODAY E TOMORROW NA HOMEPAGE

app.get('/cards', function(req, res){
    card.find()
    .then(function(cards){
        res.send(cards);
    })
    .catch(function (err){
        res.status(500).send({ message: "Error getting cards", error: err });
    });
});


//OPERAÇÃO DELETE PARA APAGAR EVENTOS COLLECTION EVENTS MAS NÃO NA PAGINA AGENDA MAS SIM NA PAGINA DE ADMNISTRADOR
// Rota para deletar um evento
app.delete('/events/:id', function (req, res) {
    const eventId = req.params.id;
    console.log('Deleting event with id:', eventId);

    event.findByIdAndDelete(eventId)
    .then(() => res.status(200).send({ message: 'Event deleted successfully' }))
    .catch(err => {
        console.error('Error deleting event:', err);
        res.status(500).send({ message: 'Error deleting event', error: err });
    });
});