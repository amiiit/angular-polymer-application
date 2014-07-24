angular.module('happyAppy').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('app/app.tpl.html',
    "<h2>sonrisa (;</h2>\n"
  );


  $templateCache.put('app/not-found.tpl.html',
    "<h2>sad ): <a href=\"#/smile\"> better smile</a></h2>\n"
  );

}]);
