angular.module('clout')
.service('workoutSelectionSrvc', function($http) {
    this.offset = 0;
    this.pageCount = 6;

    this.getWorkouts = function() {
        return $http.get('https://blooming-shore-7771.herokuapp.com/api/workouts?offset=' + this.offset + '&count=' + this.pageCount).then(function(response) {
            return response.data;
        });
    };

    this.getPreviousWorkouts = function() {
        return $http.get('https://blooming-shore-7771.herokuapp.com/api/workouts?offset=' + this.offset + '&count=' + this.pageCount).then(function(response) {
            return response.data
        });
    };
})
