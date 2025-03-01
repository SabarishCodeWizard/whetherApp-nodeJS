//server.js

require('dotenv').config();
// const http = require('http');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
// const axios = require('axios');
const mongoose = require('mongoose');


const app = express();
const PORT = 8000;

// console.log(path.join(__dirname, 'public'));
// console.log(__dirname)
// console.log(__filename)
// console.log(path.dirname(__filename))




mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,  // This option tells Mongoose to use the new URL parser instead of the old one.
    useUnifiedTopology: true // Prevents connection issues in some cases.
}).then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));



const weatherRouter = require('./routes/weather.js');
const authRoutes = require('./routes/auth');

// app.use(express.static(path.join(__dirname, 'public'))); // middleware to access a static files
app.use(cors()); // cross origin resource sharing
app.use(bodyParser.json()); // middleware to parse the body of the request

// Session Middleware (for authentication)
app.use(session({
    secret: process.env.SESSION_SECRET || 'mysecret',
    resave: false,
    saveUninitialized: false
}));


app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'register.html'));
});


app.get('/', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/guest', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html')); 
});

app.get('/package', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login');
    }
    res.sendFile(path.join(__dirname, 'public', 'package.html')); 
});


app.use('/auth', authRoutes);

// app.use('/admin', weatherRouter);
app.use(weatherRouter);





// TODO:
// app.get('/weather', async (req, res) => {
//     try {
//         const city = req.query.city;  // get the value 
//         if (!city) return res.status(400).send({ error: "City is required" });

//         const apiKey = process.env.API_KEY;
//         // const apiKey = c4190f737623180b39c07793ebb27b34;
//         const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

//         const response = await axios.get(url);
//         const data = response.data;

//         console.log(data.name);
//         console.log(data.main.temp);
//         console.log(data.weather[0].description);
//         console.log(data.weather[0].icon);

//         res.json({
//             city: data.name,
//             temperature: data.main.temp,
//             description: data.weather[0].description,
//             icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`
//         });
//     } catch (error) {
//         res.status(500).send({ error: "Unable to fetch weather data" });
//     }
// });



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// FIXME:
// const server = http.createServer(app);

// server.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// }