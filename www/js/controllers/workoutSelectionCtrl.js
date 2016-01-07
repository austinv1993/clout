angular.module('clout')
.controller('workoutSelectionCtrl', function($scope, workoutsService) {
    $scope.getFirstPage = function() {
        workoutsService.getWorkouts().then(function(workouts) {
            $scope.workouts = workouts;
        });
    };
    $scope.getFirstPage();
    
    $scope.getMoreWorkouts = function() {
        workoutsService.offset += 6;
        workoutsService.getWorkouts().then(function(workouts) {
            $scope.workouts = workouts;
            console.log(workoutsService.offset);
        });
    };
    
    $scope.getPreviousWorkouts = function() {
        workoutsService.offset -= 6;
        workoutsService.getPreviousWorkouts().then(function(workouts) {
            $scope.workouts = workouts;
        });
    };
});