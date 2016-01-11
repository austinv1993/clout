var app = angular.module('clout');

app.controller('timerCtrl', ['$scope', '$state', '$stateParams', '$timeout', 'workoutSelectionSrvc', timerCtrl]);

function timerCtrl($scope, $state, $stateParams, $timeout, workoutSelectionSrvc) {

    $scope.getCounter = function () {

        workoutSelectionSrvc.getWorkoutById($stateParams.workoutId).then(function (data) {

            var counter = 0;

            for (var i = 0; i < data.exercises.length; i++) {                        
                var exerciseInterval = data.exercises;
                var counterMins = exerciseInterval[i].mins;
                var counterSecs = exerciseInterval[i].secs;
                $scope.exerciseTime = parseInt(counterMins) * 60 + parseInt(counterSecs) + 1;
                $scope.exerciseName = exerciseInterval[i].name;
                console.log(counter);
                counter++;
                angular.element(".stopwatch").attr("data-timer", $scope.exerciseTime);
    
                $(".stopwatch").TimeCircles({ start: true });
                $(".stopwatch").TimeCircles();
                $(".start").click(function () { $(".stopwatch").TimeCircles().start(); });
                $(".stop").click(function () { $(".stopwatch").TimeCircles().stop(); });
                $(".restart").click(function () { $(".stopwatch").TimeCircles().restart(); });
                $(".stopwatch").TimeCircles().addListener(function(unit, value, total) {
                    if(total === 0) {
                        alert("DONE!");
                    }
                });
            }
        });
    };

    $scope.getCounter();

};

