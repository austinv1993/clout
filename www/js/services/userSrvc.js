angular.module('clout')
.service('userSrvc', function($http, storageFactory) {

    this.authenticate = function(loginAttempt) {
        console.log(loginAttempt);
        return $http.post('http://104.236.75.136:8080/api/authenticate', loginAttempt).then(function(response) {
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
        return $http.post('http://104.236.75.136:8080/api/signup', userObj).then(function(response) {
            return response.data;
        }, function(err) {
            console.log('error registering new user', err)
        })
    }
    //
    this.pushCreated = function(obj) {
        return $http.put('http://104.236.75.136:8080/api/mycreated', obj).then(function(response) {
            return response.data;
        }, function(err) {
            console.log('error pushing workout', err)
        })
    }
    this.pushCompleted = function(obj) {
		console.log("hit push completed service");
        return $http.put('http://104.236.75.136:8080/api/mycompleted', obj).then(function(response) {
            return response.data;
        }, function(err) {
            console.log('error pushing workout to completed', err)
        })
    }
    this.pushFavorites = function(obj) {
        return $http.put('http://104.236.75.136:8080/api/myfavorites', obj).then(function(response) {
            return response.data;
        }, function(err) {
            console.log('error pushing workout to user favorites', err)
        })
    }
    //
    this.getCreated = function(userId) {
        return $http.get('http://104.236.75.136:8080/api/mycreated?userId=' + userId).then(function(response) {
            return response.data;
        }, function(err) {
            console.log('error getting created workouts', err)
        })
    }
    this.getCompleted = function(userId) {
        return $http.get('http://104.236.75.136:8080/api/mycompleted?userId=' + userId).then(function(response) {
            return response.data;
        }, function(err) {
            console.log('error getting completed workouts', err)
        })
    }
    this.getFavorites = function(userId) {
        return $http.get('http://104.236.75.136:8080/api/myfavorites?userId=' + userId).then(function(response) {
            return response.data;
        }, function(err) {
            console.log('error getting favorite workouts for user', err)
        })
    }
	this.removeFavorite = function(userId, workoutId) {
		return $http.put('http://104.236.75.136:8080/api/removeFavorite/' + userId, { workoutId: workoutId }).then(function(response) {
			return response.data;
		}, function(err) {
			console.log("error deleting favorite workout", err);
		});
	};
});
