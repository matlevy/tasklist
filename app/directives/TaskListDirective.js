define([
	], function(){


	function TaskList(){
		return {
			scope: {
				tasks: "=",
				label: "@",
				taskFilter: "=",
			},
			templateUrl: 'views/TaskList.html'
		}
	}

	return TaskList;
});