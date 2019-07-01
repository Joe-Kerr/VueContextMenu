export default {	
	props: ["menu"],
	
	name: "context-menu",
	
	computed: {
		active() {
			const name = this.namespace+"/active";		
			return (this.$store.getters[name] === this.menu);
		},
		
		context() {
			const name = this.namespace+"/context";
			return this.$store.getters[name];
		},
		
		rawPosition() {
			const name = this.namespace+"/position";
			return this.$store.getters[name];
		}
	},
	
	watch: {
		active(isActive) {
			if(isActive) {
				this.$nextTick(()=>{
					this.modalStart();
					const menuPositionRelativeToMouse = this.preventOutOfBounds();
					this.preventOverOrigin(menuPositionRelativeToMouse);				
				});
			}
		}
	},
	
	data() {
		return {
			namespace: "contextMenu",
			x: 0,
			y: 0
		}
	},
	
	methods: {
		closeByModal() {
			const name = this.namespace+"/close";
			this.$store.dispatch(name);
			
		},
		
		closeByChild() {
			const closeMenu = this.closeByModal;
			
			closeMenu();
			this.modalStop();
		},
		
		modalStart() {
			const modal = this.$options.$_contextMenus_modal;
			if(modal === null) {return;}

			modal.start(this.$refs.contextMenu, ()=>{this.closeByModal()}, {stopPropagation: true});			
		},
		
		modalStop() {
			const modal = this.$options.$_contextMenus_modal;
			if(modal === null) {return;}

			modal.stop();			
		},
		
		preventOutOfBounds() {
			let {x, y} = this.rawPosition;

			const el = this.$refs.contextMenu;
			const height = el.offsetHeight;
			const width = el.offsetWidth;
			
			const xNorm = window.pageXOffset;
			const yNorm = window.pageYOffset;
			
			let yAxis = "top";
			let xAxis = "left";
			
			if(y + height > (yNorm+window.innerHeight)) {
				y -= height;
				
				if(y < yNorm) {
					y = yNorm;
				}
				yAxis = "bottom";
			}
			
			if(x + width > (xNorm+window.innerWidth)) {
				x -= width;
				
				if(x < xNorm) {
					x  = xNorm;
				}
				xAxis = "right";
			}

			this.x = x;
			this.y = y;		
			
			return yAxis+xAxis;
		},
		
		preventOverOrigin(position) {
			switch(position) {
				case "topleft":
					this.x += 1;
					this.y += 1;
				break;
				
				case "topright":
					this.x -= 1;
					this.y += 1;				
				break;		
				
				case "bottomright":
					this.x -= 1;
					this.y -= 1;				
				break;
				
				case "bottomleft":
					this.x += 1;
					this.y -= 1;				
				break;		

				default:
				break;
			}		
		}
	},
	
	created() {
		if(typeof this.$options.$_contextMenus_namespace !== "undefined") {
			this.namespace = this.$options.$_contextMenus_namespace;
		}
		
		if(typeof this.menu === "undefined" || this.menu === "") {
			throw new Error("'menu' property not set or empty on context menu component.");
		}
	}
}