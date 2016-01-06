angular.module('clout')
.service('workoutsService', function($http) {
    this.getWorkouts = function() {
        return $http.get('url').then(function(workouts) {
            return workouts;
        })
    }
})