require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')

const app = express()

// midware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next() // runs next function
})
// routes
app.use('/api/workouts', workoutRoutes)

// connect to database
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('connected to db', process.env.PORT)
        })
    })
    .catch((error) => { // catches error if data base does not connect
        console.log(error) // prints the error to console 
    })


