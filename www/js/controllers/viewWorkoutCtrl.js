angular.module('clout')
.controller('viewWorkoutCtrl', function($state, $scope, $stateParams, $timeout, workoutSelectionSrvc, userSrvc) {

	$scope.getWorkout = function(workoutId) {
        workoutSelectionSrvc.getWorkoutById(workoutId).then(function(workout) {
            $scope.workout = workout;
			console.log($scope.workout);
            if (!$scope.workout.equipment) {
                $scope.noWorkout = true;
            }
        });
    };

    $scope.getWorkout($stateParams.workoutId);
    $scope.noWorkout = false;

    $scope.workoutStart = function(workoutId) {
		window.location.reload(true);
        $state.go('active-view', ({workoutId: workoutId }));
    };

	$scope.fovoriteToAdd = true;

	$scope.addToFavorites = function(workoutId) {

		userSrvc.pushFavorites(workoutId).then(function(favorites) {

			alert("Workout Added to Favorites!");
			$scope.fovoriteToAdd = false;
		});
	}

});
