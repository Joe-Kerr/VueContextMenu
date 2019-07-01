const listeners = [];

function addEvent(el, func, listeners) {
	el.addEventListener("mouseup", func);
	listeners.push({id: el, listener: func});	
}

function removeEvent(el, index, listeners) {
	el.removeEventListener("mouseup", listeners[index].listener);
	listeners.splice(index,1);
}

function handleContextmenu(menu, context, event, namespace, vuex, mouse) {
	if(event.which !== mouse) {
		return;
	}

	vuex.dispatch(namespace+"/open", {menu, context, event});
}

function insertedProxy(vuex, namespace) {	
	return function inserted(el, context) {
		const args = context.value;
		
		const RIGHT = 3;
		const LEFT = 1;
		const mouse = (typeof context.modifiers === "undefined") ? RIGHT : (typeof context.modifiers.left !== "undefined") ? LEFT : RIGHT;
				
		function proxyListener(event) {
			handleContextmenu(args.menu, args.context, event, namespace, vuex, mouse);
		}			
		
		addEvent(el, proxyListener, listeners);			
	}
}

function handleUnbind(el, context) {
	let success = false;
	for(let i=0, ii=listeners.length; i<ii; i++) {
		if(listeners[i].id == el) {
			removeEvent(el, i, listeners)
			success = true;
			break;
		}
	}
	
	if(!success) {
		throw new Error("Failed to remove event listener in unbind hook.");
	}	
}
	
export default function installDirective(Vue, vuex, namespace) {

	Vue.directive("contextmenu", {
		inserted: insertedProxy(vuex, namespace),
		
		//Technically, not necessary because listeners auto-removed if no references to dom node left. 
		//BUT that is sth Vue handles I cannot control.
		//Notice: Vue does not keep any references (https://forum.vuejs.org/t/should-i-removeeventlisterner-in-a-directives-unbind-hook-or-is-it-unecessary/40354/2).
		unbind: handleUnbind		
	});	
}