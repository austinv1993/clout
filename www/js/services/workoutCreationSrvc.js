angular.service('workoutCreationSrvc', ['$q', '$http', workoutCreationCtrl]);

function workoutCreationSrvc($q, $http) {
	
	this.addNewWorkout = function(newWorkout) {
		
		return $http.post('/api/', newWorkout)
			.then(function(response) {
				
				return "Workout Added";
			}, function(error) {
				
				return error;
			});
	};
};