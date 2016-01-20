angular.module('clout', ['ionic','ionic.service.core', 'clout.controllers', 'clout.services', 'ui.router'])

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

  .config(function ($stateProvider, $urlRouterProvider, $httpProvider) {


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
	  .state('workout-favorites', {
        url: '/workout-favorites',
        templateUrl: 'templates/workout-favorites.html',
        controller: 'workoutFavoritesCtrl'
      })
      .state('view-workout', {
        url: '/view-workout/:workoutId',
        templateUrl: 'templates/view-workout.html',
        controller: 'viewWorkoutCtrl'
      })
    //   .state('start-workout', {
    //     url: '/start-workout/:workoutId',
    //     templateUrl: 'templates/active-workout-view.html',
    //     controller: ''
    //   })
      .state('timer', {
        url: '/timer/:workoutId',
        templateUrl: 'templates/timer.html',
        controller: 'timerCtrl'
      })



      .state('active-view', {
        url: '/active-view/:workoutId',
        templateUrl: 'templates/active-view.html',
        controller: 'activeViewCtrl'
      })

      .state('workoutComplete', {
        url: '/workoutComplete',
        templateUrl: 'templates/workoutComplete.html'
      })
      .state('login', {
          url: '/login',
          templateUrl: 'templates/login-register.html',
          controller: 'loginCtrl'
      })



  $urlRouterProvider.otherwise('/login')
  $httpProvider.interceptors.push('AuthInterceptor');





  });
