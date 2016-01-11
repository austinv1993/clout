angular.module('clout')
.controller('viewWorkoutCtrl', function($state, $scope, $stateParams, workoutSelectionSrvc) {
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
    $scope.testThis = function() {
        console.log('controller is connected');
    };
    
    
     $scope.startWorkout = function(workoutId) {
     $state.go('active-view', ({workoutId: workoutId }));
    };
    $scope.testThis();
    
});