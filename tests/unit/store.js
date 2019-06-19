const assert = require("assert");
const sample = require("../../src/store/index.js").default;

suite("contextMenu/store/index.js");

test("getters.active returns active", ()=>{	
	assert.equal(sample.getters.active({active: 123}), 123);
});

test("getters.context returns context", ()=>{
	assert.equal(sample.getters.context({context: 123}), 123);
});

test("getters.position returns x,y", ()=>{
	assert.deepEqual(sample.getters.position({x: 123, y: 456}), {x: 123, y: 456});
});


test("mutations.set uses correct function", ()=>{
	assert.equal(sample.mutations.set.name, "setProps");
});


test("actions.open commits and resolves true if opening successful", async ()=>{
	let called = 0;
	const commit = ()=>{called++};
	const data = {menu:1, event: {pageX: 1, pageY: 2}};
	
	assert.equal(await sample.actions.open({commit}, data), true);
	assert.equal(called, 1);
	
});

test("actions.open throws if menu not provided", async ()=>{
	await assert.rejects(async ()=>{ await sample.actions.open(null); });
	await assert.rejects(async ()=>{ await sample.actions.open(null, {}); });
});

test("actions.open throws if event not provided [properly]", async ()=>{
	await assert.rejects(async ()=>{ await sample.actions.open(null, {id:1}) });
	await assert.rejects(async ()=>{ await sample.actions.open(null, {id:1, event: {pageX: 1, pageY: "2"}}) });
	await assert.rejects(async ()=>{ await sample.actions.open(null, {id:1, event: {pageX: 1, pageY: "2"}}) });
	await assert.rejects(async ()=>{ await sample.actions.open(null, {id:1, event: {pageX: "1", pageY: 2}}) });
	await assert.rejects(async ()=>{ await sample.actions.open(null, {id:1, event: {pageY: 2}}) });
	await assert.rejects(async ()=>{ await sample.actions.open(null, {id:1, event: {pageX: 2}}) });
});

test("actions.close commits and resolves true", async ()=>{
	let called = 0;
	const commit = ()=>{called++};
	
	assert.equal(await sample.actions.close({commit}), true);
	assert.equal(called, 1);	
});