angular.module('clout').service('workoutSelectionSrvc', WorkoutSelection);

function WorkoutSelection($http) {

    this.offset = 0;
    this.pageCount = 8;

    this.getWorkouts = function (type) {
        console.log('svc type: ' + type);
        //            var host = 'http://104.236.75.136';
        var host = 'http://localhost';
        var endpoint = host + ':8080/api/workouts?offset=' + this.offset + '&count=' + this.pageCount;;

        if (type) {
            endpoint += '&workoutType=' + type;
        }

        console.log('endpoint:' + endpoint);
        return $http.get(endpoint).then(function (response) {
            console.log('data:', response.data);
            return response.data; //https://blooming-shore-7771.herokuapp.com http://localhost:3000
        });
    };


    this.getWorkoutById = function (workoutId) {
        var endpoint = 'http://104.236.75.136:8080/api/workout?workoutId=' + workoutId;
        return $http.get(endpoint).then(function (response) {
            console.log(response.data);

            return response.data;
        });
    };

    this.getPreviousWorkouts = function () {
        var endpoint = 'http://104.236.75.136:8080/api/workouts?offset=' + this.offset + '&count=' + this.pageCount;
        return $http.get(endpoint).then(function (response) {

            return response.data;
        });
    };
    this.filterbyWorType = function (type) {
        return $http.get('http://104.236.75.136:8080/api/filter/workouts?value=' + type).then(function (response) {
            return response.data;
        })
    }
}