angular.module('clout')
.controller('workoutSelectionCtrl', function($scope, workoutsService) {
    $scope.getWorkouts = function() {
        workoutsService.getWorkouts().then(function(workouts) {
            $scope.workouts = workouts;
        })
    }
});