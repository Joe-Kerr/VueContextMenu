const assert = require("assert");
const sinon = require("sinon");

const {installer, component} = require("../../src/index.js");
const {cats4Vue} = require("cats4vue");

suite("contextMenu/index.js");

const vuex = {dispatch: ()=>{}, registerModule: ()=>{}};
const Vue = {directive: ()=>{}, component: ()=>{}};
const originalName = component.name;

afterEach(()=>{
	component.name = originalName;
	delete component.$_contextMenus_namespace;
	delete component.$_contextMenus_modal;
	
	cats4Vue.configParser.resetHistory();
	cats4Vue.componentOptionsWriter.resetHistory();
	cats4Vue.renameComponent.resetHistory();
	cats4Vue.registerVuexModule.resetHistory();	
});

before(()=>{
	sinon.spy(cats4Vue, "configParser");
	sinon.spy(cats4Vue, "componentOptionsWriter");
	sinon.spy(cats4Vue, "renameComponent");
	sinon.spy(cats4Vue, "registerVuexModule");
});

after(()=>{
	cats4Vue.configParser.restore();
	cats4Vue.componentOptionsWriter.restore();
	cats4Vue.renameComponent.restore();
	cats4Vue.registerVuexModule.restore();
});

test("index.js provides expected exports", ()=>{
	assert.equal(typeof require("../../src/index.js").default, "object");
	assert.equal(typeof require("../../src/index.js").installer, "object");
	assert.equal(typeof require("../../src/index.js").component, "object");
});

test("installer calls all utility functions", ()=>{
	installer.install(Vue, {vuex, componentName: "callRenameUtility"});
	
	assert.equal(cats4Vue.configParser.callCount, 1);
	assert.equal(cats4Vue.componentOptionsWriter.callCount, 1);
	assert.equal(cats4Vue.renameComponent.callCount, 1);
	assert.equal(cats4Vue.registerVuexModule.callCount, 1);
});

test("installer ensures modalService, if provided, meets interface requirement", ()=>{
	assert.doesNotThrow(()=>{ installer.install(Vue, {vuex, modalService: {start: ()=>{}, stop: ()=>{}}}); }, {message: /modalService/});
	assert.throws(()=>{ installer.install(Vue, {vuex, modalService: {start: ()=>{}, stop: 123}}); }, {message: /modalService/});
	assert.throws(()=>{ installer.install(Vue, {vuex, modalService: {start: 123, stop: ()=>{}}}); }, {message: /modalService/});
	assert.throws(()=>{ installer.install(Vue, {vuex, modalService: {start: 123, stop: 123}}); }, {message: /modalService/});
});

test("installer sets namespace", ()=>{
	installer.install(Vue, {vuex, namespace: "NS"});
	assert.equal(component.$_contextMenus_namespace, "NS");
});

test("installer sets componentName", ()=>{
	installer.install(Vue, {vuex, componentName: "nameOverride"});
	assert.equal(component.name, "nameOverride");
});

test("installer installs component globally", ()=>{
	const vComp = new sinon.fake();
	installer.install({component: vComp, directive: ()=>{}}, {vuex, globalInstall: true});
	assert.equal(vComp.callCount, 1);
});