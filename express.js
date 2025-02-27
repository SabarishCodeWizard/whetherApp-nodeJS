const http = require('http');
const express = require('express');

const app = express();

app.use('/',(req,res,next) => {
    res.send('Hello World');
    console.log('First World');
    next();
})

app.use('/second',(req,res,next) => {
    // res.send('Hello World');
    console.log('Second World');
})

// const server = http.createServer(app);

// server.listen(3000,(req,res) => {
//     console.log('Server is running on http://localhost:3000');
// })


app.listen(3000,() => {console.log('Server is running on http://localhost:3000')})