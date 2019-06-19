const assert = require("assert");
const index = require("../../src/index.js");

suite("index.js");

test("expected exports provided", ()=>{
	assert.ok("default" in index);
	assert.ok("vuexHeman" in index);
	assert.ok("getters" in index);
	assert.ok("mutations" in index);
	assert.ok("actions" in index);
	
	const heman = index.vuexHeman;
	
	assert.ok("getters" in heman);
	assert.ok("mutations" in heman);
	assert.ok("actions" in heman);
	
	assert.ok("getArrayElWIdxByIdFactory" in heman.getters);
	
	assert.ok("setPropVal" in heman.mutations);
	assert.ok("setProps" in heman.mutations);
	assert.ok("setArrayElPropsByIdFactory" in heman.mutations);
	
	assert.ok("passThruActionsFactory" in heman.actions);
}); 