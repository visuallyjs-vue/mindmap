<script setup>
import { CLASS_ADD_CHILD, LEFT, RIGHT, CLASS_MINDMAP_INFO } from "../definitions";
import {addChild} from "../utils.js";

const props = defineProps({
  vertex: Object,
  data: Object,
  model: Object,
  ui: Object
})

</script>

<template>
    <div class="vjs-mindmap-main vjs-mindmap-vertex">
        <div class="vjs-mindmap-title">{{ data.label }}</div>
        <div class="vjs-mindmap-notes">{{ data.notes }}</div>
        <div :class="CLASS_MINDMAP_INFO"></div>
        <div :class="CLASS_ADD_CHILD" :data-direction="LEFT" @click="addChild(model, vertex, LEFT)"></div>
        <div :class="CLASS_ADD_CHILD" :data-direction="RIGHT" @click="addChild(model, vertex, RIGHT)"></div>
    </div>
</template>
