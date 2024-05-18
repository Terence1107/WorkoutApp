const express = require('express')
// importing functions from another file 
const {
    createWorkout, getWorkouts, getWorkout, deleteWorkout, updateWorkout
} = require('../controllers/workoutControllers')

const router = express.Router()
/*gets all workouts */
router.get('/', getWorkouts)

/*gets a workout */
router.get('/:id', getWorkout)

/*creates a workout */
router.post('/', createWorkout) // references the createWorkout func

/*delete a workout */
router.delete('/:id', deleteWorkout)

/*updates a workout */
router.patch('/:id', updateWorkout)

module.exports = router