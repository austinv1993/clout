angular.module('clout')
.controller('viewWorkoutCtrl', function($state, $scope, $stateParams, $timeout, workoutSelectionSrvc) {

	$scope.getWorkout = function(workoutId) {
        workoutSelectionSrvc.getWorkoutById(workoutId).then(function(workout) {
            $scope.workout = workout;
			console.log($scope.workut);
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

});
