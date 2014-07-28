angular.module('appy').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('app/app.tpl.html',
    "<core-header-panel>\n" +
    "  <core-toolbar id=\"mainheader\">\n" +
    "    <paper-icon-button id=\"navicon\"\n" +
    "                       icon=\"arrow-back\"></paper-icon-button>\n" +
    "    <span flex>Title</span>\n" +
    "    <paper-icon-button id=\"searchbutton\"\n" +
    "                       icon=\"search\"></paper-icon-button>\n" +
    "  </core-toolbar>\n" +
    "\n" +
    "  <div ui-view></div>\n" +
    "\n" +
    "</core-header-panel>\n"
  );


  $templateCache.put('app/choose.tpl.html',
    "<p>choose mood:\n" +
    "<a href=\"#/appy/happy\">happy</a>\n" +
    "<a href=\"#/appy/sad\">sad</a>\n" +
    "</p>\n"
  );


  $templateCache.put('app/happy.tpl.html',
    "<p>\n" +
    "  <highchart id=\"happiness-chart\" config=\"chartConfig\"></highchart>\n" +
    "</p>\n" +
    "\n" +
    "\n"
  );


  $templateCache.put('app/not-found.tpl.html',
    "<h2>sad ): <a href=\"#/smile\"> better smile</a></h2>\n"
  );


  $templateCache.put('app/sad.tpl.html',
    "<section id=\"graphs\" class=\"well\">\n" +
    "  <h1>Basic Graphs</h1>\n" +
    "\n" +
    "  <p d3-bars bar-height=\"20\" bar-padding=\"5\" data=\"data\"></p>\n" +
    "\n" +
    "\n" +
    "</section>\n" +
    "\n"
  );

}]);
