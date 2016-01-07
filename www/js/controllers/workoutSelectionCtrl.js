angular.module('clout')
.controller('workoutSelectionCtrl', function($scope, workoutSelectionSrvc) {
    $scope.getFirstPage = function() {
        workoutSelectionSrvc.getWorkouts().then(function(workouts) {
            $scope.workouts = workouts;
        });
    };
    $scope.getFirstPage();
    $scope.endOfResults = false;
    
    $scope.getMoreWorkouts = function() {
        workoutSelectionSrvc.offset += 6;
        workoutSelectionSrvc.getWorkouts().then(function(workouts) {
            $scope.workouts = workouts;
            console.log(workoutSelectionSrvc.offset);
            if ($scope.workouts.length > 0) {
                $scope.endOfResults = false;
            } else {
                $scope.endOfResults = true;
            }
            console.log($scope.endOfResults);
        });
    };
    
    $scope.getPreviousWorkouts = function() {
        workoutSelectionSrvc.offset -= 6;
        workoutSelectionSrvc.getPreviousWorkouts().then(function(workouts) {
            $scope.workouts = workouts;
            if ($scope.workouts.length > 0) {
                $scope.endOfResults = false;
            } else {
                $scope.endOfResults = true;
            }
        });
    };
});