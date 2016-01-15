var app = angular.module('clout');

app.controller('workoutCreationCtrl', ['$scope', '$state', '$stateParams', 'workoutCreationSrvc', 'userSrvc', workoutCreationCtrl]);


function workoutCreationCtrl($scope, $state, $stateParams, workoutCreationSrvc, userSrvc) {

    // $scope.getCurrentUser = function() {
    //     userSrvc.getCurrentUser().then(function(user) {
    //         $scope.user = user;
    //         console.log('current user', $scope.user);
    //     })
    // }
    // $scope.getCurrentUser();

	$scope.newExercise = {};

	$scope.workout = {};

	$scope.exercises = [];

	$scope.addNewExercise = function() {

		if($scope.workout.type === "interval") {

			if(!$scope.newExercise.name || !$scope.newExercise.mins || !$scope.newExercise.secs) {
				alert("Please enter exercise information");
			}
			else {
				$scope.exercises.push({
					name: $scope.newExercise.name,
					mins: $scope.newExercise.mins,
					secs: $scope.newExercise.secs
				});
				$scope.newExercise = {};
			}
		}

		if($scope.workout.type === "repetition") {

			if(!$scope.newExercise.name || !$scope.newExercise.reps || !$scope.newExercise.sets) {
				alert("Please enter exercise information");
			}
			else {
				$scope.exercises.push({
					name: $scope.newExercise.name,
					reps: $scope.newExercise.reps,
					sets: $scope.newExercise.sets
				});
				$scope.newExercise = {};
			}
		}
	};

	$scope.deleteExercise = function(array, index) {

		array.splice(index, 1);
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
		if($scope.workout.type === "repetition") {
			$scope.repetition = true;
			$scope.interval = false;
			$scope.exercises = [];
		}
		if($scope.workout.type === "interval") {
			$scope.interval = true;
			$scope.repetition = false;
			$scope.exercises = [];
		}
	};
    $scope.getCurrentUser = function() {
        $scope.user = JSON.parse(localStorage.getItem('user'));
        console.log('user', $scope.user);
    }
    $scope.getCurrentUser();

	$scope.errorMessages = [];

	$scope.postNewWorkout = function() {

		$scope.workoutTime = {
			hrs: $scope.workout.hrs,
			mins: $scope.workout.mins,
		};

		$scope.newWorkout = {
			name: $scope.workout.name,
			workoutType: $scope.workout.type,
			exercises: $scope.exercises,
			equipment: $scope.equipments,
			level: $scope.workout.level,
			time: $scope.workoutTime,
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

		// if($scope.equipments.length === 0) {
		// 	$scope.errorMessages.push(" equipment");
		// }

		if(!$scope.workout.level) {
			$scope.errorMessages.push(" level");
		}

		// if($scope.workout.type === "interval") {
		// 	if(!$scope.workoutTime) {
		// 		$scope.errorMessages.push(" estimated time");
		// 	}
		// }

		// if($scope.workout.type === "repetition") {
		// 	if(!$scope.workoutReps) {
		// 		$scope.errorMessages.push(" reps/sets");
		// 	}
		// }

		if(!$scope.workoutTime.hrs && !$scope.workoutTime.mins || !$scope.workoutTime.mins) {
			$scope.errorMessages.push(" estimated workout time");
		}

		if(!$scope.workout.description) {
			$scope.errorMessages.push(" description");
		}

		if($scope.errorMessages.length > 0) {
			alert("The following are missing: " + $scope.errorMessages);
			$scope.errorMessages = [];
		}

		else {
			workoutCreationSrvc.addNewWorkout($scope.newWorkout).then(function (response) {

				alert("Workout Added");
				$state.go('tab.workout-selection');
                // console.log(response);
                var id = {};
                id.userId = $scope.user.id;
                id.workoutId = response._id;
                console.log('this is id', id);
                userSrvc.pushWorkout(id)
			});
		}
	};
};
