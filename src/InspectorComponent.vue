<script setup>
import { InspectorComponent } from "@visuallyjs/browser-ui-vue";
import { PROPERTY_LABEL, PROPERTY_NOTES } from "./definitions";
import {ref} from "vue";

const current = ref(null)

</script>

<template>
    <InspectorComponent v-model="current">
        <div v-if="current != null" class="vjs-mindmap-inspector vjs-node-inspector">
            <div class="vjs-mindmap-inspector-section">
                <div>Label</div>
                <input type="text" :vjs-att="PROPERTY_LABEL" vjs-focus/>
            </div>

            <div class="vjs-mindmap-inspector-section">
                <div>Notes</div>
                <textarea rows="10" :vjs-att="PROPERTY_NOTES"/>
            </div>
        </div>
    </InspectorComponent>
</template>
