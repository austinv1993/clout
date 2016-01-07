angular.module('clout')
.service('workoutSelectionSrvc', function($http) {
    this.offset = 0;
    this.pageCount = 6;
    
    this.getWorkouts = function() {
        return $http.get('http://localhost:3000/api/workouts?offset=' + this.offset + '&count=' + this.pageCount).then(function(response) {
            return response.data;
        });
    };
    
    this.getPreviousWorkouts = function() {
        return $http.get('http://localhost:3000/api/workouts?offset=' + this.offset + '&count=' + this.pageCount).then(function(response) {
            return response.data
        });
    };
})