angular.module('clout')
.controller('workoutSelectionCtrl', function($scope, workoutsService) {
    $scope.getFirstPage = function() {
        workoutsService.getWorkouts().then(function(workouts) {
            $scope.workouts = workouts;
        });
    };
    $scope.getFirstPage();
    $scope.endOfResults = false;
    
    $scope.getMoreWorkouts = function() {
        workoutsService.offset += 6;
        workoutsService.getWorkouts().then(function(workouts) {
            $scope.workouts = workouts;
            console.log(workoutsService.offset);
            if ($scope.workouts.length > 0) {
                $scope.endOfResults = false;
            } else {
                $scope.endOfResults = true;
            }
            console.log($scope.endOfResults);
        });
    };
    
    $scope.getPreviousWorkouts = function() {
        workoutsService.offset -= 6;
        workoutsService.getPreviousWorkouts().then(function(workouts) {
            $scope.workouts = workouts;
            if ($scope.workouts.length > 0) {
                $scope.endOfResults = false;
            } else {
                $scope.endOfResults = true;
            }
        });
    };
});