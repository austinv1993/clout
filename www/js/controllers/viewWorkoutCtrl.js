angular.module('clout')
.controller('viewWorkoutCtrl', function($scope, $stateParams, workoutSelectionSrvc) {
    $scope.getWorkout = function(workoutId) {
        workoutSelectionSrvc.getWorkoutById(workoutId).then(function(workout) {
            $scope.workout = workout;
        });
    };
    $scope.getWorkout($stateParams.workoutId);
    
});