<script setup>
import { onMounted, ref, markRaw } from "vue"

import './mindmap.css'

import { registerParser, registerExporter, uuid, EVENT_GRAPH_CLEARED, CONNECTOR_TYPE_STRAIGHT, AnchorLocations, EVENT_CANVAS_CLICK, EVENT_UNDO, EVENT_REDO, BowtieLayout } from "@visuallyjs/browser-ui"
import { SurfaceProvider, SurfaceComponent, ControlsComponent, MiniviewComponent } from "@visuallyjs/browser-ui-vue";
import {MAIN, LEFT, RIGHT} from "./definitions";
import {MINDMAP_JSON, mindmapJsonExporter, mindmapJsonParser} from "./parser";

import Inspector from "./InspectorComponent.vue"

import MainNode from "./components/MainNode.vue"
import SubtopicNode from "./components/SubtopicNode.vue"
import {relayout} from "./utils.js";

const props = defineProps(['url'])

const surfaceRef = ref(null)
const model = ref(null)

registerParser(MINDMAP_JSON, mindmapJsonParser)
registerExporter(MINDMAP_JSON, mindmapJsonExporter)

onMounted(() => {
    const surfaceInstance = surfaceRef.value.surface
    model.value = surfaceInstance.model

    model.value.bind(EVENT_UNDO, () => relayout(surfaceInstance))
    model.value.bind(EVENT_REDO, () => relayout(surfaceInstance))

    model.value.bind(EVENT_GRAPH_CLEARED, () => {
        model.value.addNode({
            id:uuid(),
            type:MAIN,
            left:[],
            right:[],
            label:"Main"
        })
        surfaceInstance.zoomToFit()
    })

    model.value.load({
        url:props.url,
        type:MINDMAP_JSON
    })
})


const view = {
    nodes:{
        main:{
            component: markRaw(MainNode)
        },
        subtopic:{
            component: markRaw(SubtopicNode)
        }
    }
}

const renderOptions = {
  elementsDraggable:false,
  zoomToFit:true,
  logicalPorts:true,
  relayoutOnEdgeConnect:true,
  consumeRightClick:false,
  // Use a bowtie layout.
  layout:{
    type:BowtieLayout.type,
    options:{
      getRootNode:(ds) => ds.getNodes().filter(d => d.data.type === MAIN)[0],
      getUpstream:(ds, v) => v.getAllEdges().filter(e => e.target.data.direction === LEFT).map(e => e.target),
      getDownstream:(ds, v) => v.getAllEdges().filter(e => e.target.data.direction === RIGHT).map(e => e.target)
    }
  },
    edges:{
        connector:{
            type:CONNECTOR_TYPE_STRAIGHT,
            options:{
                stub:20
            }
        },
        anchor:[ AnchorLocations.Left, AnchorLocations.Right ]
    },
    events:{
        [EVENT_CANVAS_CLICK]:() => model.value.clearSelection()
    }
}

</script>

<template>
    <div class="vjs-mindmap">
        <SurfaceProvider>
            <div class="vjs-mindmap-canvas">
                <SurfaceComponent :viewOptions="view" :renderOptions="renderOptions" ref="surfaceRef"/>
                <ControlsComponent/>
                <MiniviewComponent/>
            </div>
            <div class="vjs-mindmap-rhs">
                <div class="description">
                    <h3>Mindmap Builder</h3>
                    <ul>
                        <li>Click the note icon in the upper left to inspect/edit a node.</li>
                        <li>Click the X button to delete a node</li>
                        <li>Click the + button to add a new subtopic. Subtopics can be added to the left or right of the
                            main node.
                        </li>
                    </ul>
                </div>
                <hr/>
                <Inspector/>
            </div>
        </SurfaceProvider>
    </div>
</template>
