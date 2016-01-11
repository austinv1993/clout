angular.module('clout', ['ionic', 'clout.controllers', 'clout.services'])

  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {

        StatusBar.styleDefault();
      }
    });
  })

  .config(function ($stateProvider, $urlRouterProvider) {


    $stateProvider

      .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html'
      })
      .state('tab.workout-creation', {
        url: '/workout-creation',
        views: {
          'tab-workout-creation': {
            templateUrl: 'templates/tab-workout-creation.html',
            controller: 'workoutCreationCtrl'
          }
        }
      })
      .state('tab.account', {
        url: '/account',
        views: {
          'tab-account': {
            templateUrl: 'templates/tab-account.html',
            controller: 'accountCtrl'
          }
        }
      })
      .state('tab.workout-selection', {
        url: '/workout-selection',
        views: {
          'tab-workout-selection': {
            templateUrl: 'templates/tab-workout-selection.html',
            controller: 'workoutSelectionCtrl'
          }
        }
      })
      .state('view-workout', {
        url: '/view-workout/:workoutId',
        templateUrl: './templates/view-workout.html',
        controller: 'viewWorkoutCtrl'
        
      })
      .state('timer', {
        url: '/timer',
        templateUrl: 'templates/timer.html',
        controller: 'timerCtrl'
      })


    $urlRouterProvider.otherwise('/tab/workout-creation');



  });
