const assert = require("assert");
const sample = require("../../src/ui/index.js").default;

suite("contextMenu/ui/index.js");

function getContextForPreventOutOfBounds() {
	return {
		rawPosition: {x: 500, y: 501},
		$refs: {contextMenu: {offsetWidth: 120, offsetHeight: 45}},
		x: 0,
		y: 0
	}
}

before(()=>{
	global.window = {
		pageXOffset: 100, //900
		pageYOffset: 400, //1000
		innerWidth: 800,
		innerHeight: 600
	};	
});

after(()=>{
	delete global.window;
});

test("default namespace is 'contextMenu'", ()=>{
	assert.equal(sample.data().namespace, "contextMenu");
});

test("computed.active calls store getter with proper namespace", ()=>{
	const $store = {getters: {"helloWorld/active": "id"}};
	const context = {namespace: "helloWorld", $store, menu: "id"};
	
	assert.equal(sample.computed.active.call(context), true);
	
	context.menu = null;
	assert.equal(sample.computed.active.call(context), false);
});

test("computed.context calls store getter with proper namespace", ()=>{
	const $store = {getters: {"helloWorld/context": "result"}};
	const context = {namespace: "helloWorld", $store};
	
	assert.equal(sample.computed.context.call(context), "result");	
});

test("computed.rawPosition calls store getter with proper namespace", ()=>{
	const $store = {getters: {"helloWorld/position": "result"}};
	const context = {namespace: "helloWorld", $store};
	
	assert.equal(sample.computed.rawPosition.call(context), "result");		
});

test("methods.closeByModal calls store dispatch with proper namespace", ()=>{
	let param;
	const namespace = "helloWorld";
	const context = {namespace, $store: {dispatch: (p)=>{param=p;}}};
	
	sample.methods.closeByModal.call(context)	
	assert.equal(param, "helloWorld/close");		
});

test("methods.modalStart calls modal if provided", ()=>{
	let called = 0;
	const modal = {start: ()=>{called++}}
	const context = {$options: {$_contextMenus_modal: modal}, $refs: {contextMenu: null}};
	
	sample.methods.modalStart.call(context);
	
	context.$options.$_contextMenus_modal = null;
	sample.methods.modalStart.call(context);
	
	assert.equal(called, 1);
});

test("methods.modalStop calls modal if provided", ()=>{
	let called = 0;
	const modal = {stop: ()=>{called++}}
	const context = {$options: {$_contextMenus_modal: modal}};
	
	sample.methods.modalStop.call(context);
	
	context.$options.$_contextMenus_modal = null;
	sample.methods.modalStop.call(context);
	
	assert.equal(called, 1);	
});

test("methods.preventOutOfBounds does nothing if within bounds", ()=>{
	const context = getContextForPreventOutOfBounds();
		
	sample.methods.preventOutOfBounds.call(context);
	assert.equal(context.x, 500);
	assert.equal(context.y, 501);
});

test("methods.preventOutOfBounds does nothing if x exactly on left bound", ()=>{
	const context = getContextForPreventOutOfBounds();
	
	context.rawPosition.x = 780;
	sample.methods.preventOutOfBounds.call(context);	
	assert.equal(context.x, 780);
	assert.equal(context.y, 501);	
});

test("methods.preventOutOfBounds corrects x if outside x-viewport", ()=>{
	const context = getContextForPreventOutOfBounds();
	
	context.rawPosition.x = 781;
	sample.methods.preventOutOfBounds.call(context);	
	assert.equal(context.x, 661);
	assert.equal(context.y, 501);		
});

test("methods.preventOutOfBounds does nothing if y exactly on bottom bound", ()=>{
	const context = getContextForPreventOutOfBounds();
	
	context.rawPosition.y = 955;
	sample.methods.preventOutOfBounds.call(context);	
	assert.equal(context.x, 500);
	assert.equal(context.y, 955);	
});

test("methods.preventOutOfBounds corrects y if outside y-viewport", ()=>{
	const context = getContextForPreventOutOfBounds();
	
	context.rawPosition.y = 956;
	sample.methods.preventOutOfBounds.call(context);	
	assert.equal(context.x, 500);
	assert.equal(context.y, 911);		
});

test("methods.preventOutOfBounds corrects both x and y if out of viewport", ()=>{
	const context = getContextForPreventOutOfBounds();
	
	context.rawPosition.x = 781;
	context.rawPosition.y = 956;
	sample.methods.preventOutOfBounds.call(context);
	assert.equal(context.x, 661);
	assert.equal(context.y, 911);	
});

test("methods.preventOutOfBounds corrects its correction if it went out of bounds", ()=>{
	const context = getContextForPreventOutOfBounds();
	context.$refs.contextMenu.offsetWidth = 401;
	context.$refs.contextMenu.offsetHeight = 301;
	
	//x/w: 100 --> 900
	//y/h: 400 --> 1000
	context.rawPosition.x = 500; //would go to 901, gets corrected to 99, gets re-corrected to 100
	context.rawPosition.y = 700; //would go to 1001, gets corrected to 399, gets re-corrected to 400
		
	sample.methods.preventOutOfBounds.call(context);
	assert.equal(context.x, 100);
	assert.equal(context.y, 400);
});


test("updated mediates calls only if menu is active", ()=>{
	let called = 0;
	const context = {
		active: true,
		modalStart: ()=>{called++},
		preventOutOfBounds: ()=>{called++}
	};
	
	sample.updated.call(context);
	
	context.active = false;
	sample.updated.call(context);	
	assert.equal(called, 2);
});

test("created overrides namespace if on $options", ()=>{
	const context = {namespace: "123", $options: {}, menu: 1};
	
	sample.created.call(context);	
	assert.equal(context.namespace, "123");
	
	context.$options.$_contextMenus_namespace = "456";
	sample.created.call(context);	
	assert.equal(context.namespace, "456");
});

test("created checks if 'menu' is set", ()=>{
	const context = {namespace: "123", $options: {}};
	
	assert.throws(()=>{sample.created.call(context);}, {message: /not set or empty/});
	context.menu = "";
	assert.throws(()=>{sample.created.call(context);}, {message: /not set or empty/});
});