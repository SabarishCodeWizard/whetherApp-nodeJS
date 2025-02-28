const express = require('express');
const router = express.Router();
const axios = require('axios');
const Weather = require('../models/Weather');

router.get('/weather', async (req, res) => {
    try {
        const city = req.query.city;
        if (!city) return res.status(400).send({ error: "City is required" });

        const apiKey = process.env.API_KEY;
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        const response = await axios.get(url);
        const data = response.data;

        const weatherData = {
            city: data.name,
            temperature: data.main.temp,
            description: data.weather[0].description,
            icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`
        };

        // console.log(weatherData);

        
        const newWeather = new Weather(weatherData);
        await newWeather.save();

        res.json(weatherData);
    } catch (error) {
        res.status(500).send({ error: "Unable to fetch weather data" });
    }
});

module.exports = router;
