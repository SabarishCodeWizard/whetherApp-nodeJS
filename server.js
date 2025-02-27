require('dotenv').config();
const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = 8000;

// console.log(path.join(__dirname, 'public'));
// console.log(__dirname)
// console.log(__filename)
// console.log(path.dirname(__filename))

app.use(express.static(path.join(__dirname, 'public')));


app.get('/weather', async (req, res) => {
    try {
        const city = req.query.city;
        if (!city) return res.status(400).send({ error: "City is required" });

        // const apiKey = process.env.API_KEY;
        const apiKey = c4190f737623180b39c07793ebb27b34;
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        const response = await axios.get(url);
        const data = response.data;

        res.json({
            city: data.name,
            temperature: data.main.temp,
            description: data.weather[0].description,
            icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`
        });
    } catch (error) {
        res.status(500).send({ error: "Unable to fetch weather data" });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
