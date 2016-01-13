angular.module('clout')
.controller('loginCtrl', function($scope, userSrvc) {
    $scope.authenticate = function(loginAttempt) {
        userSrvc.authenticate(loginAttempt).then(function(response) {
            $scope.TBD = response;
            console.log($scope.TBD);
        })
    }
    $scope.tokenTest = function() {
        userSrvc.tokenTest().then(function(response) {
            $scope.test = response;
            console.log(response);
        })
    }
});