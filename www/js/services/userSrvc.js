angular.module('clout')
.service('userSrvc', function($http, storageFactory) {
     
    this.authenticate = function(loginAttempt) {
        console.log(loginAttempt);
        return $http.post('http://localhost:8080/api/authenticate', loginAttempt).then(function(response) {
            if(response.data.success) {
                storageFactory.setToken(response.data.token);
                storageFactory.save('user', JSON.stringify(response.data.user));
            }
            return response.data;
        }, function(err) {
            alert(err);
        })
    }
    this.register = function(userObj) {
        return $http.post('http://localhost:8080/api/signup', userObj).then(function(response) {
            return response.data;
        }, function(err) {
            console.log('error registering new user', err)
        })
    }
    
    this.pushWorkout = function(obj) {
        return $http.put('http://localhost:8080/api/myworkouts', obj).then(function(response) {
            return response.data;
        }, function(err) {
            console.log('error registering new user', err)
        })
    }
    this.pushCompleted = function(obj) {
        return $http.put('http://localhost:8080/api/mycompleted', obj).then(function(response) {
            return response.data;
        }, function(err) {
            console.log('error registering new user', err)
        })
    }
});