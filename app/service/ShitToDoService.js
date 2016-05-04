define([

	'model/TaskList',
	'model/Task'

	],function(TaskList,Task){
	
	function ShitToDoService(){

		var _tasks = new TaskList();
		var _savedTasks = JSON.parse( localStorage.getItem("aaa") );

		console.log( _savedTasks )

		angular.forEach( _savedTasks, function(item,index){
			var __task = new Task( item.name );
			__task.deserialize(item);
			_tasks.appendTask( __task );
		})

		return {
			tasks: _tasks,
			save: function(){
				console.log( _tasks.getAllTasksAsObject() );
				console.log( JSON.stringify( _tasks.getAllTasksAsObject() ) );
				localStorage.setItem("aaa", JSON.stringify( _tasks.getAllTasksAsObject() ) );
			},
			load: function(){
				return localStorage.getItem("aaa");
			}
		}
	}

	return ShitToDoService;
})