require("../inc/testInc.js");

var Task = require("../app/model/Task.js");
var moment = require("moment");

describe( "Task", function(){
	it( "should work", function(){
		new Task();
	})

	it( "should set the task name in the constructor", function(){
		var __t = new Task("this is my task");
		expect( __t.getTaskName() ).toBe("this is my task");
	})

	it( "should change the task name when asked", function(){
		var __t = new Task("a");
		expect( __t.getTaskName() ).toBe( "a" );
		__t.setTaskName("b");
		expect( __t.getTaskName() ).toBe( "b" );
	})

	it( "should be set incomplete on construction", function(){
		var __t = new Task();
		expect( __t.getIsComplete() ).toBe( false );	
	})

	it( "should return true on the completion marker if the task is marked as complete", function(){
		var __t = new Task();
		expect( __t.getIsComplete() ).toBe( false );
		__t.setTaskComplete();
		expect( __t.getIsComplete() ).toBe( true );
		__t.setTaskIncomplete();
		expect( __t.getIsComplete() ).toBe( false );
	})

	it( "should set the next task when called", function(){
		var __a = new Task('a'	);
		var __b = new Task('b');
		__a.setNextTask( __b );
		expect( __a.getNextTask() ).toBe( __b );
	})

	it( "should set the previous task when called", function(){
		var __a = new Task('a');
		var __b = new Task('b');
		__a.setPreviousTask( __b );
		expect( __a.getPreviousTask() ).toBe( __b );
	})

	it( "should set the default task date to today at 9am", function(){
		var __t = new Task();
		expect( __t.getDueDate().format('DD-MM-YY') ).toBe( moment().format('DD-MM-YY') );
		expect( __t.getDueDate().format('hh:mm') ).toBe("09:00");
	})

	it( "should set the due date to tommorow when asked", function(){
		var __t = new Task();
		expect( __t.setDueTommorow().getDueDate().format('DD-MM-YY') ).toBe( moment().add(1,'d').format('DD-MM-YY') );
	})

	it( "should set the due date to the same day next week when asked", function(){
		var __t = new Task();
		expect( __t.setDueNextWeek().getDueDate().format('DD-MM-YY') ).toBe( moment().add(1,'w').format('DD-MM-YY') );
	})

	it( "should increment dalay days correctly", function(){
		var __t = new Task();
		__t.delayByADay();
		__t.delayByADay();
		__t.delayByADay();
		expect( __t.getDueDate().format('DD-MM-YY') ).toBe( moment().add(3,'d').format('DD-MM-YY') );
	});

	it( "should increment dalay weeks correctly", function(){
		var __t = new Task();
		__t.delayByAWeek();
		__t.delayByAWeek();
		__t.delayByAWeek();
		expect( __t.getDueDate().format('DD-MM-YY') ).toBe( moment().add(3,'w').format('DD-MM-YY') );
	});

})