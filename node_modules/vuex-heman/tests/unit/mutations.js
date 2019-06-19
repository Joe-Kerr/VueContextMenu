const assert = require("assert");
const {setPropVal, setProps, setArrayElPropsByIdFactory} = require("../../src/mutations.js");

suite("mutations.js");

const setArrayElById = setArrayElPropsByIdFactory();

test("setPropVal sets 'val' on state by 'prop'", ()=>{
	const state = {a: 1};
	
	setPropVal(state, {prop: "a", val: 2});
	assert.deepEqual(state, {a:2});
});

test("setPropVal throws if prop and val not provided", ()=>{
	assert.throws(()=>{ setPropVal(null); }, {message: /property on data/});
	assert.throws(()=>{ setPropVal({prop: 1}); }, {message: /property on data/});
	assert.throws(()=>{ setPropVal({val: 1}); }, {message: /property on data/});
});

test("setPropVal throws if prop not on state", ()=>{
	const state = {a: 1};
	assert.throws(()=>{ setPropVal(state, {prop: "b", val: 2});; }, {message: /non-existing property/});
});


test("setProps sets valid properties", ()=>{
	const state = {a:1, b:2, c:3};	
	setProps(state, {a:3, c:1})
	assert.deepEqual(state, {a:3, b:2, c:1});
});

test("setProps throws if undefined property", ()=>{
	assert.throws(()=>{ setProps({}, {d:4}); }, {message: /non-existing property/});
});

test("setProps sets all valid properties before it throws for invalid ones", ()=>{
	const state = {a:1, b:2, c:3};	
	assert.throws(()=>{ setProps(state, {a:10, b:20, c:30, d:4}); }, {message: /non-existing property/});	
	assert.deepEqual(state, {a:10, b:20, c:30});
});


test("setArrayElPropsByIdFactory returns a function", ()=>{
	assert.equal(typeof setArrayElPropsByIdFactory(), "function");
});

test("setArrayElPropsByIdFactory sets name and index prop of state", ()=>{
	const state = {custEls: [{id:1, a:456}], custIdx: {1:0}};
	const rightParams = setArrayElPropsByIdFactory({container: "custEls", index: "custIdx"});
	
	rightParams(state, {id:1, a: 123});	
	assert.equal(state.custEls[0].a, 123);	
});

test("setArrayElPropsByIdFactory throws if name of container or index not objects", ()=>{
	const state = {elements: [{id:1, a:2}], elIndex: {1:0}};
	
	assert.throws(()=>{ setArrayElPropsByIdFactory({container: "bollocks", index: "elIndex"})(state) }, {message: /Name of container/});
	assert.throws(()=>{ setArrayElPropsByIdFactory({container: "elements", index: "bollocks"})(state) }, {message: /Name of index/});
});

test("setArrayElById sets prop/val pairs on element in container by id", ()=>{
	const state = {
		container: [{id: 2, a:1, b:2}, {id: 1, a:10, b:20}],
		index: {2:0, 1:1}
	};
	
	setArrayElById(state, {id: 1, a: 11, b: 22});
	assert.deepEqual(state.container, [{id: 2, a:1, b:2}, {id: 1, a:11, b:22}]);
	assert.deepEqual(state.index, {2:0, 1:1}, "index untouched");
});

test("setArrayElById throws if id is missing on data", ()=>{
	const state = {container: [], index: {}};
	assert.throws(()=>{ setArrayElById(state, {anythingBut: "id"}); }, {message: /Missing id/});
});

test("setArrayElById throws if id not found in index", ()=>{
	const state = {container: [], index: {}};
	assert.throws(()=>{ setArrayElById(state, {id: 123}); }, {message: /Id not found in index/});
});

test("setArrayElById throws if a prop does not exist on element", ()=>{
	const state = {container: [{id:1, propE: 123}], index: {1:0}};
	assert.throws(()=>{ setArrayElById(state, {id: 1, bollocks: 456}); }, {message: /non-existing property/});
});

test("setArrayElById sets all valid props before it throws", ()=>{
	const state = {container: [{id:1, propE: 123}], index: {1:0}};	
	assert.throws(()=>{ setArrayElById(state, {id: 1, bollocks: 456, propE: 789}); });
	assert.equal(state.container[0].propE, 789);
});