const assert = require("assert");
const {installer, component} = require("../../src/index.js");
const {mount, createLocalVue} = require("@vue/test-utils");

const localVue = createLocalVue();
const Vuex = require("vuex").default;

localVue.use(Vuex);

suite("Integration tests");

test("Install -> 'build custom menu' -> 'open menu' chain working", ()=>{
	const store = new Vuex.Store({});
	installer.install(localVue, {vuex: store});
	
	const wrapper = mount({
		template: `
			<section>
				<div id="ctxmnu1" v-contextmenu="{menu: 'demoMenu1', context: 'hello world'}" class="">Simple menu</div>
				<context-menu menu="demoMenu1" id="menu1" class="menu" v-slot:default="menu">		
					<p>Items...</p>
				</context-menu>	
			</section>			
		`
	}, {store, localVue});
	
	assert.ok(wrapper.contains("#ctxmnu1"));
	assert.ok(!wrapper.contains("#menu1"));
	
	store.dispatch("contextMenu/open", {menu: 'demoMenu1', context, event: {pageX:1, pageY:2}});
	
	assert.ok(wrapper.contains("#menu1"));
	
	delete component.$_contextMenus_namespace;
	delete component.$_contextMenus_modal;
})