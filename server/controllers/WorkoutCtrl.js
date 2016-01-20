var Workout = require('../models/Workout.js');

module.exports = {
    createWorkout: function (req, res) {
        new Workout(req.body).save(function (err, workout) {
            if (err) {
                res.send(err);
            } else {
                res.send(workout);
            };
        });
    },
    allWorkouts: function (req, res) {
        console.log('body type:', req.query.workoutType);
        var workouts;
        if (req.query.workoutType) {
            workouts = Workout.find({
                workoutType: req.query.workoutType
            });
        } else {
            workouts = Workout.find();
        }

        workouts
            .skip(req.query.offset)
            .limit(req.query.count)
            .exec(function (err, workouts) {
                if (err) res.send(err);
                else {
                    res.send(workouts);
                };
            });
    },
    findById: function (req, res) {
        Workout.findById(req.query.workoutId, function (err, workout) {
            if (err) {
                res.send(err);
            } else {
                res.send(workout);
            };
        });
    },
    filterBy: function (req, res) {
        Workout.find({
            workoutType: req.query.value
        }, function (err, workouts) {
            if (err) {
                res.send(err);
            } else {
                res.send(workouts);
            };
        });
    }

};