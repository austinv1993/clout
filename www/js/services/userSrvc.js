angular.module('clout')
.service('userSrvc', function($http, storageFactory) {
     
    this.authenticate = function(loginAttempt) {
        console.log(loginAttempt);
        return $http.post('http://localhost:8080/api/authenticate', loginAttempt).then(function(response) {
            if(response.data.success) {
                storageFactory.setToken(response.data.token);
                storageFactory.save('user', JSON.stringify(response.data.user));
                console.log('user', JSON.parse(storageFactory.get('user')));
                
            }
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