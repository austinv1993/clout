var express = require('express')
,	cors = require('cors')
,	mongoose = require('mongoose')
,	bodyParser = require('body-parser')
,   port = process.env.PORT || 3000
,   secret = require('./server/secret.js')
,   mongoose = require('mongoose')
,   mongooseUri = secret.mongooseUri
,   WorkoutCtrl = require('./server/controllers/WorkoutCtrl.js')
,   UserCtrl = require('./server/controllers/UserCtrl.js')
,   app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname + '/www'));

//WORKOUTS//
app.get('/api/workouts', WorkoutCtrl.allWorkouts);
app.post('/api/workouts', WorkoutCtrl.createWorkout);
app.get('/api/workout', WorkoutCtrl.findById);

//USERS//
app.post('/api/newuser', UserCtrl.createUser);
app.get('/api/userbyid', UserCtrl.getById);
app.get('/api/users', UserCtrl.getUsers);




app.listen(port, function() {
   console.log('listening on port', port); 
});
mongoose.connect(mongooseUri);
mongoose.connection.once('open', function() {
	console.log("Connected to MongoDB");
});