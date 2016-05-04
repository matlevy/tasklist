define([
	], function(){


	function TaskAdder(){
		return {
			scope: {
				taskName: "=",
				canSetDate: "@",
				insertEvent:'@',
				parentTask: "=?"
			},
			templateUrl: 'views/TaskAdder.html',
			link: function( $scope, $element, $attributes ){
				$scope.addNewTask = function( due ){
					$scope.$emit( 'task.add_new', $scope.taskName, due, $scope.parentTask );
					$scope.taskName = "";
				}
			}
		}
	}

	return TaskAdder;
});