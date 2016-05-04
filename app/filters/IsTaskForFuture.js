define(['filters/TaskFilters'],function(TaskFilters){
	
	function IsTaskForFuture(){
		return function(input){
			var out = [];
			angular.forEach( input, function(task){
				if( TaskFilters.isForFuture(task) )
					out.push(task);
			});
			return out;
		};
	};

	return IsTaskForFuture;
});