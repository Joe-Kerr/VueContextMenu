function getArrayElWIdxById(container, index, noResult) {
	return (id) => {
		const idx = index[id];
		
		if(typeof idx !== "number") {
			return noResult;
		}

		return container[idx];
	}
}

export const getArrayElWIdxByIdFactory = function getArrayElWIdxByIdFactory(settings={}) {
	const container = settings.container || "container";
	const index = settings.index || "index";
	const noResult = ("noResult" in settings) ? settings.noResult : null;
	
	return function generatedGetArrayElWIdxById(state) {

		if(typeof state[index] !== "object") {
			throw new Error("Name of index does not point to an object in state: "+index);
		} 
		
		if(typeof state[container] !== "object") {
			throw new Error("Name of container does not point to an object in state: "+container);
		} 	
		
		return getArrayElWIdxById(state[container], state[index], noResult);
	}
}