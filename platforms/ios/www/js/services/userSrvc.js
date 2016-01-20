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
    //
    this.pushCreated = function(obj) {
        return $http.put('http://localhost:8080/api/mycreated', obj).then(function(response) {
            return response.data;
        }, function(err) {
            console.log('error pushing workout', err)
        })
    }
    this.pushCompleted = function(obj) {
        return $http.put('http://localhost:8080/api/mycompleted', obj).then(function(response) {
            return response.data;
        }, function(err) {
            console.log('error pushing workout to completed', err)
        })
    }
    this.pushFavorites = function(obj) {
        return $http.put('http://localhost:8080/api/myfavorites', obj).then(function(response) {
            return response.data;
        }, function(err) {
            console.log('error pushing workout to user favorites', err)
        })
    }
    //
    this.getCreated = function(userId) {
        return $http.get('http://localhost:8080/api/mycreated?userId=' + userId).then(function(response) {
            return response.data;
        }, function(err) {
            console.log('error pushing workout', err)
        })
    }
    this.getCompleted = function(userId) {
        return $http.get('http://localhost:8080/api/mycompleted?userId=' + userId).then(function(response) {
            return response.data;
        }, function(err) {
            console.log('error pushing workout to completed', err)
        })
    }
    this.getFavorites = function(userId) {
        return $http.get('http://localhost:8080/api/myfavorites?userId=' + userId).then(function(response) {
            return response.data;
        }, function(err) {
            console.log('error getting favorite workouts for user', err)
        })
    }
});
