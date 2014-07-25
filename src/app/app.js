'use strict';

angular.module('happyAppy', ['ui.router', 'highcharts-ng'])

  .constant('AppConfig', {
    attributeState: 'happy'
  })

  .config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/appy/choose');

    $stateProvider
      .state('app', {
        url: '/appy',
        templateUrl: 'app/app.tpl.html',
        controller: 'MainCtrl'
      })
      .state('app.choose', {
        url: '/choose',
        templateUrl: "app/choose.tpl.html",
        controller: 'ChooseCtrl'
      })
      .state('app.happy', {
        url: "/happy",
        templateUrl: "app/happy.tpl.html",
        controller: 'HappyCtrl'
      })
      .state('app.sad', {
        url: '/sad',
        templateUrl: 'app/sad.tpl.html',
        controller: 'SadCtrl'
      })
  })
  .controller('MainCtrl', function($scope, $rootScope, AppConfig, $location) {
    console.log('main ctrl');
    $scope.state = AppConfig.attributeState;
    $location.url('/appy/choose');
  })
  .controller('ChooseCtrl', function($scope) {
    console.log('choose ctrl');
  })
  .controller('HappyCtrl', function($scope) {
    $scope.chartConfig = {
      "options": {
        "chart": {
          "type": "areaspline"
        },
        "plotOptions": {
          "series": {"stacking": ""}
        }
      },
      "series": [
        {
          "name": "Some data",
          "data": [1, 2, 4, 7, 3],
          "id": "series-0"
        },
        {
          "name": "Some data 3",
          "data": [3, 1, null, 5, 2],
          "connectNulls": true,
          "id": "series-1"
        },
        {
          "name": "Some data 2",
          "data": [5, 2, 2, 3, 5],
          "type": "column",
          "id": "series-2"
        },
        {
          "name": "My Super Column",
          "data": [1, 1, 2, 3, 2],
          "type": "column",
          "id": "series-3"
        }
      ],
      "title": {"text": "Happiness table"},
      "credits": {"enabled": false},
      "loading": false, "size": {}};
    console.log('happy ctrl');
  })
  .controller('SadCtrl', function($scope) {
    console.log('sad ctrl');

  });
