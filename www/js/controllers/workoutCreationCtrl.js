var app = angular.module('clout');

app.controller('workoutCreationCtrl', ['$scope', '$state', '$stateParams', 'workoutCreationSrvc', workoutCreationCtrl]);

	function workoutCreationCtrl($scope, $state, $stateParams, workoutCreationSrvc) {

		$scope.newExercise = {};

		$scope.exercises = [];



		$scope.addNewExercise = function() {

			if (!$scope.newExercise.text) {
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

		$scope.equipments = [];



		$scope.addNewEquipment = function() {

			if ($scope.newEquipment === "") {
				alert("Please enter equipment");
			}
			else {
				$scope.equipments.push($scope.newEquipment);
				$scope.newEquipment = "";
				$scope.EquipmentAdded = true;
			}
		};

		$scope.deleteEquipment = function(array, index) {

			if ($scope.equipments.length < 2) {
				$scope.equipmentAdded = false;
			}
			array.splice(index, 1);
		};

		$scope.newWorkout = {
			name: $scope.newWorkoutName,
			workoutType: $scope.newWorkoutType,
			exercises: $scope.exercises,
			equipment: $scope.equipments,
			level: $scope.level,
			time: $scope.estWorkoutTime,
			description: $scope.description
		};

		$scope.postNewWorkout = function() {

			workoutCreationSrvc.addNewWorkout($scope.newWorkout).then(function (data) {

				alert("Workout Added");
				$state.go('tab.workout-selection');

			});
		}
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


// ***HTML code for adding required equipment***

// <h4>Equipment</h4>

// <form ng-submit="addNewEquipment()">
// 	<input class="" ng-model="newEquipment" placeholder=""></input><br>
// </form>
// <button id="" ng-click="addNewEquipment()">Add Equipment</button>
// <ul>
// 	<li class="" ng-repeat="equipment in equipments track by $index" >{{ equipment }}<button id="" ng-click="delete(equipments, $index)">Remove</button></li>
// </ul>
