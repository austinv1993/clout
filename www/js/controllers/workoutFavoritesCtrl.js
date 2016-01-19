angular.module('clout')
.controller('workoutFavoritesCtrl', function($state, $scope, $stateParams, workoutSelectionSrvc, userSrvc) {

	$scope.getCurrentUser = function() {
        $scope.user = JSON.parse(localStorage.getItem('user'));
        console.log('user', $scope.user);
    };

    $scope.getCurrentUser();

	userSrvc.getFavorites($scope.user.id).then(function(favorites) {

		$scope.fovoriteToAdd = true;
		$scope.favorites = favorites;
	});

	$scope.viewWorkout = function(workoutId) {
		window.location.reload(true);
        $state.go('view-workout', ({workoutId: workoutId }));

    };

 	$scope.quickStart = function(workoutId) {
		window.location.reload(true);
        $state.go('active-view', ({workoutId: workoutId }));
        // console.log("hit quickStart Function");
    };

	$scope.removeFavorite = function(userId, workoutId, index) {

		$scope.favorites.splice(index, 1);
		userSrvc.removeFavorite(userId, workoutId).then(function(response) {
			console.log(response);
			alert("Workout Removed");
		});

	};

});
