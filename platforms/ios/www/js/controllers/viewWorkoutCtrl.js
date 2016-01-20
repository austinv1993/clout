angular.module('clout')
.controller('viewWorkoutCtrl', function($state, $scope, $stateParams, $timeout, workoutSelectionSrvc, userSrvc) {

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

	$scope.getCurrentUser = function() {
        $scope.user = JSON.parse(localStorage.getItem('user'));
        console.log('user', $scope.user);
    };

    $scope.getCurrentUser();

	userSrvc.getFavorites($scope.user.id).then(function(favorites) {

		$scope.fovoriteToAdd = true;
		$scope.favorites = favorites;
		favorites.forEach(function(e) {
			if(e._id === $scope.workout._id || e.id === $scope.workout._id) {
				$scope.fovoriteToAdd = false;
			}
		});
	});

    $scope.workoutStart = function(workoutId) {
		window.location.reload(true);
        $state.go('active-view', ({workoutId: workoutId }));
    };

	$scope.addToFavorites = function(workoutId) {

		$scope.idObj = {
			workoutId: $scope.workout._id,
			userId: $scope.user.id
		}

		userSrvc.pushFavorites($scope.idObj).then(function(favorites) {

			alert("Workout Added to Favorites!");
			$scope.fovoriteToAdd = false;
		});
	};
});
