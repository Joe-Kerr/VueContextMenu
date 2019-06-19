const assert = require("assert");
const {getArrayElWIdxByIdFactory} = require("../../src/getters.js");

suite("getters.js");

const getArrayElWIdxById = getArrayElWIdxByIdFactory()

test("getArrayElWIdxByIdFactory returns a function", ()=>{
	assert.equal(typeof getArrayElWIdxById, "function");
});

test("getArrayElWIdxByIdFactory sets name and index prop of state", ()=>{
	const state = {custEls: [{id:1}], custIdx: {1:0}};
	const rightParams = getArrayElWIdxByIdFactory({container: "custEls", index: "custIdx"});
	assert.deepEqual(rightParams(state)(1), {id:1});
});

test("getArrayElWIdxByIdFactory throws if names of container or index not objects", ()=>{
	const state = {elements: [{id:1, a:2}], elIndex: {1:0}};
	
	const wrongContainer = getArrayElWIdxByIdFactory({container: "bollocks", index: "elIndex"});
	const wrongIndex = getArrayElWIdxByIdFactory({container: "elements", index: "bollocks"});
	
	assert.throws(()=>{ wrongIndex(state, {id:1, a:3}) }, {message: /Name of index/});
	assert.throws(()=>{ wrongContainer(state, {id:1, a:3}) }, {message: /Name of container/});
});


test("getArrayElWIdxById returns another function", ()=>{
	assert.equal(typeof getArrayElWIdxById({container: [], index: {}}), "function");
});

test("getArrayElWIdxById returns element from container by id", ()=>{
	const state = {container: [{id:2}, {id:1}, {id:3}], index: {2:0, 1:1, 3:2}};
	assert.deepEqual(getArrayElWIdxById(state)(1), {id:1});
});

test("getArrayElWIdxById returns null or predefined value if element not found", ()=>{
	const state = {container: [{id:2}, {id:1}, {id:3}], index: {2:0, 1:1, 3:2}};
	assert.equal(getArrayElWIdxById(state)(4), null);	
	
	const withNoResultSet = getArrayElWIdxByIdFactory({noResult: "empty"});
	assert.equal(withNoResultSet(state)(4), "empty");
});