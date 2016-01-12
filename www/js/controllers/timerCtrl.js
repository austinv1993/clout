var app = angular.module('clout');

app.controller('timerCtrl', ['$scope', '$state', '$stateParams', '$timeout', 'workoutSelectionSrvc', timerCtrl]);

function timerCtrl($scope, $state, $stateParams, $timeout, workoutSelectionSrvc) {



    $scope.getCounter = function () {

        workoutSelectionSrvc.getWorkoutById($stateParams.workoutId).then(function (data) {

            var i = 0;
            var exerciseInterval = data.exercises;

            $scope.startWorkout = function () {

                if (i === data.exercises.length) {
                    alert("Workout Completed. Good Job!");
                }
                else {
                    
                    $scope.inExercise = true;
                    $scope.inBreak = false;
                    var counterMins = exerciseInterval[i].mins;
                    var counterSecs = exerciseInterval[i].secs;
                    $scope.exerciseTime = parseInt(counterMins) * 60 + parseInt(counterSecs) + 1;
                    $scope.exerciseName = exerciseInterval[i].name;
                    console.log(exerciseInterval[i].name);
                    console.log(i);
                    
                    angular.element(".stopwatch").attr("data-timer", $scope.exerciseTime);
                    
                    $(".stopwatch").TimeCircles().rebuild();
                    $(".stopwatch").TimeCircles({ start: true });
                    $(".stopwatch").TimeCircles();
                    $(".start").click(function () { $(".stopwatch").TimeCircles().start(); });
                    $(".stop").click(function () { $(".stopwatch").TimeCircles().stop(); });
                    $(".restart").click(function () { $(".stopwatch").TimeCircles().restart(); });
                    $(".stopwatch").TimeCircles().addListener(function (unit, value, total) {
                        if (total === 0) {
                            
                            console.log("in exercise timer");
                            i++;
                            $(".stopwatch").TimeCircles().destroy();
                            $scope.breakTime();
                        }
                    });
                }
            };
            if (i === 0) {
                $scope.startWorkout();
            }
        });
    };

    $scope.getCounter();

    $scope.breakTime = function () {

        $scope.inBreak = true;
        $scope.inExercise = false;

        angular.element(".breakwatch").attr("data-timer", "5");
        
        $(".breakwatch").TimeCircles().rebuild();
        $(".breakwatch").TimeCircles({ start: true });
        $(".breakwatch").TimeCircles();
        $(".start").click(function () { $(".breakwatch").TimeCircles().start(); });
        $(".stop").click(function () { $(".breakwatch").TimeCircles().stop(); });
        $(".restart").click(function () { $(".breakwatch").TimeCircles().restart(); });
        $(".breakwatch").TimeCircles().addListener(function (unit, value, total) {
            if (total === 0) {
                
                console.log("In break timer");
                $(".breakwatch").TimeCircles().destroy();
                $scope.startWorkout();               
            }
        });
    }

};

