'use strict';

angular.module('happyAppy', ['ngRoute'])

  .constant('AppConfig', {
    attributeState: 'happy'
  })

  .config(function($routeProvider) {
    $routeProvider
      .when('/smile', {
        controller: 'MainCtrl',
        templateUrl: 'app/app.tpl.html'
      })
      .when('/not-found', {
        controller: 'SadCtrl',
        templateUrl: 'app/not-found.tpl.html'
      })
      .otherwise({
        redirectTo: '/not-found'
      })
  })

  .controller('MainCtrl', function($scope, $routeParams, $rootScope, AppConfig) {
    $scope.state = AppConfig.attributeState;
  })

  .controller('SadCtrl', function($scope) {

  });
