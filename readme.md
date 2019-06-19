# Context menu plugin for Vue

Make everything a context menu: A context menu wrapper for Vue as a configurable plugin. 


## Features

- Declarative definitions of context menus.
- Open with v-contextmenu or dispatch("contextMenu/open").
- Put in any content within `<context-menu> ... </context-menu>`.
- Component name and store namespace configurable.
- Right-click or left-click.
- Does not go out of the viewport.

## Requirements

- Vue >= 2.6 (v-slot)
- Vuex


## Install

**1)** 
```
npm install @joe_kerr/vue-context-menu
```
**2)**
```
import contextMenu from "./where_you_put_it/src/index.js"; //Requires a dev environment.
```

or

```
const contextMenu = require("./where_you_put_it/dist/contextMenu.common.min.js");
```

or

```
<html> <script src=""./where_you_put_it/dist/contextMenu.umd.min.js""></script>
```
**3)**
```
Vue.use(contextMenu, configuration); //import default

//or!!

Vue.use(contextMenu.installer, configuration); //named import
```

**4)** [if not installed globally]

```
import {component} from "./where_you_put_it/src/index.js";
//or
const {component} = require("./where_you_put_it/dist/contextMenu.common.min.js");
//or
const component = contextMenu.component;
```



## Use

### Configuration

Provide configuration properties on the second parameter of the Vue.use(plugin, config) call.

#### vuex (mandatory)

A reference to your Vuex store instance.


#### namespace

The namespace of the store module. Default: "contextMenu"


#### componentName

The name of the context menu component. Default: "context-menu"


#### globalInstall

Should the component be available in all your templates without importing it? Default: true

If set to false, you need to import the component yourself. See above.


#### modalService

Context menus are usually modal, i.e. you click elsewhere in order to close them. This modal behaviour is not exclusive to just context menus. Therefore, it appeared to made sense to decouple it. The "modalService" requires the following interface:

```
modalService.start(<dom node>element, <func>callback[, {<bool>stopPropagation: true}])

modalService.stop()
```

If no modalService is provided, the context menu will not be modal (see "menu.close" below). The optional config parameter "stopPropagation" refers to event.stopPropagation(). It is assumed that the modal click-handler should consume the click event.

While we are at it. Maybe check this out: [StackThemModals - a modal stack controller](https://github.com/Joe-Kerr/stackThemModals)

### Build menu components

```
<context-menu menu="specific_id" v-slot:default="mnu">		
 <h2>{{mnu.context.name}}</h2>
 <your-menu-item :menu="mnu"></your-menu-item>
 <button v-on:click="mnu.close">Close</button>
</context-menu>	
```

### Configure component 

#### v-slot:default="mnu"

- mnu.context<var>: custom data
- mnu.close<func>: function that closes the menu
- mnu.onResize<func>: function that checks whether the menu is out of bounds and if so corrects position

#### prop "menu" (mandatory)

The unique menu name (id) with which you open this context menu.


### Open menus

**via directive**

```
<img :src="file.path" v-contextmenu.left|right="{menu: 'specific_id', context: {name: file.name, what: "ever"}}" />


**via method**

methods: {
 click(event, context) {
  this.$store.dispatch("contextMenu/open", {menu: 'specific_id', context, event});
 }
}
```

Notice:

- "specific_id" links the context menu and the opening directive.
- "context" in v-contextmenu is passed as object property to "mnu" in v-slot.
- The identifier in v-slot:default="mnu" (i.e. "mnu") can be named anything you like.
- The directive modifier is optional and defaults to ".right".


## Notes

- Only one context menu can be open at a time. 
- The context menu is not dynamically extensible. All menu items need to be defined in your template and are then set in stone.
- Just to be sure: this plugin is a wrapper that takes care of the logic of context menus. There is no items or styling/theming. 

## Versions

### 1.0.0 
- Public release.


## Copyright

MIT (c) Joe Kerr 2019
