var app = angular.module('clout');

app.service('workoutCreationSrvc', ['$q', '$http', workoutCreationSrvc]);

function workoutCreationSrvc($q, $http) {
	
	this.addNewWorkout = function(newWorkout) {
		
		return $http.post('/api/', newWorkout)
			.then(function(response) {
				return "Workout Added";
			}, function(error) {
				console.log(error);
			});
	};
};