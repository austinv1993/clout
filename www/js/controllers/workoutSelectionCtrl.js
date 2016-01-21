angular.module('clout').controller('workoutSelectionCtrl', WorkoutSelection);

function WorkoutSelection($state, $scope, $stateParams, workoutSelectionSrvc, storageFactory) {
    $scope.type = 'interval';
    getFirstPage();

    function getFirstPage() {
        workoutSelectionSrvc.getWorkouts($scope.type).then(function (workouts) {
            $scope.retrievedWorkouts = $scope.workouts = workouts;
        });
    };


    $scope.endOfResults = false;
    $scope.retrievedWorkouts = [];
    $scope.moreDataAvailable = true;

    $scope.getMoreWorkouts = function (type) {
        workoutSelectionSrvc.offset += 8;
        workoutSelectionSrvc.getWorkouts(type).then(function (workouts) {

//            if (err) {
//                $scope.moreDataAvailable = false;
//                return;
//            }

            $scope.workouts = workouts;
            workouts.forEach(function (wo) {
                $scope.retrievedWorkouts.push(wo);
            });

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

            if (workouts.length === 0) {
                $scope.moreDataAvailable = false;
            }
            $scope.$broadcast('scroll.infiniteScrollComplete');
        });
    };

    $scope.filterWorkouts = function (type) {
        $scope.type = type;
        workoutSelectionSrvc.offset = 0;
        $scope.retrievedWorkouts = [];
        $scope.getMoreWorkouts(type);
    };

    $scope.$on('$stateChangeSuccess', function () {
        $scope.getMoreWorkouts();
    });


    $scope.viewWorkout = function (workoutId) {
        window.location.reload(true);
        $state.go('view-workout', ({
            workoutId: workoutId
        }));

    };

    $scope.startWorkout = function (workoutId) {
        $state.go('active-view', ({
            workoutId: workoutId
        }));
    };

    $scope.quickStart = function (workoutId) {
        window.location.reload(true);
        $state.go('active-view', ({
            workoutId: workoutId
        }));
    };

    $scope.logout = function () {

        storageFactory.setToken();
        storageFactory.save('user');
        $state.go('login');
    };

    $scope.getCurrentUser = function () {
        $scope.user = JSON.parse(localStorage.getItem('user'));
    };

    $scope.getCurrentUser();

}
