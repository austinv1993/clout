var app = angular.module('clout');

app.service('workoutCreationSrvc', ['$q', '$http', workoutCreationSrvc]);

function workoutCreationSrvc($q, $http) {

	this.addNewWorkout = function(newWorkout) {

		return $http.post('http://localhost:8080/api/workouts', newWorkout)
			.then(function(response) {
				console.log(newWorkout);
				return "Workout Added";
			}, function(error) {
				console.log(error);
			});
	};
};
