const assert = require("assert");
const sample = require("../../src/directive.js").default;

suite("contextMenu/directive.js");

let inserted, unbind;
let dispatchCommand, dispatchData, dispatchCalled=0;
let addListenerCalled=0, removeListenerCalled=0;

const Vue = {directive: (name, config)=>{inserted = config.inserted; unbind = config.unbind;}};
const dispatch = (command, data) => {dispatchCommand = command; dispatchData = data; dispatchCalled++;}

const Event = {which: 3};
const El = {addEventListener: (name, callback)=>{callback(Event); addListenerCalled++}, removeEventListener: ()=>{removeListenerCalled++}};
const Context = {value: {menu: "testId", context: 123}};


sample(Vue, {dispatch}, "testNS");


//Tests are order-dependent.

test("Integration: inserted-listener-dispatch chain working", ()=>{	
	inserted(El, Context);	
	assert.equal(dispatchCalled, 1);
	assert.equal(dispatchCommand, "testNS/open");
	assert.deepEqual(Object.keys(dispatchData).sort(), ["context", "event", "menu"]);
	assert.equal(addListenerCalled, 1);
	
	Event.which = 1;
	inserted(El, Context);
	assert.equal(dispatchCalled, 1);
	assert.equal(addListenerCalled, 2);
});

test("unbind cleans up listeners or throws", ()=>{
	unbind(El, context);
	assert.equal(removeListenerCalled, 1);	
	
	unbind(El, context);
	assert.equal(removeListenerCalled, 2);
	
	assert.throws(()=>{unbind(El, Context);}, {message: /remove event listener/});
});

test("Dispatch only on left or right mouse button as provided in directive", ()=>{
	Event.which = 1;
	Context.modifiers = {right: true};
	inserted(El, Context);
	assert.equal(dispatchCalled, 1);
	
	Event.which = 3;
	Context.modifiers = {left: true};
	inserted(El, Context);
	assert.equal(dispatchCalled, 1);	
	
	Event.which = 3;
	Context.modifiers = {right: true};
	inserted(El, Context);
	assert.equal(dispatchCalled, 2);		
	
	Event.which = 1;
	Context.modifiers = {left: true};
	inserted(El, Context);
	assert.equal(dispatchCalled, 3);		
});