angular.module('clout')
.service('userSrvc', function($http) {
    
    this.getCurrentUser = function() {
      return $http.get('http://localhost:3000/api/userbyid?userId=5693f036e4b07da7bd2464cd').then(function(response) {
          return response.data;
      })    
    }
    
});