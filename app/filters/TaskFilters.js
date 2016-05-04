define([],function(){

	function TaskFilters(){
		return {
			isForToday: function( task ){
				var _tommorow = moment().add(1,'d').hour(0).minutes(0);
				return task.getDueDate().isBefore( _tommorow );
			},
			isForTommorow: function( task ){
				var _tommorow = moment().add(1,'d').hour(0).minutes(0);
				var _tommorowEnd = moment().add(1,'d').hour(23).minutes(59);
				return task.getDueDate().isBetween( _tommorow, _tommorowEnd );
			},
			isForFuture: function( task ){
				var _tommorowEnd = moment().add(1,'d').hour(23).minutes(59);
				return ( task.getDueDate().isAfter( _tommorowEnd ) );
			},
			isComplete: function( task ){
				return task.getIsComplete();
			},
			isNotComplete: function( task ){
				return !task.getIsComplete();
			}
		}
	}

	return TaskFilters;
});