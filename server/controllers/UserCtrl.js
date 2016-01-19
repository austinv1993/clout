var User = require('../models/User.js');

module.exports = {
    // createUser: function(req, res) {
    //     new User(req.body).save(function(err, user) {
    //         if (err) {
    //             res.send(err);
    //         } else {
    //             res.send(user);
    //         }
    //     })
    // },
    // getById: function(req, res) {
    //     User.findById(req.query.userId, function(err, user) {
    //         if (err) {
    //             res.send(err);
    //         } else {
    //             res.send(user);
    //         }
    //     })
    // },
    // getUsers: function(req, res) {
    //     User.find({}, function(err, users) {
    //         if (err) {
    //             res.send(err)
    //         } else {
    //             res.send(users);
    //         }
    //     })
    // },
    signup: function(req, res) {
        if (!req.body.username || !req.body.password) {
            res.json({success: false, msg: 'Please pass name and password.'});
        } else {
            var newUser = new User({
                username: req.body.username,
                password: req.body.password,
                email: req.body.email
            });
            newUser.save(function(err) {
                if (err) {
                    return res.json({success: false, msg: 'Username already exists.'});
                }
                res.json({success: true, msg: 'Successfully created new user.'});
            });
        }
    },
    pushCreated: function(req, res) {
        User.findByIdAndUpdate(req.body.userId, {$push: {createdWorkouts: req.body.workoutId}}, function(err, workout) {
            if (err) {
                res.send(err);
            } else {
                res.send(workout);
            }
        })
    },
    pushCompleted: function(req, res) {
        User.findByIdAndUpdate(req.body.userId, {$push: {completedWorkouts: req.body.workoutId}}, function(err, workout) {
            if (err) {
                res.send(err);
            } else {
                res.send(workout);
            }
        })
    },
    pushFavorites: function(req, res) {
        User.findByIdAndUpdate(req.body.userId, {$push: {favoriteWorkouts: req.body.workoutId}}, function(err, workout) {
            if (err) {
                res.send(err);
            } else {
                res.send(workout);
            }
        })
    },
    getCompleted: function(req, res) {
        User.findById(req.query.userId).populate('completedWorkouts').exec(function(err, userObj) {
            if (err) {
                res.send(err);
            } else {
                res.send(userObj.completedWorkouts);
            }
        })
    },
    getCreated: function(req, res) {
        User.findById(req.query.userId).populate('createdWorkouts').exec(function(err, userObj) {
            if (err) {
                res.send(err);
            } else {
                res.send(userObj.createdWorkouts);
            }
        })
    },
    getFavorites: function(req, res) {
        User.findById(req.query.userId).populate('favoriteWorkouts').exec(function(err, userObj) {
            if (err) {
                res.send(err);
            } else {
                res.send(userObj.favoriteWorkouts);
            }
        })
    },
	removeFavorite: function(req, res) {
		User.findByIdAndUpdate(req.params.userId, { $pullAll: { favoriteWorkouts : [ req.body.workoutId ]}}, function(err, favorite) {
			if(err) {
				res.send(err);
			} else {
				res.send(favorite);
			}
		})
	}

    // authenticate: function(req, res) {
    //     User.findOne({
    //         name: req.body.name
    //     }, function(err, user) {
    //         if (err) throw err;

    //         if (!user) {
    //         res.send({success: false, msg: 'Authentication failed. User not found.'});
    //         } else {
    //         // check if password matches
    //         user.comparePassword(req.body.password, function (err, isMatch) {
    //             if (isMatch && !err) {
    //             // if user is found and password is right create a token
    //             var token = jwt.encode(user, mongooseUri); //not sure if this right
    //             // return the information including token as JSON
    //             res.json({success: true, token: 'JWT ' + token});
    //             } else {
    //             res.send({success: false, msg: 'Authentication failed. Wrong password.'});
    //             }
    //         });
    //         }
    //     });
    // }


};
