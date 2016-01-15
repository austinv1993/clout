angular.module('clout')
.controller('activeViewCtrl', function($state, $scope, $stateParams, $timeout, workoutSelectionSrvc, userSrvc) {

    workoutSelectionSrvc.getWorkoutById($stateParams.workoutId).then(function(data) {

		if(data.workoutType === "interval") {

			$scope.getCounter();
		}
		if(data.workoutType === "repetition") {

			$scope.getReps();
		}
    });
    $scope.getCurrentUser = function() {
        $scope.user = JSON.parse(localStorage.getItem('user'));
        console.log('user', $scope.user);
    }
    $scope.getCurrentUser();

    setMode(true);
    $scope.buttonChange = false;
    $scope.button = "STOP";
    $scope.buttonColor = "btn btn-danger";

    $scope.getCounter = function () {

        workoutSelectionSrvc.getWorkoutById($stateParams.workoutId).then(function (data) {

            var i = 0;
            var exerciseInterval = data.exercises;
			$scope.workoutData = data;
			console.log($scope.workout);


            $scope.startWorkout = function () {

                setMode(true);

                var counterMins = exerciseInterval[i].mins;
                var counterSecs = exerciseInterval[i].secs;
                $scope.exerciseTime = parseInt(counterMins) * 60 + parseInt(counterSecs);
                $scope.exerciseName = exerciseInterval[i].name;
                $scope.$apply();

                angular.element(".stopwatch").attr("data-timer", $scope.exerciseTime);

                $(".stopwatch").TimeCircles().rebuild();
                $(".stopwatch").TimeCircles({ start: true });
                $(".stopwatch").TimeCircles();

                $scope.startStop = function () {
                    if ($scope.buttonChange === false) {
                        $(".stopwatch").TimeCircles().stop();
                        $scope.buttonChange = true;
                        $scope.button = "START";
                        $scope.buttonColor = "btn btn-success";
                    }
                    else {
                        $(".stopwatch").TimeCircles().start();
                        $scope.buttonChange = false;
                        $scope.button = "STOP";
                        $scope.buttonColor = "btn btn-danger";
                    }
                };

                $scope.restart = function () {
                    $(".stopwatch").TimeCircles().restart();
                    $scope.buttonChange = false;
                    $scope.button = "STOP"
                    $scope.buttonColor = "btn btn-danger";
                }
                $(".stopwatch").TimeCircles().addListener(function (unit, value, total) {
                    if (total === 0) {
                        if (i === data.exercises.length - 1) {
                            $state.go("tab.workout-selection");
                            alert("Workout Completed. Good Job!");
                            $scope.idObj = {};
                            $scope.idObj.workoutId = $scope.workoutData._id;
                            $scope.idObj.userId = $scope.user.id;
                            console.log($scope.idObj);
                            userSrvc.pushFavorite($scope.idObj)
                        }
                        else {
                            i++;
                            $(".stopwatch").TimeCircles().destroy();
                            $scope.breakTime();
                        }
                    }
                });
            };
            if (i === 0) {
                $scope.startWorkout();
            }
        });
    };



    $scope.breakTime = function () {

        setMode(false);

        angular.element(".breakwatch").attr("data-timer", "3");

        $(".breakwatch").TimeCircles().rebuild();
        $(".breakwatch").TimeCircles({ start: true });
        $(".breakwatch").TimeCircles();

        $scope.startStopBreak = function () {
            if ($scope.buttonChange === false) {
                $(".breakwatch").TimeCircles().stop();
                $scope.buttonChange = true;
                $scope.button = "START";
                $scope.buttonColor = "btn btn-success";
            }
            else {
                $(".breakwatch").TimeCircles().start();
                $scope.buttonChange = false;
                $scope.button = "STOP";
                $scope.buttonColor = "btn btn-danger";
            }
        };

        $scope.restartBreak = function () {
            $(".breakwatch").TimeCircles().restart();
            $scope.buttonChange = false;
            $scope.button = "STOP"
            $scope.buttonColor = "btn btn-danger";
        }

        $(".breakwatch").TimeCircles().addListener(function (unit, value, total) {
            if (total === 0) {

                $(".breakwatch").TimeCircles().destroy();
                $scope.startWorkout();
            }
        });
    };

    function setMode(exercise) {

        $scope.inExercise = exercise;
        $scope.inBreak = !exercise;
        $scope.$apply();

    };

    $scope.getReps = function() {

		$scope.inExercise = false;
		$scope.inBreak = false;
		$scope.inReps = true;
		$scope.repButton = "NEXT EXERCISE";
		$scope.repButtonColor = "btn btn-info";

        workoutSelectionSrvc.getWorkoutById($stateParams.workoutId).then(function (data) {

            var i = 0;

            var exerciseInterval = data.exercises;
			$scope.workoutData = data;

            $scope.workout = function() {

				if(i === data.exercises.length - 1) {

					$scope.repButton = "FINISH WORKOUT!";
					$scope.repButtonColor = "btn btn-success";
				}

                if (i === data.exercises.length) {
                    $state.go("tab.workout-selection");
                    alert("Workout Completed. Good Job!");
                    $scope.idObj = {};
                    $scope.idObj.workoutId = $scope.workoutData._id;
                    $scope.idObj.userId = $scope.user.id;
                    console.log($scope.idObj);
                    userSrvc.pushCompleted($scope.idObj)
                }

				$scope.repsCounter = exerciseInterval[i].reps;
                $scope.setsCounter = exerciseInterval[i].sets;
                $scope.exerciseName = exerciseInterval[i].name;

            };
			if(i === 0) {

				$scope.workout();
			}
            $scope.nextWorkout = function() {
                i++;
                $scope.workout();
            }
        });
    }

});
