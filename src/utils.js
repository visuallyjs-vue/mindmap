import {uuid} from "@visuallyjs/browser-ui";
import {SUBTOPIC} from "./definitions.js";

export function addChild(model, vertex, direction) {
    const source = direction != null ? vertex.getPort(direction) : vertex
    const payload = {
        id:uuid(),
        parentId:vertex.id,
        label:"New subtopic",
        children:[],
        type:SUBTOPIC,
        direction
    }

    model.transaction(() => {
        const node = model.addNode(payload)
        model.addEdge({source, target:node})
    })
}

export function deleteVertex(model, surface, vertex) {
    const nodeAndDescendants = model.selectDescendants(vertex, true)
    model.transaction(() => {
        model.remove(nodeAndDescendants)
    })
    relayout(surface)
}

export function relayout(surface) {
    requestAnimationFrame(() => {
        surface.relayout()
    })
}

export function showInfo(model, vertex) {
    model.setSelection(vertex)
}
