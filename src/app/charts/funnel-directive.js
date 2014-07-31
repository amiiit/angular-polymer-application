angular.module('appy')
  .directive('funnelChart', function(d3Service, $window) {
    return {
      restrict: 'EA',
      scope: {
        data: '=',
        width: '=',
        height: '=',
        bottomPct: '='
      },
      controller: 'FunnelDiagramCtrl',
      link: function(scope, element) {

        var prepareData = function(data) {
          data.forEach(function(d, i) {
            data[i].i = i;
          });
          return data;
        };

        prepareData(scope.data);

        var executeDraw = function() {
          console.log('executeDraw', scope.data);
          angular.element(element).empty();
          var svg = d3.select(element[0]).append('svg')
            .attr('width', scope.width)
            .attr('height', scope.height);

          var colorScale = d3.scale.category10();

          var maxAmount = d3.max(scope.data, function(d) {
            return d.amount
          });
          var heightScale = d3.scale.linear()
              .domain([0, maxAmount])
              .range([0, scope.height])
            ;

          var xPosScale = d3.scale.linear()
            .domain([0, scope.data.length])
            .range([0, scope.width]);

          var rectWidth = scope.width / scope.data.length;
          var labelLeftMarginPx = 5;
          var middleLineY = scope.height / 2;
          //stack squares from left to right
          svg.selectAll('rect').data(scope.data).enter()
            .append('rect')
            .attr('width', rectWidth + 'px')
            .attr('height', function(d) {
              return heightScale(d.amount)
            })
            .attr('style', function(d) {
              return [
                  'fill: ' + colorScale(d.i)
              ].join('; ')
            })
            .attr('transform', function(d) {
              var translateX = xPosScale(d.i),
                translateY = middleLineY - heightScale(d.amount) / 2;
              return 'translate(' + translateX + ', ' + translateY + ')';
            });

          svg.selectAll('text').data(scope.data).enter()
            .append('text')
            .attr('transform', function(d) {
              var translateX = xPosScale(d.i) + 0 + labelLeftMarginPx;
              return 'translate(' + translateX + ', ' + middleLineY + ')';
            })
            .attr('width', rectWidth - labelLeftMarginPx)
            .attr('style', function(d) {
              return [
                'font-size: 16px'
              ].join('; ')
            })
            .text(function(d) {
              return d.title
            });

        };

        var draw = function() {
          d3Service.d3().then(executeDraw);
        };

//
//        $window.onresize = function() {
//          scope.$apply();
//        };
//
//        scope.$watch(function() {
//          return angular.element($window)[0].innerWidth;
//        }, function() {
//          draw();
//        });

        scope.$watch('data', function() {
          draw();
        }, true);

//        d3Service.d3().then(function() {
//          draw();
//        });
      }
    }
  })
  .controller('FunnelDiagramCtrl', function($scope) {

  });
