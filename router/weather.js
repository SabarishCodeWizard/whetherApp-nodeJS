//router/weather.js

const express = require('express');
const router = express.Router();
const axios = require('axios');



router.get('/weather', async (req, res) => {
    try {
        const city = req.query.city;  // get the value 
        if (!city) return res.status(400).send({ error: "City is required" });

        const apiKey = process.env.API_KEY;
        // const apiKey = c4190f737623180b39c07793ebb27b34;
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        const response = await axios.get(url);
        const data = response.data;

        console.log(data.name);
        console.log(data.main.temp);
        console.log(data.weather[0].description);
        console.log(data.weather[0].icon);

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

module.exports = router;