var app = angular.module('clout');

app.service('workoutCreationSrvc', ['$q', '$http', workoutCreationSrvc]);

function workoutCreationSrvc($q, $http) {

	this.addNewWorkout = function(newWorkout) {

		return $http.post('http://localhost:8080/api/workouts', newWorkout)
			.then(function(response) {
				console.log('this is workout from server after creation', response.data);
				return response.data;
			}, function(error) {
				console.log(error);
			});
	};
};
