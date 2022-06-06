const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())

const reportRoutes = require('./routes/reportRoutes')
const connectDB = require('./connectDB')

connectDB()

app.use('/reports', reportRoutes)

module.exports = app;