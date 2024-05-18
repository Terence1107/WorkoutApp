/* basically workout class */
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const workoutSchema = new Schema({ // First argument
    // first argument describes how object looks
    title: { // title object
        type: String,
        required: true
    },
    reps: {
        type: Number,
        required: true
    },
    load: {
        type: Number,
        required: true
    }
}, { timestamps: true}) // second argument adds a time stamp when a new document is made

module.exports = mongoose.model('Workout', workoutSchema) // Creates a model 
