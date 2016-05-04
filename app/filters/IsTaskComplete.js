define(['filters/TaskFilters'],function(TaskFilters){

	function IsTaskComplete(){
		return function(input){
			var out = [];
			angular.forEach( input, function(task){
				if( new TaskFilters().isComplete(task) )
					out.push(task);
			});
			return out;
		}
	}

	return IsTaskComplete;
});