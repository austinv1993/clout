angular.module('clout')
.controller('viewWorkoutCtrl', function($scope, $stateParams, workoutSelectionSrvc) {
    $scope.getWorkout = function(workoutId) {
        workoutSelectionSrvc.getWorkoutById(workoutId).then(function(workout) {
            $scope.workout = workout;
            console.log($scope.workout);
        });
    };
    $scope.getWorkout($stateParams.workoutId);
    $scope.testThis = function() {
        console.log('controller is connected');
    };
    $scope.testThis();
    
});