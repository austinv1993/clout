angular.module('clout')
.service('workoutSelectionSrvc', function($http) {
    this.offset = 0;
    this.pageCount = 8;

    this.getWorkouts = function() {
        return $http.get('http://104.236.75.136:8080/api/workouts?offset=' + this.offset + '&count=' + this.pageCount).then(function(response) {

            return response.data; //https://blooming-shore-7771.herokuapp.com http://localhost:3000
        });
    };
    this.getWorkoutById = function(workoutId) {
        return $http.get('http://104.236.75.136:8080/api/workout?workoutId=' + workoutId).then(function(response) {
            console.log(response.data);

            return response.data;
        });
    };

    this.getPreviousWorkouts = function() {
        return $http.get('http://104.236.75.136:8080/api/workouts?offset=' + this.offset + '&count=' + this.pageCount).then(function(response) {

            return response.data;
        });
    };
    this.filterbyWorType = function(type) {
        return $http.get('http://104.236.75.136:8080/api/filter/workouts?value=' + type).then(function(response) {
            return response.data;
        })
    }
})