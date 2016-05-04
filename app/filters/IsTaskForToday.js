define(['filters/TaskFilters'],function(TaskFilters){

	function IsTaskForToday(){
		return function(input){
			var out = [];
			angular.forEach( input, function(task){	
				if( TaskFilters.isForToday(task) )
					out.push(task);
			});
			return out;
		}
	}

	return IsTaskForToday;
});