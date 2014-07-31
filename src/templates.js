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
    "\n" +
    "<p d3-bars bar-height=\"20\" bar-padding=\"5\" data=\"data\"></p>\n" +
    "\n" +
    "<highchart id=\"happiness-chart\" config=\"chartConfig\"></highchart>\n" +
    "\n" +
    "</p>\n" +
    "\n" +
    "\n"
  );


  $templateCache.put('app/not-found.tpl.html',
    "<h2>sad ): <a href=\"#/smile\"> better smile</a></h2>\n"
  );


  $templateCache.put('app/sad.tpl.html',
    "<section id=\"sad-graphs\" class=\"well\" ng-controller=\"SadCtrl as sadCtrl\">\n" +
    "\n" +
    "  <h1>Basic Graphs</h1>\n" +
    "\n" +
    "  <paper-button raisedbutton=\"\" class=\"start-job colored\"\n" +
    "                label=\"start mailing job\" role=\"button\" tabindex=\"0\"\n" +
    "                ng-class=\"{active : sadCtrl.isMailingJobActive}\"\n" +
    "                ng-click=\"sadCtrl.startMailingJob()\"\n" +
    "                aria-label=\"start mailing job\">\n" +
    "  </paper-button>\n" +
    "\n" +
    "  <funnel-chart\n" +
    "    height=\"600\"\n" +
    "    data=\"conversions\">\n" +
    "  </funnel-chart>\n" +
    "\n" +
    "</section>\n" +
    "\n"
  );

}]);
