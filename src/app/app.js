'use strict';

angular.module('happyAppy', ['ui.router'])

  .constant('AppConfig', {
    attributeState: 'happy'
  })

  .config(function($stateProvider, $urlRouterProvider) {
//    $routeProvider
//      .when('/smile', {
//        controller: 'MainCtrl',
//        templateUrl: 'app/app.tpl.html'
//      })
//      .when('/not-found', {
//        controller: 'SadCtrl',
//        templateUrl: 'app/not-found.tpl.html'
//      })
//      .otherwise({
//        redirectTo: '/not-found'
//      })

    $urlRouterProvider.otherwise("/appy/happy");

    $stateProvider
      .state('app', {
        url: "/",
        templateUrl: "app/app.tpl.html",
        controller: 'MainCtrl'
      })
      .state('app.happy', {
        url: "happy",
        templateUrl: "app/happy.tpl.html",
        controller: 'HappyCtrl'
      })
      .state('app.sad', {
        url: 'sad',
        templateUrl: 'app/sad.tpl.html',
        controller: 'SadCtrl'
      })
  })

  .controller('MainCtrl', function($scope, $rootScope, AppConfig) {
    $scope.state = AppConfig.attributeState;
  })

  .controller('HappyCtrl', function($scope) {
    console.log('happy ctrl');
  })
  .controller('SadCtrl', function($scope) {
    console.log('sad ctrl');

  });
