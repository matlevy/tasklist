if ( typeof module !== 'undefined' && module.hasOwnProperty('exports') ){
	var moment = require("moment");
	var define = require("requirejs");
}

var Task = ( function( name, the_next_task ){

	var _task = name;
	var _subTasks = null;
	var _complete = false;
	var _due = false;
	var _nextTask = the_next_task || null;
	var _previousTask = null;
	var _this = this;

	var _due = moment();

	_due.hour( 9 );
	_due.minutes( 0 );

	return {
		name: _task,
		getDueDate: function(){
			return _due;
		},
		setTaskName: function( name ){
			_task = name;
			return this;
		},
		getTaskName: function(){
			return _task;
		},
		setTaskComplete: function() {
			_complete = true;
			return this;
		},		
		addSubTask: function( task ){
			if( _subTasks == null )
				_subTasks = new TaskList();
			_subTasks.appendTask( task );
		},
		removeSubTask: function( task ){
			if( _subTasks == null )
				throw new Error("Subtask list empty");
			_subTasks.removeTask( task );
		},
		getSubTasks: function(){
			if( _subTasks == null )
				return [];
			return _subTasks.getAllTasks();
		},
		setTaskIncomplete: function() {
			_complete = false;
			return this;
		},
		getIsComplete: function(){
			if( _subTasks == null )
				return _complete;
			return _complete && _subTasks.getAreTasksComplete();
		},
		unlink: function(){
			if( this.hasPreviousTask() ){
				this.getPreviousTask().setNextTask( this.getNextTask() );
			}
			if( this.hasNextTask() ){
				this.getNextTask().setPreviousTask( this.getPreviousTask() );
			}
			this.setNextTask( null );
			this.setPreviousTask( null );
		},
		before: function( task ){
			if( this.hasPreviousTask() ) 
				this.getPreviousTask().setNextTask( task );
			task.setNextTask( this );
			task.setPreviousTask( this.getPreviousTask() );
			this.setPreviousTask( task );
		},
		after: function( task ){
			if( this.hasNextTask() ) 
				this.getNextTask().setNextTask( task );
			task.setPreviousTask( this );
			task.setNextTask( this.getNextTask() );
			this.setNextTask( task );
		},
		setNextTask: function( task ){
			_nextTask = task;
			return this;
		},
		getNextTask: function(){
			return _nextTask;
		},
		hasNextTask: function(){
			return _nextTask!=null;
		},
		setPreviousTask: function( task ){
			_previousTask = task;
			return this;
		},
		getPreviousTask: function(){
			return _previousTask;
		},
		hasPreviousTask: function(){
			return _previousTask!=null;
		},
		serialize: function(){
			return {
				name: _task,
				due: _due.format('x'),
				complete: this.getIsComplete()
			}
		},
		deserialize: function( obj ){
			this.setTaskName( obj.name );
			console.log( obj.complete );
			if(obj.complete){
				console.log( obj.complete );
				this.setTaskComplete();
			}
			this.setDueDate( moment(obj.due,'x') );
		},
		//
		setDueToday: function(){
			_due = moment();
			return this;
		},
		setDueTommorow: function(){
			this.setDueToday();
			_due.add( 1, 'd' );
			return this;
		},
		setDueNextWeek: function(){
			this.setDueToday();
			_due = moment().add( 1, 'w' );
			return this;
		},
		setDueDate: function( due ){
			_due = due;
			return this;
		},
		delayByADay: function(){
			_due.add( 1, 'd' );
			return this;
		},
		delayByAWeek: function(){
			_due.add( 1, 'w')
			return this;
		}
	}
});

define([],function(){
	return Task;
})

if ( typeof module !== 'undefined' && module.hasOwnProperty('exports') )
{
    module.exports = Task;
}