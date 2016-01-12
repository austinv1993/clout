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

//WORKOUTS//
app.get('/api/workouts', WorkoutCtrl.allWorkouts);
app.post('/api/workouts', WorkoutCtrl.createWorkout);
app.get('/api/workout', WorkoutCtrl.findById);

//USERS//
app.post('/api/newuser', UserCtrl.createUser);
app.get('/api/userbyid', UserCtrl.getById);
app.get('/api/users', UserCtrl.getUsers);





mongoose.connect(mongooseUri);

require('./config/passport')(passport);

var apiRoutes = express.Router();

apiRoutes.post('/signup', function(req, res) {
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
});
app.use('/api', apiRoutes);
mongoose.connection.once('open', function() {
	console.log("Connected to MongoDB");
    
app.listen(port, function() {
console.log('listening on port', port); 
});
});