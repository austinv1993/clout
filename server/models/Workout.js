var mongoose = require('mongoose');

var Workout = new mongoose.Schema({
	name: {type: String, required: true},
    workoutType: {type: String, required: true},
    exercises: [],
    equipment: [],
    level: {type: String, required: true},
    time: {
        hrs: String,
        mins: String,
        secs: String
    },
    description: {type: String, required: true}
})

module.exports = mongoose.model('Workout', Workout)