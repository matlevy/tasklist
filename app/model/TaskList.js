if ( typeof module !== 'undefined' && module.hasOwnProperty('exports') ){
	var moment = require("moment");
	var define = require("requirejs");
}

var TaskList = ( function(){

	var _firstTask = null;
	var _allTasks = [];
	var _allTasksAsObject = [];

	var _refresh = function(){
		var __currentTask = _firstTask;

		_allTasks.splice( 0, _allTasks.length );
		_allTasksAsObject.splice( 0, _allTasksAsObject.length );

		while( __currentTask && __currentTask.hasNextTask() ){
			_allTasks.push( __currentTask );
			_allTasksAsObject.push( __currentTask.serialize() );
			__currentTask = __currentTask.getNextTask();
		}

		if( __currentTask ){
			_allTasks.push( __currentTask );
			_allTasksAsObject.push( __currentTask.serialize() );
		}
	}

	return {
		appendTask: function( task ){
			
			if( _firstTask == null ){
				_firstTask = task;
			} else {
				var __currentTask = _firstTask;
				while( __currentTask.hasNextTask() ){
					__currentTask = __currentTask.getNextTask();
				}
				__currentTask.after( task );	
			}	

			_refresh();	

			return this;
		},
		insertTaskAt: function( task, index ){
			if( index < this.length() ){
				this.getTaskAt( index ).before( task );
			} else {
				this.appendTask( task );
			}
			if( index == 0 )
				_firstTask = task;
			_refresh();
			return this;
		},
		getTaskAt: function( index ){
			if( index >= this.length() )
				throw new Error( "index out of range.")
			if( index == 0 )
				return _firstTask;
			var __currentTask = _firstTask;
			var __index = 0;
			while( __currentTask != null && __currentTask != undefined ){
				if( index == __index )
					return __currentTask;
				__index++;
				__currentTask = __currentTask.getNextTask();
			}
			_refresh();
			return null;
		},
		removeTask: function( task ){
			if( this.getTaskAt(0) == task )
				_firstTask = _firstTask.getNextTask();
			task.unlink();
			_refresh();
			return this;
		},
		length: function(){
			var __currentTask = _firstTask;
			var __count = 0;

			if( _firstTask == null )
				return 0;

			__count+=1;

			while( __currentTask.hasNextTask() ){
				__count+=1;
				__currentTask = __currentTask.getNextTask();
			}
			_refresh();
			return __count;
		},
		moveTask: function( task, index ){
			this.removeTask( task );
			this.getTaskAt( index ).before( task );
			if( index == 0 )
				_firstTask = task
			_refresh();
			return this;
		},
		moveTaskAtIndex: function( index, new_index ){
			this.moveTask( this.getTaskAt(index), new_index );
		},
		getAllTasks: function(){
			return _allTasks;
		},
		getAllTasksAsObject: function(){
			return _allTasksAsObject;
		},
		getPercentageTasksCompleteForToday: function(){
			var __completed = this.getAllTasksDueToday().length - this.getTasksInCompleteForToday().length;
			return __completed / this.getAllTasksDueToday().length;
		}
	}
});

define([],function(){
	return TaskList;
})

if ( typeof module !== 'undefined' && module.hasOwnProperty('exports') )
{
    module.exports = TaskList;
}