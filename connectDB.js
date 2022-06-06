const chalk = require('chalk')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

const uri = `mongodb+srv://${process.env.USERID}:${process.env.PASSWORD}@cluster0.h68co.mongodb.net/?retryWrites=true&w=majority`;

const connectDB = () => {
    mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
        console.log(chalk.green.inverse("Connection to database successful!"))
    }).catch(err => {
        console.log(chalk.red.inverse("Connection to database failed! " + err.message))
    })
}

module.exports = connectDB