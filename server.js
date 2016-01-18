var express = require('express')
,	cors = require('cors')
,	mongoose = require('mongoose')
,	bodyParser = require('body-parser')
,   port = process.env.PORT || 8080
,   secret = require('./server/secret.js')
,   morgan = require('morgan')
,   passport = require('passport')
,   jwt = require('jwt-simple')
,   mongoose = require('mongoose')
,   User = require('./server/models/User.js')
,   mongooseUri = secret.mongooseUri
,   WorkoutCtrl = require('./server/controllers/WorkoutCtrl.js')
,   UserCtrl = require('./server/controllers/UserCtrl.js')
,   app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));
app.use(passport.initialize());
app.use(express.static(__dirname + './www'));


var apiRoutes = express.Router();
app.use('/api', apiRoutes);

//WORKOUTS//
apiRoutes.get('/workouts', WorkoutCtrl.allWorkouts); //used for
apiRoutes.post('/workouts', WorkoutCtrl.createWorkout);
apiRoutes.get('/workout', WorkoutCtrl.findById);

//USERS//

//PUT
apiRoutes.put('/mycreated', UserCtrl.pushCreated);
apiRoutes.put('/mycompleted', UserCtrl.pushCompleted);
apiRoutes.put('/myfavorites', UserCtrl.pushFavorites);

//GET
apiRoutes.get('/mycreated', UserCtrl.getCompleted)
apiRoutes.get('/mycompleted', UserCtrl.getCreated);
apiRoutes.get('/myfavorites', UserCtrl.getFavorites);





mongoose.connect(mongooseUri);

require('./config/passport')(passport);



apiRoutes.post('/signup', UserCtrl.signup);
apiRoutes.post('/authenticate', function(req, res) {
        User.findOne({
            username: req.body.username
        }, function(err, user) {
            if (err) throw err;
            if (!user) {
            res.send({success: false, msg: 'Authentication failed. User not found.'});
            } else {
            // check if password matches
            user.comparePassword(req.body.password, function (err, isMatch) {
                if (isMatch && !err) {
                    var token = jwt.encode(user, secret.secret); //not sure if this right

                    res.json({success: true, token: token, user: {username: user.username, id: user._id, email: user.email}});
                } else {
                    res.send({success: false, msg: 'Authentication failed. Wrong password.'});
                }
            });
            }
        });
    });
apiRoutes.get('/memberinfo', passport.authenticate('jwt', { session: false}), function(req, res) {
  console.log(req.headers);
  var token = getToken(req.headers);
  console.log(req.headers);
  if (token) {
    var decoded = jwt.decode(token, mongooseUri);
    User.findOne({
      name: decoded.name
    }, function(err, user) {
        if (err) throw err;
        if (!user) {
          return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
        } else {
          res.json({success: true, msg: 'Welcome in the member area ' + user.name + '!'});
        }
    });
  } else {
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }
});
var getToken = function (headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};

mongoose.connection.once('open', function() {
	console.log("Connected to MongoDB");

app.listen(port, function() {
console.log('listening on port', port);
});
});
