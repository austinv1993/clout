angular.module('clout.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  
})



.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
