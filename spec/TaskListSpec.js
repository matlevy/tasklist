require("../inc/testInc.js");

var Task = require("../app/model/Task.js");
var TaskList = require("../app/model/TaskList.js");

describe( "TaskList", function(){

	var __list = new TaskList();

	beforeEach( function(){
		__list = new TaskList();
	})

	it( "should work", function(){
		new Task();
		new TaskList();
	});

	it( "should append a task and return the correct count", function(){
		
		__list.appendTask( new Task() );
		expect( __list.length() ).toBe( 1 );
		__list.appendTask( new Task() );
		expect( __list.length() ).toBe( 2 );
		__list.appendTask( new Task() );
		expect( __list.length() ).toBe( 3 );
		__list.appendTask( new Task() );
		expect( __list.length() ).toBe( 4 );

		__list.appendTask( new Task() ).appendTask( new Task() ).appendTask( new Task() );

		expect( __list.length() ).toBe( 7 );
	})

	it( "should remove a task and return the correct count", function(){
		var __r = new Task("b");
		__list.appendTask( new Task("a") ).appendTask( __r ).appendTask( new Task("c") );

		expect( __list.length() ).toBe(3);
		__list.removeTask( __r );
		expect( __list.length() ).toBe(2);
		__list.removeTask( new Task() );
		expect( __list.length() ).toBe(2);

	});

	it( "should have the same count for the array return for all tasks as the count", function(){
		var __r = new Task("b");
		__list.appendTask( new Task() ).appendTask( new Task() ).appendTask( new Task() );
		expect( __list.length() ).toBe( __list.getAllTasks().length );
		__list.appendTask( new Task("a") ).appendTask( __r ).appendTask( new Task("c") );
		expect( __list.length() ).toBe( __list.getAllTasks().length );
		__list.removeTask( __r );
		expect( __list.length() ).toBe( __list.getAllTasks().length );
	})

	it( "should set the next and previous tasks of a task to null when they are removed", function(){
		var __a = new Task("a");
		var __b = new Task("b");
		var __c = new Task("c");
		__list.appendTask( __a ).appendTask( __b ).appendTask( __c );
		__list.removeTask( __a );
		__list.removeTask( __b );
		__list.removeTask( __c );

		expect( __a.getNextTask() ).toBe( null );
		expect( __a.getPreviousTask() ).toBe( null );

		expect( __b.getNextTask() ).toBe( null );
		expect( __b.getPreviousTask() ).toBe( null );

		expect( __c.getNextTask() ).toBe( null );
		expect( __c.getPreviousTask() ).toBe( null );
	});

	it( "should return the correct task at a given index", function(){
		var __a = new Task("a");
		var __b = new Task("b");
		var __c = new Task("c");
		__list.appendTask( __a ).appendTask( __b ).appendTask( __c );
		expect( __list.getTaskAt( 1 ) ).toBe( __b );
		__list.removeTask( __a );
		expect( __list.getTaskAt( 1 ) ).toBe( __c );
		__list.removeTask( __b );
		expect( function(){ __list.getTaskAt( 1 ) } ).toThrow();
		__list.appendTask( __a ).appendTask( __b );
		expect( __list.getTaskAt( 2 ) ).toBe( __b );
	})

	it( "should append a task at a given index correctly", function(){
		var __a = new Task("a");
		var __b = new Task("b");
		var __c = new Task("c");
		var __d = new Task("d");
		var __e = new Task("e");
		var __f = new Task("f");
		__list.appendTask( __a ).appendTask( __b ).appendTask( __c );
		__list.insertTaskAt( __d, 0 );
		expect( __list.getTaskAt( 0 ) ).toBe( __d );
		__list.insertTaskAt( __e, 1 );
		expect( __list.getTaskAt( 1 ) ).toBe( __e );
		__list.insertTaskAt( __f, __list.length()+1 );
		expect( __list.getTaskAt( __list.length()-1 ) ).toBe( __f );
	});

	it( "should move a task to a new index correctly", function(){
		var __a = new Task("a");
		var __b = new Task("b");
		var __c = new Task("c");
		__list.appendTask( __a ).appendTask( __b ).appendTask( __c );
		__list.moveTaskAtIndex( 0, 1 );
		expect( __list.getTaskAt(1) ).toBe( __a );
		__list.moveTaskAtIndex( 1, 0 );
		expect( __list.getTaskAt(0) ).toBe( __a );
	});

	xit( "should return only tasks for today when queried", function(){
		__list.appendTask( new Task() ).appendTask( new Task() ).appendTask( new Task() );
		expect( __list.getAllTasksDueToday().length ).toBe(3);
		__list.appendTask( new Task().setDueTommorow() );
		expect( __list.getAllTasksDueToday().length ).toBe(3);
		__list.appendTask( new Task() );
		expect( __list.getAllTasksDueToday().length ).toBe(4);
		var __x = new Task();
		__list.appendTask( __x );
		expect( __list.getAllTasksDueToday().length ).toBe(5);
		__x.setDueTommorow();
		expect( __list.getAllTasksDueToday().length ).toBe(4);
	});

	xit( "should return only task due for tommorow when asked", function(){
		__list.appendTask( new Task() ).appendTask( new Task() ).appendTask( new Task() );
		expect( __list.getAllTasksDueTommorow().length ).toBe(0);
		__list.appendTask( new Task().setDueTommorow() );
		expect( __list.getAllTasksDueTommorow().length ).toBe(1);
		__list.appendTask( new Task() );
		expect( __list.getAllTasksDueTommorow().length ).toBe(1);
		var __x = new Task();
		__list.appendTask( __x );
		expect( __list.getAllTasksDueTommorow().length ).toBe(1);
		__x.setDueTommorow();
		expect( __list.getAllTasksDueTommorow().length ).toBe(2);
	});

	xit( "should return any tasks due for completion after tommorow when asked", function(){
		__list.appendTask( new Task() ).appendTask( new Task() ).appendTask( new Task() );
		expect( __list.getAllTasksDueFurtherForward().length ).toBe(0);
		__list.appendTask( new Task().setDueTommorow() );
		expect( __list.getAllTasksDueFurtherForward().length ).toBe(0);
		__list.appendTask( new Task().setDueNextWeek() );
		expect( __list.getAllTasksDueFurtherForward().length ).toBe(1);
		__list.appendTask( new Task().setDueTommorow().delayByADay().delayByADay().delayByADay() );
		expect( __list.getAllTasksDueFurtherForward().length ).toBe(2);
	});

	xit( "should correctly return tasks not done for today", function(){
		var __a = new Task("a");
		var __b = new Task("b");
		var __c = new Task("c");
		__list.appendTask( __a ).appendTask( __b ).appendTask( __c );
		__a.setTaskComplete();
		expect( __list.getTasksInCompleteForToday().length ).toBe( 2 );
		__a.setTaskIncomplete();
		expect( __list.getTasksInCompleteForToday().length ).toBe( 3 );
		__a.setTaskComplete();
		expect( __list.getTasksInCompleteForToday().length ).toBe( 2 );
		__c.setDueTommorow();
		expect( __list.getTasksInCompleteForToday().length ).toBe( 1 );
	});

	xit( "should correctly return tasks done for today", function(){
		var __a = new Task("a");
		var __b = new Task("b");
		var __c = new Task("c");
		__list.appendTask( __a ).appendTask( __b ).appendTask( __c );
		__a.setTaskComplete();
		expect( __list.getTasksCompleteForToday().length ).toBe( 1 );
		__a.setTaskIncomplete();
		expect( __list.getTasksCompleteForToday().length ).toBe( 0 );
		__a.setTaskComplete();
		expect( __list.getTasksCompleteForToday().length ).toBe( 1 );
		__c.setDueTommorow();
		expect( __list.getTasksCompleteForToday().length ).toBe( 1 );
	});

	xit( "should correctly return percentage done for today", function(){
		var __a = new Task("a");
		var __b = new Task("b");
		var __c = new Task("c");
		__list.appendTask( __a ).appendTask( __b ).appendTask( __c );
		__a.setTaskComplete();
		expect( __list.getPercentageTasksCompleteForToday() ).toBe( 1/3 );
		__a.setTaskIncomplete();
		expect( __list.getPercentageTasksCompleteForToday() ).toBe( 0 );
		__a.setTaskComplete();
		expect( __list.getPercentageTasksCompleteForToday() ).toBe( 1/3 );
		__c.setDueTommorow();
		expect( __list.getPercentageTasksCompleteForToday() ).toBe( 1/2 );
	});
})