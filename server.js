//server.js

require('dotenv').config();
// const http = require('http');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
// const axios = require('axios');



const app = express();
const PORT = 8000;

// console.log(path.join(__dirname, 'public'));
// console.log(__dirname)
// console.log(__filename)
// console.log(path.dirname(__filename))



// Import routers after Firebase is initialized
const weatherRouter = require('./router/weather.js');

app.use(express.static(path.join(__dirname, 'public'))); // middleware to access a static files
app.use(cors()); // cross origin resource sharing
app.use(bodyParser.json()); // middleware to parse the body of the request



app.use(weatherRouter);
// app.use('/admin', wheatherRouter);




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