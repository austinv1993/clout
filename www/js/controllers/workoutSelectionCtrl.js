angular.module('clout')
.controller('workoutSelectionCtrl', function($state, $scope, workoutSelectionSrvc) {
    $scope.getFirstPage = function() {
        workoutSelectionSrvc.getWorkouts().then(function(workouts) {
            $scope.workouts = workouts;
            console.log(workouts);
        });
    };
    $scope.getFirstPage();
    $scope.endOfResults = false;
    
    $scope.getMoreWorkouts = function() {
        workoutSelectionSrvc.offset += 4;
        workoutSelectionSrvc.getWorkouts().then(function(workouts) {
            $scope.workouts = workouts;
            console.log(workoutSelectionSrvc.offset);
            if ($scope.workouts.length > 0) {
                $scope.endOfResults = false;
            } else {
                $scope.endOfResults = true;
            }
            if (workoutSelectionSrvc.offset === 0) {
                $scope.showBackButton = false;
            } else {
                $scope.showBackButton = true;
            }
            console.log($scope.endOfResults);
            console.log(workoutSelectionSrvc.offset);
        });
    };
    
    $scope.getPreviousWorkouts = function() {
        workoutSelectionSrvc.offset -= 4;
        workoutSelectionSrvc.getPreviousWorkouts().then(function(workouts) {
            $scope.workouts = workouts;
            if ($scope.workouts.length > 0) {
                $scope.endOfResults = false;
            } else {
                $scope.endOfResults = true;
            }
            console.log(workoutSelectionSrvc.offset);
            if (workoutSelectionSrvc.offset === 0) {
                $scope.showBackButton = false;
            } else {
                $scope.showBackButton = true;
            }
        });
    };
    
    $scope.viewWorkout = function(workoutId) {
        $state.go('view-workout', ({workoutId: workoutId }))
        }
});