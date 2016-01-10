var app = angular.module('clout');

app.controller('timerCtrl', ['$scope', '$state', '$stateParams', '$timeout', 'workoutSelectionSrvc', timerCtrl]);

function timerCtrl($scope, $state, $stateParams, $timeout, workoutSelectionSrvc) {

    $scope.exerciseTime = [];

	$scope.getCounter = function() {

        workoutSelectionSrvc.getWorkoutById($stateParams.workoutId).then(function(data) {
            
            var exercise = data.exercises;
            exercise.forEach(function(e) {
                console.log(e);
                $scope.exerciseTime.push({
                    mins: e.mins,
                    secs: e.secs
                });
            })
            console.log($scope.exerciseTime);
        });
    };
    
    $scope.getCounter();

    var mytimeout = null; // the current timeoutID
 
    // actual timer method, counts down every second, stops on zero
    $scope.onTimeout = function () {
        
        if ($scope.counter === 0) {
            $scope.$broadcast('timer-stopped', 0);
            $timeout.cancel(mytimeout);
            return;
        }
        $scope.counter--;
        mytimeout = $timeout($scope.onTimeout, 1000);
    };

    $scope.startTimer = function () {
        $scope.exerciseTime.forEach(function(e) {
            console.log(e); 
        });
        mytimeout = $timeout($scope.onTimeout, 1000);
    };
 
    // stops and resets the current timer
    $scope.stopTimer = function () {
        $scope.$broadcast('timer-stopped', $scope.counter);
        $scope.counter = 3;
        $timeout.cancel(mytimeout);
    };
 
    // triggered, when the timer stops, you can do something here, maybe show a visual indicator or vibrate the device
    $scope.$on('timer-stopped', function (event, remaining) {
        if (remaining === 0) {
            alert('Finished!');
        }
    });
		
};