import {mutations} from "vuex-heman";

export default {
	namespaced: true,
	
	state: {
		active: null,
		context: null,
		
		x: 0,
		y: 0,
	},
	
	getters: {
		active(state) {return state.active},
		context(state) {return state.context},
		position(state) {return {x: state.x, y: state.y}}
	},
	
	mutations: {
		set: mutations.setProps
	},
	
	actions: {
		async open(store, data) {
			if(typeof data === "undefined" || typeof data.menu === "undefined") {
				throw new Error("'menu' missing on data parameter.");
			}
			
			if(typeof data.event === "undefined" || typeof data.event.pageX !== "number"  || typeof data.event.pageY !== "number") {
				throw new Error("Failed to provide event (properly). Did you call dispatch('open') directly? Use v-contextmenu instead or put the click event on the data parameter.");
			}
			
			store.commit("set", {active: data.menu, context: data.context, x: data.event.pageX, y: data.event.pageY});			
			return true;
		},
		
		async close(store) {
			store.commit("set", {active: null, context: null, x: 0, y: 0});
			return true;
		}
	}
};