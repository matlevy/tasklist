define([

	'model/Task',
	'model/TaskList',
	'filters/TaskFilters'

	], function(Task, TaskList, TaskFilters, ShitToDoService){
    'use strict';

    function GetShitDoneController( $scope, $routeParams, $location, ShitToDoService ){
        $scope.taskList = ShitToDoService.tasks;
		$scope.taskList.filters = new TaskFilters();
		$scope.newShit = "";

		$scope.addNewTask = function( task_name, when ){
			if( task_name != "" && task_name != undefined ){
				var task = new Task( task_name );
				switch( when ){
					case 1:
						task.setDueTommorow();
						$location.path('/tommorow')
						break;
					case 2:
						task.setDueNextWeek();
						$location.path('/someday')
						break;
					default:
						task.setDueToday();
						$location.path('/today')
				};
				$scope.taskList.appendTask( task );
				$scope.newShit = "";
			}
			ShitToDoService.save();
		}

		$scope.$on( 'task.add_new', function( e, name, type, parent ){
			if( name!="" ){
				if( parent ){
					$scope.addNewChildTask( parent, name )
				} else {
					$scope.addNewTask( name, type );
				}
			}
		});

		$scope.$on( 'task.remove', function( e, task ){
			$scope.taskList.removeTask( task );
			ShitToDoService.save();
		});

		$scope.$on( 'task.done', function( e, task ){
			task.setTaskComplete();
			ShitToDoService.save();
		})

		$scope.$on( 'task.not_done', function( e, task ){
			task.setTaskIncomplete();
			ShitToDoService.save();
		})

    }

    GetShitDoneController.$inject=['$scope','$routeParams','$location','ShitToDoService'];

    return GetShitDoneController;
});