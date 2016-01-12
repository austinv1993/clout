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
    }
    
};