export const setPropVal = function setPropVal(state, data) {	
	if(typeof data === "undefined" || !("prop" in data) || !("val" in data)) {
		throw new Error("Missing property on data parameter: provide 'prop' and 'val'.");
	}
	
	if(!(data.prop in state)) {
		throw new Error("Tried to set non-existing property: "+data.prop);
	}
	
	state[data.prop] = data.val;
}

export const setProps = function setProps(state, data) {
	const err = [];
	for(const prop in data) {
		if(!(prop in state)) {
			err.push(prop);
			continue;
		}
		state[prop] = data[prop];
	}

	if(err.length > 0) {
		throw new Error("Tried to set at least one non-existing property: "+err.join(","));
	}	
}

function setArrayElPropsById(container, index, props) {
	const id = props.id;
	if(typeof id === "undefined") {
		throw new Error("Missing id on data parameter.");
	}
	
	const idx = index[id]
	if(typeof idx === "undefined") {
		throw new Error("Id not found in index while setting prop/s on element: "+JSON.stringify(props));
	}

	const el = container[idx];
	const err = [];
	delete props.id;
	
	for(const p in props) {
		if(p in el)  {
			el[p] = props[p];
		}
		else {
			err.push(p);
		}
	}
	
	if(err.length > 0) {
		throw new Error("Tried to set at least one non-existing property: "+err.toString(","));
	}
}

export const setArrayElPropsByIdFactory = function setArrayElPropsByIdFactory(settings={}) {
	const container = settings.container || "container";
	const index = settings.index || "index";
	
	return function generatedSetArrayElPropsById(state, data) {	
		
		if(typeof state[index] !== "object") {
			throw new Error("Name of index does not point to an object in state: "+index);
		} 
		
		if(typeof state[container] !== "object") {
			throw new Error("Name of container does not point to an object in state: "+container);
		} 		
		
		setArrayElPropsById(state[container], state[index], data);
	}	
}