import {cats4Vue} from "cats4vue";
import installDirective from "./directive.js";

import store from "./store/index.js";
import menu from "./ui/index.vue";

export const component = menu;

function parseConfig(config={}) {
	const defaults = {
		namespace: {type: "string", default: "contextMenu"},
		componentName: {type: "string", default: ""},
		globalInstall: {type: "boolean", default: true},
		modalService: {type: null, default: null},
		vuex: {type: null}
	};	
	
	const parsed = cats4Vue.configParser(config, defaults);
	const {modalService} = parsed;
	
	if(modalService !== null) { 
		if(typeof modalService !== "object" || 
		  (typeof modalService.start === "undefined" || typeof modalService.start !== "function") || 
		  (typeof modalService.stop === "undefined" || typeof modalService.stop !== "function")
		  ) {
			throw new Error("Config parameter 'modalService' was provided but did not meet interface requirements. Provide: modalService<obj>: {start<func>, stop<func>}");
		}		
	}		
	return parsed;
}

function installComponent(comp, Vue, options) {	
	if(options.componentName !== "") {
		cats4Vue.renameComponent(comp, options.componentName);
	}

	cats4Vue.componentOptionsWriter(comp, {$_contextMenus_namespace: options.namespace, $_contextMenus_modal: options.modalService});
	
	if(options.globalInstall) {
		Vue.component(comp.name, comp);
	}
}

export const installer = {install: function(Vue, config) {
	const {vuex} = config;
	
	const options = parseConfig(config);
	const {namespace} = options;
	
	cats4Vue.registerVuexModule(vuex, namespace, store);
	installDirective(Vue, vuex, namespace);
	installComponent(menu, Vue, options);
}};

export default installer;