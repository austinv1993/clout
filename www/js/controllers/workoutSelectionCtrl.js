angular.module('clout')
.controller('workoutSelectionCtrl', function($state, $scope, $stateParams, workoutSelectionSrvc, storageFactory) {
    $scope.getFirstPage = function() {
        workoutSelectionSrvc.getWorkouts().then(function(workouts) {
            for (var i = 0; i < workouts.length; i++) {
                $scope.retrievedWorkouts.push(workouts[i]);
            };
            $scope.workouts = workouts;
            // console.log(workouts);
            // console.log('got first page');
        });
    };
    $scope.getFirstPage();
    $scope.endOfResults = false;
    $scope.retrievedWorkouts = [];
    $scope.moreDataAvailable = true;
    
    $scope.getMoreWorkouts = function() {
        // console.log('trying to get more workouts');
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
            // console.log('got more workouts');
            $scope.$broadcast('scroll.infiniteScrollComplete');
        });
    };
    $scope.$on('$stateChangeSuccess', function() {
        $scope.getMoreWorkouts();
  });
    
    
    $scope.viewWorkout = function(workoutId) {
        $state.go('view-workout', ({workoutId: workoutId }));

    };
        
     $scope.startWorkout = function(workoutId) {
        $state.go('active-view', ({workoutId: workoutId }));
    };
        
    $scope.quickStart = function(workoutId) {
        $state.go('active-view', ({workoutId: workoutId }));
        // console.log("hit quickStart Function");
    };
    $scope.logout = function() {
        var key = localStorage.getItem('clout-auth-token')
        storageFactory.setToken();
        storageFactory.save('user');
        $state.go('login');
    }
    $scope.getCurrentUser = function() {
        $scope.user = JSON.parse(localStorage.getItem('user'));
        console.log('user', $scope.user);
    }
    $scope.getCurrentUser();
    

});