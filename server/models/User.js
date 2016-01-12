var mongoose = require('mongoose');

var User = new mongoose.Schema({
    type: {type: String, default: 'User', required: true},
    name: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true},
    favoriteWorkouts: [{type: mongoose.Schema.Types.ObjectId, ref:'Workout'}],
    createdWorkouts: [{type: mongoose.Schema.Types.ObjectId, ref:'Workout'}],
    
})

module.exports = mongoose.model('User', User);