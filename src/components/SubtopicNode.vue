<script setup>
import { CLASS_ADD_CHILD, CLASS_MINDMAP_DELETE, CLASS_MINDMAP_INFO } from "../definitions";
import {addChild, deleteVertex, showInfo} from "../utils.js";

const props = defineProps({
  vertex: Object,
  data: Object,
  model: Object,
  ui: Object
})

</script>

<template>
    <div class="vjs-mindmap-subtopic vjs-mindmap-vertex">
        <div class="vjs-mindmap-title">{{ data.label }}</div>
        <div class="vjs-mindmap-notes">{{ data.notes }}</div>
        <div :class="CLASS_MINDMAP_INFO" @click="showInfo(model, vertex)"></div>
        <div :class="CLASS_ADD_CHILD" :data-direction="data.direction" @click="addChild(model, vertex)"></div>
        <div :class="CLASS_MINDMAP_DELETE" @click="deleteVertex(model, ui, vertex)"></div>
    </div>
</template>
