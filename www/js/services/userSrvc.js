angular.module('clout')
.service('userSrvc', function($http) {
    
    // this.getCurrentUser = function() {
    //   return $http.get('http://localhost:8080/api/userbyid?userId=5693f036e4b07da7bd2464cd').then(function(response) {
    //       return response.data;
    //   })
    //}    
    this.authenticate = function(loginAttempt) {
        console.log(loginAttempt);
        return $http.post('http://localhost:8080/api/authenticate', loginAttempt).then(function(response) {
            return response.data;
        })
    }
    this.register = function(userObj) {
        return $http.post('http://localhost:8080/api/signup', userObj).then(function(response) {
            return response.data;
        })
    }
    this.tokenTest = function() {
        return $http.get('http://localhost:8080/api/memberinfo').then(function(response) {
            return response.data;
        })
    }
});