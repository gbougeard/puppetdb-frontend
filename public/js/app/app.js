/**
 * Created with IntelliJ IDEA.
 * User: gbougeard
 * Date: 17/11/12
 * Time: 01:17
 * To change this template use File | Settings | File Templates.
 */
'use strict';

var my_app = angular.module('my_app',
    [
        'ui',
        'my_app.controllers',
        'my_app.filters',
        'my_app.services',
        'my_app.directives'
    ]);

my_app.config(function ($routeProvider) {
    $routeProvider.
        when('/page1/', {
            controller: 'MyController',
            templateUrl: '/fragments/page1.html'
        }).
        when('/page2/', {
            controller: 'MyController',
            templateUrl: '/fragments/page2.html'
        }).
        //when('/new', {controller:CreateCtrl, templateUrl:'detail.html'}).
        otherwise({redirectTo: '/'});
});

my_app.value('ui.config', {
    tinymce: {
//       theme: 'simple'
       theme: 'advanced'
//        mode : "textareas",
//        plugins : "autolink,lists,spellchecker,pagebreak,style,layer,table,save,advhr,advimage,advlink,emotions,iespell,inlinepopups,insertdatetime,preview,media,searchreplace,print,contextmenu,paste,directionality,fullscreen,noneditable,visualchars,nonbreaking,xhtmlxtras,template",

    }
});









