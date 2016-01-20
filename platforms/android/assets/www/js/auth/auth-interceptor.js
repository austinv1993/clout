(function () {
	'use strict';

	angular.module('clout').factory('AuthInterceptor', AuthInterceptor);
	
	function AuthInterceptor (storageFactory) {
		return {
			request: addToken
		};
		
		function addToken (config) {
			var token = storageFactory.getToken();
			
			if (token) {
				config.headers = config.headers || {};
				config.headers.Authorization = 'Bearer ' + token;
			}
			return config;
		}
	}

}());