var app = angular.module('clout');

app.controller('workoutCreationCtrl', ['$scope', '$state', '$stateParams', 'workoutCreationSrvc', workoutCreationCtrl]);

	function workoutCreationCtrl($scope, $state, $stateParams, workoutCreationSrvc) {

		$scope.newExercise = {};

		$scope.workout = {};

		$scope.exercises = [];

		$scope.addNewExercise = function() {

			if($scope.workout.type === "interval") {
				
				if(!$scope.newExercise.name || !$scope.newExercise.mins || !$scope.newExercise.secs) {
					alert("Please enter exercise information");
				}
				else {
					$scope.exercises.push($scope.newExercise.name);
					$scope.exercises.push($scope.newExercise.mins);
					$scope.exercises.push($scope.newExercise.secs);
					console.log($scope.exercises);
					$scope.newExercise = {};
				}
			}
			
			if($scope.workout.type === "reps") {
				
				if(!$scope.newExercise.name || !$scope.newExercise.reps || !$scope.newExercise.sets) {
					alert("Please enter exercise information");
				}
				else {
					$scope.exercises.push($scope.newExercise.name);
					$scope.exercises.push($scope.newExercise.reps);
					$scope.exercises.push($scope.newExercise.sets);
					console.log($scope.exercises);
					$scope.newExercise = {};
				}
			}
		};

		$scope.deleteExercise = function(array, index) {

			$scope.exercises = {};
		};

		$scope.newEquipment = {};

		$scope.equipments = [];

		$scope.addNewEquipment = function() {

			if(!$scope.newEquipment.text) {
				alert("Please enter equipment");
			}
			else {
				$scope.equipments.push($scope.newEquipment.text);
				$scope.newEquipment = {};
			}
		};

		$scope.deleteEquipment = function(array, index) {

			array.splice(index, 1);
		};

		$scope.reps = false;

		$scope.interval = false;

		$scope.workoutType = function() {
			if($scope.workout.type === "reps") {
				$scope.reps = true;
				$scope.interval = false;
			}
			if($scope.workout.type === "interval") {
				$scope.interval = true;
				$scope.reps = false;
			}
		};

		$scope.errorMessages = [];

		$scope.postNewWorkout = function() {

			$scope.workoutTime = {
				mins: $scope.workout.mins,
				secs: $scope.workout.secs
			};

			$scope.workoutReps = {
				reps: $scope.workout.reps,
				sets: $scope.workout.sets
			};

			$scope.newWorkout = {
				name: $scope.workout.name,
				workoutType: $scope.workout.type,
				exercises: $scope.exercises,
				equipment: $scope.equipments,
				level: $scope.workout.level,
				time: $scope.workoutTime,
				reps: $scope.workoutReps,
				description: $scope.workout.description
			};

			if(!$scope.workout.name) {
				$scope.errorMessages.push(" name");
			}
			if(!$scope.workout.type) {
				$scope.errorMessages.push(" type");
			}
			if($scope.exercises.length === 0) {
				$scope.errorMessages.push(" exercises");
			}
			if($scope.equipments.length === 0) {
				$scope.errorMessages.push(" equipment");
			}
			if(!$scope.workout.level) {
				$scope.errorMessages.push(" level");
			}
			if($scope.workout.type === "interval") {
				if(!$scope.workoutTime) {
					$scope.errorMessages.push(" estimated time");
				}
			}
			if($scope.workout.type === "reps") {
				if(!$scope.workoutReps) {
					$scope.errorMessages.push(" reps/sets");
				}
			}

			if(!$scope.workout.description) {
				$scope.errorMessages.push(" description");
			}

			if($scope.errorMessages.length > 0) {
				alert("The following are missing: " + $scope.errorMessages);
				$scope.errorMessages = [];
			}

			else {
				workoutCreationSrvc.addNewWorkout($scope.newWorkout).then(function (data) {

					alert("Workout Added");
					$state.go('tab.workout-selection');

				});
			}
		};
};
