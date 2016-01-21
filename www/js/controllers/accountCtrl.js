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

/*     $scope.todos = [];

    $scope.addTodo = function(){
    $scope.todos.push({'title':$scope.newTodo,'done':false})
$scope.newTodo = ''

    }
$scope.clearCompleted = function(){
    $scope.todos = $scope.todos.filter(function(item){
        return !item.done

})
} */

 	$scope.logout = function() {
        var key = localStorage.getItem('clout-auth-token')
        storageFactory.setToken();
        storageFactory.save('user');
        $state.go('login');
    }
    $scope.getCurrentUser = function() {
        $scope.user = JSON.parse(localStorage.getItem('user'));
    }
    $scope.getCurrentUser();

	userSrvc.getCreated($scope.user.id).then(function(created) {

		var createdCount = 0;
		$scope.created = created;
		created.forEach(function(e) {

        	createdCount += 1;
		});
		$scope.createdCount = createdCount;
		console.log("created ",created);
	});

	userSrvc.getCompleted($scope.user.id).then(function(completed) {

		var completedCount = 0;
		$scope.completed = completed;
		completed.forEach(function(e) {

        	completedCount += 1;
		});
		$scope.completedCount = completedCount;
		console.log("completed ", completed);
	});


});

