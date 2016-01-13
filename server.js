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
apiRoutes.get('/workouts', WorkoutCtrl.allWorkouts);
app.post('/workouts', WorkoutCtrl.createWorkout);
app.get('/workout', WorkoutCtrl.findById);

//USERS//
app.post('/newuser', UserCtrl.createUser);
app.get('/userbyid', UserCtrl.getById);
app.get('/users', UserCtrl.getUsers);





mongoose.connect(mongooseUri);

require('./config/passport')(passport);



apiRoutes.post('/signup', UserCtrl.signup);
apiRoutes.post('/authenticate', UserCtrl.authenticate);
apiRoutes.get('/memberinfo', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
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