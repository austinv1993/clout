
var app = angular.module('clout');

app.controller('workoutCreationCtrl', ['$scope', '$state', '$stateParams', 'workoutCreationSrvc', workoutCreationCtrl]);

	function workoutCreationCtrl($scope, $state, $stateParams, workoutCreationSrvc) {

		$scope.newExercise = {};

		$scope.workout = {};

		$scope.exercises = [];

		$scope.addNewExercise = function() {

			if(!$scope.newExercise.text) {
				alert("Please enter exercise");
			}
			else {
				$scope.exercises.push($scope.newExercise.text);
				$scope.newExercise = {};
			}
		};

		$scope.deleteExercise = function(array, index) {

			array.splice(index, 1);
		};

		$scope.newEquipment = {};

		$scope.equipments = [];

		$scope.addNewEquipment = function() {

			if(!$scope.newEquipment.text) {
				alert("Please enter equipment");
			}
			else {
				$scope.equipments.push($scope.newEquipment.text);
				$scope.newEquipment = {};
			}
		};

		$scope.deleteEquipment = function(array, index) {

			array.splice(index, 1);
		};

		$scope.reps = false;
		$scope.interval = false;

		$scope.workoutType = function() {
			if($scope.workout.type === "reps") {
				$scope.reps = true;
				$scope.interval = false;
			}
			if($scope.workout.type === "interval") {
				$scope.interval = true;
				$scope.reps = false;
			}
		};




		$scope.errorMessages = [];

		$scope.postNewWorkout = function() {

			$scope.workoutTime = {
				mins: $scope.workout.mins,
				secs: $scope.workout.secs
			};

			$scope.workoutReps = {
				reps: $scope.workout.reps,
				sets: $scope.workout.sets
			};

			$scope.newWorkout = {
				name: $scope.workout.name,
				workoutType: $scope.workout.type,
				exercises: $scope.exercises,
				equipment: $scope.equipments,
				level: $scope.workout.level,
				time: $scope.workoutTime,
				reps: $scope.workoutReps,
				description: $scope.workout.description
			};



			if(!$scope.workout.name) {
				$scope.errorMessages.push(" name");
			}
			if(!$scope.workout.type) {
				$scope.errorMessages.push(" type");
			}
			if($scope.exercises.length === 0) {
				$scope.errorMessages.push(" exercises");
			}
			if($scope.equipments.length === 0) {
				$scope.errorMessages.push(" equipment");
			}
			if(!$scope.workout.level) {
				$scope.errorMessages.push(" level");
			}
			if($scope.workout.type === "interval") {
				if(!$scope.workoutTime) {
					console.log("got to interval");
					$scope.errorMessages.push(" estimated time");
				}
			}
			if($scope.workout.type === "reps") {
				if(!$scope.workoutReps) {
					console.log("got to reps");
					$scope.errorMessages.push(" reps/sets");
				}
			}

			if(!$scope.workout.description) {
				$scope.errorMessages.push(" description");
			}

			if($scope.errorMessages.length > 0) {
				alert("The following are missing: " + $scope.errorMessages);
				$scope.errorMessages = [];
			}

			else {
				workoutCreationSrvc.addNewWorkout($scope.newWorkout).then(function (data) {

					console.log($scope.workout.name);
					console.log($scope.newWorkout);
					alert("Workout Added");
					$state.go('tab.workout-selection');

				});
			}
		};
};


// ***HTML code for adding exercises***

// <h4>Exercises</h4>

// <form ng-submit="addNewExercise()">
// 	<input class="" ng-model="newExercise" placeholder=""></input><br>
// </form>
// <button id="" ng-click="addNewExercise()">Add Exercise</button>
// <ul>
// 	<li class="" ng-repeat="exercise in exercises track by $index" >{{ exercise }}<button id="" ng-click="delete(exercises, $index)">Remove</button></li>
// </ul>
// <input id="" ng-show="exerciseAdded" type="submit" value="SUBMIT" ng-click="postNewWorkout()"></input><br>


// ***HTML code for adding required equipment***

// <h4>Equipment</h4>

// <form ng-submit="addNewEquipment()">
// 	<input class="" ng-model="newEquipment" placeholder=""></input><br>
// </form>
// <button id="" ng-click="addNewEquipment()">Add Equipment</button>
// <ul>
// 	<li class="" ng-repeat="equipment in equipments track by $index" >{{ equipment }}<button id="" ng-click="delete(equipments, $index)">Remove</button></li>
// </ul>
// <input id="" ng-show="equipmentAdded" type="submit" value="SUBMIT" ng-click="postNewWorkout()"></input><br>


// ***HTML code for adding exercises***

// <h4>Exercises</h4>

// <form ng-submit="addNewExercise()">
// 	<input class="" ng-model="newExercise" placeholder=""></input><br>
// </form>
// <button id="" ng-click="addNewExercise()">Add Exercise</button>
// <ul>
// 	<li class="" ng-repeat="exercise in exercises track by $index" >{{ exercise }}<button id="" ng-click="delete(exercises, $index)">Remove</button></li>
// </ul>


// ***HTML code for adding required equipment***

// <h4>Equipment</h4>

// <form ng-submit="addNewEquipment()">
// 	<input class="" ng-model="newEquipment" placeholder=""></input><br>
// </form>
// <button id="" ng-click="addNewEquipment()">Add Equipment</button>
// <ul>
// 	<li class="" ng-repeat="equipment in equipments track by $index" >{{ equipment }}<button id="" ng-click="delete(equipments, $index)">Remove</button></li>
// </ul>
