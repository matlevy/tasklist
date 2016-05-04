define([

    'config', 
    'control/GetShitDoneController',
    'directives/TaskItemDirective',
    'directives/TaskListDirective',
    'directives/TaskAdderDirective',
    'directives/NavigationDirective',
    'filters/IsTaskComplete',
    'filters/IsTaskIncomplete',
    'filters/IsTaskForToday',
    'filters/IsTaskForTommorow',
    'filters/IsTaskForFuture',
    'service/ShitToDoService',

    ],
    
    function( config, GetShitDoneController, TaskItemDirective, 
        TaskListDirective, TaskAdderDirective, NavigationDirective,
        IsTaskIncomplete, IsTaskComplete,
        IsTaskForFuture, IsTaskForTommorow, IsTaskForToday,
        ShitToDoService ){        
        var app = angular.module('getShitDoneApp', ['ngRoute']);
        app.config(config);
        app.controller('GetShitDoneController', GetShitDoneController);
        app.directive('taskItem', TaskItemDirective );
        app.directive('taskList', TaskListDirective );
        app.directive('taskAdder', TaskAdderDirective );
        app.directive('navigation', NavigationDirective );
        app.filter('isTaskIncomplete', IsTaskIncomplete );
        app.filter('isTaskComplete', IsTaskComplete );
        app.filter('isTaskForFuture', IsTaskForFuture );
        app.filter('isTaskForTommorow', IsTaskForTommorow );
        app.filter('isTaskForToday', IsTaskForToday );
        app.factory('ShitToDoService', ShitToDoService );
    }

);