var User = require('../models/User.js');

module.exports = {
    createUser: function(req, res) {
        new User(req.body).save(function(err, user) {
            if (err) {
                res.send(err);
            } else {
                res.send(user);
            }
        })
    },
    getById: function(req, res) {
        User.findById(req.query.userId, function(err, user) {
            if (err) {
                res.send(err);
            } else {
                res.send(user);
            }
        })
    },
    getUsers: function(req, res) {
        User.find({}, function(err, users) {
            if (err) {
                res.send(err)
            } else {
                res.send(users);
            }
        })
    },
    signup: function(req, res) {
        if (!req.body.name || !req.body.password) {
            res.json({success: false, msg: 'Please pass name and password.'});
        } else {
            var newUser = new User({
                name: req.body.name,
                password: req.body.password
            });
            newUser.save(function(err) {
                if (err) {
                    return res.json({success: false, msg: 'Username already exists.'});
                }
                res.json({success: true, msg: 'Successfully created new user.'});
            });
        }
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