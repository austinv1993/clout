////<<<<<<< HEAD
////var app = angular.module('clout');
////
////app.controller('accountCtrl', ['$scope', function($scope){
////
////$scope.todos = [];
////    
////    $scope.addTodo = function(){
////    $scope.todos.push({'title':$scope.newTodo,'done':false})
////$scope.newTodo = ''
////
////    }
////$scope.clearCompleted = function(){
////    $scope.todos = $scope.todos.filter(function(item){
////        return !item.done
////
////})
////}
////}]);
//=======
angular.module('clout')
.controller('accountCtrl', function($scope, userSrvc, $timeout) {
    // $scope.getCurrentUser = function() {
    //   userSrvc.getCurrentUser().then(function(user) {
    //     $scope.user = user;  
    //     console.log('current user', $scope.user);      
    //   })    
    // };
    // $scope.getCurrentUser();
    // $scope.time = 30;
  
    // $scope.startTimer = function(seconds) {
        
    //     $timeout($scope.decrement(seconds), 1000)
    //     console.log('invoked')
    // };
    // $scope.decrement = function(seconds) {
    //     console.log(seconds);
    //     if(seconds > 0) {
    //       seconds --;
    //       $scope.startTimer();
    //       console.log(seconds);    
    //     }
    // }
    // $scope.startTimer($scope.time);
    
    $scope.todos = [];
    
    $scope.addTodo = function(){
    $scope.todos.push({'title':$scope.newTodo,'done':false})
$scope.newTodo = ''

    }
$scope.clearCompleted = function(){
    $scope.todos = $scope.todos.filter(function(item){
        return !item.done

})
}
    
    
});

