angular.module('clout')
.controller('viewWorkoutCtrl', function($state, $scope, $stateParams, $timeout, workoutSelectionSrvc) {
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
    $scope.testThis = function() {
        console.log('controller is connected');
    };
    
    
     $scope.startWorkout = function(workoutId) {
        $state.go('active-view', ({workoutId: workoutId }));
    };
    $scope.testThis();
    
    setMode(true);
    $scope.buttonChange = false;
    $scope.button = "STOP";
    $scope.buttonColor = "btn btn-danger";

    $scope.getCounter = function () {

        workoutSelectionSrvc.getWorkoutById($stateParams.workoutId).then(function (data) {

            var i = 0;
            var exerciseInterval = data.exercises;

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

    $scope.getCounter();

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

    
});