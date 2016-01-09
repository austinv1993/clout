var app = angular.module('clout');

app.service('workoutCreationSrvc', ['$q', '$http', workoutCreationSrvc]);

function workoutCreationSrvc($q, $http) {

	this.addNewWorkout = function(newWorkout) {

		return $http.post('https://blooming-shore-7771.herokuapp.com/api/workouts', newWorkout)
			.then(function(response) {
				console.log(newWorkout);
				return "Workout Added";
			}, function(error) {
				console.log(error);
			});
	};
	
	this.startTimer = function(newWorkout) {
		
		
	}
};
