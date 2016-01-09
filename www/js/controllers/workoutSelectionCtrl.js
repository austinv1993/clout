angular.module('clout')
.controller('workoutSelectionCtrl', function($state, $scope, workoutSelectionSrvc) {
    $scope.getFirstPage = function() {
        workoutSelectionSrvc.getWorkouts().then(function(workouts) {
            for (var i = 0; i < workouts.length; i++) {
                $scope.retrievedWorkouts.push(workouts[i]);
            };
            $scope.workouts = workouts;
            // console.log(workouts);
            console.log('got first page');
        });
    };
    $scope.getFirstPage();
    $scope.endOfResults = false;
    $scope.retrievedWorkouts = [];
    $scope.moreDataAvailable = true;
    
    $scope.getMoreWorkouts = function() {
        console.log('trying to get more workouts');
        workoutSelectionSrvc.offset += 8;
        workoutSelectionSrvc.getWorkouts().then(function(workouts, err) {
            if (err) {
                $scope.moreDataAvailable = false;
                return;
            }
            $scope.workouts = workouts;
            
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
            for (var i = 0; i < workouts.length; i++) {
                $scope.retrievedWorkouts.push(workouts[i]);
            }
            if (workouts.length === 0) {
                $scope.moreDataAvailable = false;
            }
            console.log('got more workouts');
            $scope.$broadcast('scroll.infiniteScrollComplete');
        });
    };
    $scope.$on('$stateChangeSuccess', function() {
        $scope.getMoreWorkouts();
  });
    
    // $scope.getPreviousWorkouts = function() {
    //     workoutSelectionSrvc.offset -= 4;
    //     workoutSelectionSrvc.getPreviousWorkouts().then(function(workouts) {
    //         $scope.workouts = workouts;
    //         if ($scope.workouts.length > 0) {
    //             $scope.endOfResults = false;
    //         } else {
    //             $scope.endOfResults = true;
    //         }
    //         console.log(workoutSelectionSrvc.offset);
    //         if (workoutSelectionSrvc.offset === 0) {
    //             $scope.showBackButton = false;
    //         } else {
    //             $scope.showBackButton = true;
    //         }
    //     });
    // };
    
    $scope.viewWorkout = function(workoutId) {
        $state.go('view-workout', ({workoutId: workoutId }))
        }
});