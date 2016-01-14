angular.module('clout').factory('storageFactory', storageFactory);
	
	function storageFactory ($window) {
		var store = $window.localStorage,
			key = 'clout-auth-token';
			
		return {
			getToken: getToken,
			setToken: setToken,
            save: save,
            get: get
            
		}
		
		function getToken () {
			return store.getItem(key);
		}
		
		function setToken (token) {
            console.log('saving token', token);
			if (token) {
				store.setItem(key, token);
			} else {
				store.removeItem(key);
			}
		}
        function get (key) {
            
			return store.getItem(key);
		}
		
		function save (key, value) {
            console.log('saving token', value);
			if (value) {
				store.setItem(key, value);
			} else {
				store.removeItem(key);
			}
		}
	}