angular.module('appy')
  .directive('funnelChart', function(d3Service) {
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

        var DEFAULT_HEIGHT = 400,
          DEFAULT_WIDTH = 600,
          DEFAULT_BOTTOM_PERCENT = 1 / 3,
          area, prevBaseLength, nextBaseLength, nextLeftX, nextRightX, nextHeight;

        scope.totalEngagement = 0;
        for (var i = 0; i < scope.data.length; i++) {
          scope.totalEngagement += scope.data[i][1];
        }
        scope.width = typeof scope.width !== 'undefined' ? scope.width : DEFAULT_WIDTH;
        scope.height = typeof scope.height !== 'undefined' ? scope.height : DEFAULT_HEIGHT;
        var bottomPct = typeof scope.bottomPct !== 'undefined' ? scope.bottomPct : DEFAULT_BOTTOM_PERCENT;

        var _slope = 2 * scope.height / (scope.width - bottomPct * scope.width);
        var _totalArea = (scope.width + bottomPct * scope.width) * scope.height / 2;

        var getLabel = function(ind) {
          /* Get label of a category at index 'ind' in this.data */
          return scope.data[ind][0]
        };

        var getEngagementCount = function(ind) {
          /* Get engagement value of a category at index 'ind' in this.data */
          return scope.data[ind][1]
        };

        var createPaths = function() {
          /* Returns an array of points that can be passed into d3.svg.line to create a path for the funnel */
          var trapezoids = [];

          var findNextPoints = function(prevLeftX, prevRightX, prevHeight, dataInd) {
            // reached end of funnel
            if (dataInd >= scope.data.length) return;

            // math to calculate coordinates of the next base
            area = scope.data[dataInd][1] * _totalArea / scope.totalEngagement;
            prevBaseLength = prevRightX - prevLeftX;
            nextBaseLength = Math.sqrt((_slope * prevBaseLength * prevBaseLength - 4 * area) / _slope);
            nextLeftX = (prevBaseLength - nextBaseLength) / 2 + prevLeftX;
            nextRightX = prevRightX - (prevBaseLength - nextBaseLength) / 2;
            nextHeight = _slope * (prevBaseLength - nextBaseLength) / 2 + prevHeight;

            var points = [
              [nextRightX, nextHeight]
            ];

            points.push([prevRightX, prevHeight]);
            points.push([prevLeftX, prevHeight]);
            points.push([nextLeftX, nextHeight]);
            points.push([nextRightX, nextHeight]);
            trapezoids.push(points);

            findNextPoints(nextLeftX, nextRightX, nextHeight, dataInd + 1);
          };

          findNextPoints(0, scope.width, 0, 0);
          return trapezoids;
        };

        var draw = function(elem, speed) {
          console.log('draw', elem, speed);
          var DEFAULT_SPEED = 2.5;
          speed = typeof speed !== 'undefined' ? speed : DEFAULT_SPEED;

          var funnelSvg = d3.select(elem).append('svg:svg')
            .attr('width', scope.width)
            .attr('height', scope.height)
            .append('svg:g');

          // Creates the correct d3 line for the funnel
          var funnelPath = d3.svg.line()
            .x(function(d) {
              return d[0];
            })
            .y(function(d) {
              return d[1];
            });

          // Automatically generates colors for each trapezoid in funnel
          var colorScale = d3.scale.category10();

          var paths = createPaths();
          console.log('paths', paths);
          var drawTrapezoids = function(i) {
            console.log('drawTrapezoids', i);
            var trapezoid = funnelSvg
              .append('svg:path')
              .attr('d', function(d) {
                return funnelPath([paths[i][0], paths[i][1], paths[i][2], paths[i][2], paths[i][1], paths[i][2]])
              })
              .attr('fill', '#fff');

            nextHeight = paths[i][[paths[i].length] - 1];

            var totalLength = trapezoid.node().getTotalLength();
            console.log('totalLengt', totalLength);
            var transition = trapezoid
              .transition()
              .duration(totalLength / speed)
              .ease("linear")
              .attr("d", function(d) {
                return funnelPath(paths[i])
              })
              .attr("fill", function(d) {
                return colorScale(i)
              });

            funnelSvg
              .append('svg:text')
              .text(getLabel(i) + ': ' + getEngagementCount(i))
              .attr("x", function(d) {
                return scope.width / 2
              })
              .attr("y", function(d) {
                return (paths[i][0][1] + paths[i][1][1]) / 2
              }) // Average height of bases
              .attr("text-anchor", "middle")
              .attr("dominant-baseline", "middle")
              .attr("fill", "#fff");

            console.log('i', i);
            if (i < paths.length - 1) {
              transition.each('end', function() {
                drawTrapezoids(i + 1)
              })
            }
          };
          drawTrapezoids(0);
        };

        d3Service.d3().then(function() {
          draw(element[0], 200);
        });
      }}
  })
  .controller('FunnelDiagramCtrl', function($scope) {

  });
