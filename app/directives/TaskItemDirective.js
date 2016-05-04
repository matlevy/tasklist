define([
	], function(){


	function TaskItem(){
		return {
			scope: {
				task: "="
			},
			templateUrl: 'views/Task.html',
			link: function($scope,$element,$attributes){
				$scope.removeTask = function(){
					$scope.$emit( 'task.remove', $scope.task );
				};
				$scope.markDone = function(){
					$scope.$emit( 'task.done', $scope.task );
				}
				$scope.markNotDone = function(){
					$scope.$emit( 'task.not_done', $scope.task );
				}
			}
		};
	};

	return TaskItem;
});