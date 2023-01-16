require("dotenv").config();
bodyParser = require("body-parser");

const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

const user = require('./src/routes/user')
const webhook = require('./src/routes/webhook')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json()) // Used to take data from user end

app.use('/user', user)
app.use('/wp', webhook)


app.get('/', (req, res) => {
    res.json({ Message: "This is Index Page. Develop By Dipu Singh" })
})

app.all('*', (req, res) => {
    res.json({ status: 404, Message: "Page Not Found" })
})

app.listen(PORT, () => {
    console.log("Working on "+ PORT)
})