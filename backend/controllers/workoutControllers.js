const Workout = require('../models/Workouts')
const mongoose = require('mongoose')
/* gets all workouts in the most recent order */
const getWorkouts = async(req, res) => {
    const workouts = await Workout.find({}).sort({createdAt: -1}) //"{ reps: 20}" finds all workouts with 20 reps, "{}" is everything

    res.status(200).json(workouts)
}
/* gets a single workout */
const getWorkout = async(req, res) => {
    const {id} = req.params // grabs the id property from the workout parameters

    if(!mongoose.Types.ObjectId.isValid(id)){ // checks if the id is valid for mongoose
        return res.status(404).json({error: "No such workout"})
    }

    const workout = await Workout.findById(id)

    if(!workout) {
        return res.status(404).json({error: "No such workout"})
    }

    res.status(200).json(workout)
}

/* creates a workout */
const createWorkout = async(req, res) => {
    const {title, load, reps} = req.body // grab the 3 properties from the body

    let emptyFields = []

    if(!title) {
        emptyFields.push('title')
    }
    if(!load) {
        emptyFields.push('load')
    }
    if(!reps) {
        emptyFields.push('reps')
    }
    
    if(emptyFields.length > 0) {
        return res.status(400).json({error: 'Not all fields are filled in', emptyFields})
    }

    //add to database
    try{
        const workout = await Workout.create({title, load, reps})
        res.status(200).json(workout)
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

/* delete a workout */
const deleteWorkout = async(req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such workout"})
    }

    const workout = await Workout.findOneAndDelete({_id: id}) // _id is the property name for ids in mongodb

    if(!workout) {
        return res.status(404).json({error: "No such workout"})
    }

    res.status(200).json(workout)
}

/* update workout */
const updateWorkout = async(req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such workout"})
    }
    const workout = await Workout.findOneAndUpdate({_id: id}, {
        ...req.body // spreads the properties into their respective locations(title, reps, load)
    })

    if (!workout) {
        return res.status(400).json({error: 'No such workout'})
    }

    res.status(200).json(workout)
}

module.exports = {
    createWorkout, getWorkouts, getWorkout, deleteWorkout, updateWorkout
}