const assert = require("assert");

const {getArrayElWIdxByIdFactory} = require("../../src/getters.js");
const {setPropVal, setArrayElPropsByIdFactory} = require("../../src/mutations.js");
const {passThruActionsFactory} = require("../../src/actions.js");

const {createLocalVue} = require("@vue/test-utils");
const Vuex = require("vuex");

createLocalVue().use(Vuex);

const storeObj = {
	state: {
		els: [{id:2, a:11}, {id:1, a:22}, {id:3, a:33}],
		idx: {1:1, 2:0, 3:1},
		init: false
	},
	
	getters: {
		getElById: getArrayElWIdxByIdFactory({container: "els", index: "idx", noResult: "empty"})
	},
	
	mutations: {
		set: setPropVal,
		setEl: setArrayElPropsByIdFactory({container: "els", index: "idx"})
	},
	
	actions: {
		set1: passThruActionsFactory("set"),
		
		...passThruActionsFactory(["set"]),
		
		...passThruActionsFactory({set2: "set", setEl: "setEl"})
	}
}
const store = new Vuex.Store(storeObj);

suite("Integration tests on Vuex instance");

beforeEach(()=>{
	store.dispatch("set", {prop: "init", val: false});
	assert.equal(store.state.init, false);
});

test("Set init with set1 action", ()=>{
	store.dispatch("set1", {prop: "init", val: true});
	assert.equal(store.state.init, true);
});

test("Set init with set2 action", ()=>{
	store.dispatch("set2", {prop: "init", val: true});
	assert.equal(store.state.init, true);	
});

test("Set init with set action", ()=>{
	store.dispatch("set", {prop: "init", val: true});
	assert.equal(store.state.init, true);	
});

test("Set prop 'a' of id 1 to 44", ()=>{
	store.dispatch("setEl", {id:1, a:44});
	assert.equal(store.state.els[1].a, 44);
});

test("Get element with id 1", ()=>{
	assert.equal(store.getters.getElById(1).id, 1);
});

test("Generated actions do not interfere with promises", ()=>{
	const promise1 = store.dispatch("set", {prop: "init", val: true});
	const promise2 = store.dispatch("set1", {prop: "init", val: false});
	const promise3 = store.dispatch("set2", {prop: "init", val: true});
	assert.equal(typeof promise1.then, "function");
	assert.equal(typeof promise2.then, "function");
	assert.equal(typeof promise3.then, "function");
});