const mongoose = require('mongoose');

const weatherSchema = new mongoose.Schema({
    city: String,
    temperature: Number,
    description: String,
    icon: String,
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Weather', weatherSchema);
