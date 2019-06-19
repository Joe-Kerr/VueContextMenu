# VuexHeman - Vuex Helper methods

Set of common helper functions for Vuex. They are intended for internal use. Should the need arise please yell at me and I will update the docs. 
<sub>**Because "VuexHem" sounds too boring.</sub>

## Install

**1)** 
```
npm install vuex-heman
```

**2)**

```javascript
import vuexHeman from "./install_dir/index.js";
//or
import {getters, mutations, actions} from "./install_dir/index.js";
```

## Overview

There are two types of helper functions: factories and normal function. Factories take in some setup data and return a function or a set of functions. Normal function can just be assigned. 

## Getters

### getArrayElWIdxByIdFactory(options)

```javascript
const state = {container: [{id: 1, data: "abc"}]}
```

You sometimes need a getter that can return a specific element in an array.

***Setup***

```javascript
getters: {
 getElementById: getArrayElWIdxByIdFactory({container: "nameOfContainer", index: "nameOfIndex", noResult: "empty"})
}
```

The parameter 'noResult' is optional and defaults to null. It will be returned if the id is not found.

***Use***
```javascript
const el = store.getters.getElementById(theID);
```


## Mutations

### setPropVal(state, data)

Set a property on the state to a given value.

***Setup***

```javascript
mutations: {
 set: setPropVal
}
```

***Use***

```javascript
store.commit("set", {prop: "someStateProperty", val: "theValue"});
```

### setProps(state, data)

Set state properties by key/val pairs on data.

***Setup***

```javascript
mutations: {
 set: setProps
}
```

***Use***

```javascript
store.commit("set", {stateProp1: "value", stateProp2: "value"});
```


### setArrayElPropsByIdFactory(options)

Set the properties of an element within an array to the given values.

***Setup***

```javascript
mutations: {
 set: setArrayElPropsByIdFactory({container: "nameOfContainer", index: "nameOfIndex"})
}
```

***Use***

```javascript
store.commit("set", {id: theID, aStateProperty: "itsValue", anotherStateProperty: "itsOtherValue"});
```

Notice that the keys in the data parameter correspond to the state properties you want to set. The id parameter is mandatory and must exist on the array element as well.


## Actions

### passThruActionsFactory(options)

```javascript
actions: {
 aFunc(store, data) {store.commit("a", data);}
}
```

This is often how actions look like. 

***Setup***

Three possible options depending on the parameter:


***Single function***
```javascript
actions: {
 one: passThruActionsFactory("one")
}
```

***Set of functions with equal name and commit command***
```javascript
actions: {
 ...passThruActionsFactory(["one", "two", "three"])
}
```

This is equivalent to 

```javascript
actions: {
 one(store, data) {store.commit("one", data);}
 //etc.
}
```


***Set of functions with different name and commit command***
```javascript
actions: {
 ...passThruActionsFactory({methodOne: "commitOne", methodTwo: "commitTwo", methodThree: "commitThree"})
}
```

This is equivalent to 

```javascript
actions: {
 methodOne(store, data) {store.commit("commitOne", data);}
 //etc.
}
```