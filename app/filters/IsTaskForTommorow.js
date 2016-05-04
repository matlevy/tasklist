define(['filters/TaskFilters'],function(TaskFilters){

	function IsTaskForTommorow(){
		return function(input){
			var out = [];
			angular.forEach( input, function(task){
				if( TaskFilters.isForTommorow(task) )
					out.push(task);
			});
			return out;
		};
	}

	return IsTaskForTommorow;
});