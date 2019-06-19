<template>
	<div v-if="active" :style="{position: 'absolute', left: x+'px', top: y+'px', backgroundColor: 'white'}" ref="contextMenu">
		<slot v-bind:close="closeByChild" v-bind:onResize="preventOutOfBounds" v-bind:context="context"></slot>
	</div>
</template>

<script src="./index.js"></script>