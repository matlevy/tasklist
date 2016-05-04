define(['filters/TaskFilters'],function(TaskFilters){

	function IsTaskIncomplete(){
		return function(input){
			var out = [];
			angular.forEach( input, function(task){
				if( new TaskFilters().isNotComplete(task) )
					out.push(task);
			});
			return out;
		}
	}

	return IsTaskIncomplete;
});