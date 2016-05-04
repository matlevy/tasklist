define([],function(){
    'use strict';

    function config($routeProvider) {
       $routeProvider
       .when( '/today', {
        templateUrl: "views/ToDoToday.html",
        controller: 'GetShitDoneController'
       })
       .when( '/tommorow', {
        templateUrl: "views/ToDoTommorow.html",
        controller: 'GetShitDoneController'
       })
       .when( '/someday', {
        templateUrl: "views/ToDoSomeDay.html",
        controller: 'GetShitDoneController'
       })
       .when( '/default', {
			   templateUrl: "views/ToDo.html",
			   controller: 'GetShitDoneController' } )
       .otherwise( { redirectTo: 'default' })
    }

    config.$inject=['$routeProvider'];

    return config;
});