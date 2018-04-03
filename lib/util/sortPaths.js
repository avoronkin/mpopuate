const Graph = require('graph-data-structure')

module.exports = function (deps) {
    const graph = Graph()

    deps.forEach(paths => {
        paths.split(/\s+/).forEach(path => {

            path.split('.').reduce((prev, next) => {
                const path = !prev ? next : [prev, next].join('.')
                graph.addNode(path)
                if (prev && path) {
                    graph.addEdge(prev, path)
                }

                return path
            }, '')
        })
    })

    const sortedNodes = graph.topologicalSort()

    const sortedDeps = []

    sortedNodes.forEach(node => {
        const dep = deps.find(dep => {
            return dep.split(/\s+/).indexOf(node) !== -1
        })

        sortedDeps.push(dep)
    })

    return [...new Set(sortedDeps)]
}
