# Context menu plugin for Vue

Make everything a context menu: A context menu **wrapper** for Vue as a configurable plugin. 


## Features

- Declarative definitions of context menus.
- Open with v-contextmenu or dispatch("contextMenu/open").
- Put in any content within `<context-menu> ... </context-menu>`.
- Component name and store namespace configurable.
- Right-click or left-click.
- Does not go out of the viewport.

## Demo

[See it in action.](https://joe-kerr.github.io/VueContextMenu/)


## Requirements

- Vue >= 2.6 (v-slot)
- Vuex
- dev environment such as Vue Cli ("soft" requirement / recommended)


## Install

**1)** 
```
npm install @joe_kerr/vue-context-menu
```
**2a) dev environment**

```javascript
import {installer, component} from "@joe_kerr/vue-context-menu"; 
```

or

```javascript
import * as contextMenu_or_whatever from "@joe_kerr/vue-context-menu"; 
```

**2b) Pure node or browser**


```javascript
const contextMenu = require("path_to_node_modules/@joe_kerr/vue-context-menu/dist/contextMenu.common.js");
```

or

```
<html> <script src="path_to_node_modules/@joe_kerr/vue-modal-dialogs/dist/contextMenu.umd.min.js"></script>
```


**3)**
```javascript
Vue.use(contextMenu.installer, configuration);
```

**4)** [if not installed globally]

```javascript
import {component} from "@joe_kerr/vue-context-menu";
//or
const {component} = require("path_to_node_modules/@joe_kerr/vue-context-menu/dist/contextMenu.common.js");
//or
const component = contextMenu.component;
```



## Use

### Configuration

Provide configuration properties on the second parameter of the Vue.use(plugin, **config**) call.

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
<context-menu menu="specific_id" v-slot:default="menuProps">		
 //e.g.
 <h2>{{menuProps.context.name}}</h2>
 
 <your-menu-item :mProps="menuProps"></your-menu-item>
 
 <button v-on:click="menuProps.close">Close</button>

</context-menu>	
```

### Configure component 

#### v-slot:default="menuProps"

- menuProps.context<var>: custom data
- menuProps.close<func>: function that closes the menu
- menuProps.onResize<func>: function that checks whether the menu is out of bounds and if so corrects position

#### prop "menu" (mandatory)

The unique menu name (id) with which you open this context menu.


### Open menus

**via directive**

```html
<img :src="file.path" v-contextmenu.left|right="{menu: 'specific_id', context: {name: file.name, what: "ever"}}" />
```

**via method**

```javascript
methods: {
 click(event, context) {
  this.$store.dispatch("contextMenu/open", {menu: 'specific_id', context, event});
 }
}
```

Notice:

- "specific_id" links the context menu and the opening directive.
- "context" in v-contextmenu is passed as object property to "menuProps" in v-slot.
- The identifier in v-slot:default="menuProps" (i.e. "menuProps") can be named anything you like.
- The directive modifier is optional and defaults to ".right".


## Notes

- Only one context menu can be open at a time. 
- The context menu is not dynamically extensible. All menu items need to be defined in your template and are then set in stone.
- Just to be sure: this plugin is a wrapper that takes care of the logic of context menus. There is no items or styling/theming. 

## Versions

### 1.0.5
- Changed: Click outside context menu does not stop propagation anymore
- Changed: Test refactoring and package updates

### 1.0.4
- Fixed: v-contextmenu directive blocked @click.right directive on the same tag/component (issue #2)
- Fixed: .gitignore not in the file list of the build script
- Changed: made live demo *prettier*
- Changed: some refactoring

### 1.0.3
- Added: live demo with github pages

### 1.0.2
- Fixed: ohh, I see now: https://github.com/webpack/webpack/issues/7646

### 1.0.1
- Changed: module import facilitated.

### 1.0.0 
- Public release.


## Copyright

MIT (c) Joe Kerr 2019
