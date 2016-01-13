angular.module('clout')
.controller('loginCtrl', function($scope, userSrvc, $state) {
    $scope.authenticate = function(loginAttempt) {
        userSrvc.authenticate(loginAttempt).then(function(response) {
            console.log(response);
            if (response.success) {
                $state.go('tab.workout-selection');
            } else {
                
            }
        })
    }
    $scope.register = function(userObj) {
        userSrvc.register(userObj).then(function(response) {
            console.log(response);
        })
    }
    // $scope.tokenTest = function() {
    //     userSrvc.tokenTest().then(function(response) {
    //         $scope.test = response;
    //         console.log(response);
    //     })
    // }
    $scope.login = true;
    $scope.setLoginTrueFalse = function() {
        if ($scope.login) {
          $scope.login = false;    
        } else {
            $scope.login = true;
        }
    }
});