const Solution = require('../solution')

class Node {
    constructor(id) { 
        this.id = id
        this.children = []
        this.parents = []
    }

    addChild(child) {
        this.children.push(child)
    }

    addParent(parent) {
        this.parents.push(parent)
    }

    getInitialCost() {
        return 60 + (this.id.charCodeAt() - 64)
    }
}

class DaySolution extends Solution {
    constructor(useTraining) {
        super(__dirname, useTraining, Solution.splitByLine, function (val) {
            let parseRegex = /Step ([A-Z]) must be finished before step ([A-Z]) can begin\./
            let id = 0
            return val.map(v => {
                let match = parseRegex.exec(v)
                if (match) {
                    return {parent: match[1], child: match[2]}
                } else {
                    throw "Failed to parse node: " + val
                }
            })
        })

        let nodes = new Map()
        this.input.forEach(n => {
            if (!nodes.get(n.parent)) {
                nodes.set(n.parent, new Node(n.parent))
            }
            if (!nodes.get(n.child)) {
                nodes.set(n.child, new Node(n.child))
            }

            let parent = nodes.get(n.parent)
            let child = nodes.get(n.child)

            parent.addChild(child)
            child.addParent(parent)
        })

        this.startNodes = Array.from(nodes.values()).filter(n => n.parents.length === 0)
    }

    getPart1() {
        let queue = this.startNodes
        queue.forEach(n => n.visited = true)
        queue.sort((a, b) => a.id > b.id)
        let result = ''
        while (queue.length > 0) {
            let node = queue.shift()
            node.ready = true
            result += node.id
            node.children.filter(c => !c.visited && c.parents.reduce((acc, p) => acc && p.ready, true)).forEach(c => {
                queue.push(c)
                c.visited = true
            })
            queue.sort((a, b) => a.id > b.id)
        }
        return result
    }

    getPart2() {
        let pool = this.startNodes
        pool.sort((a, b) => a.id > b.id)
        let workers = Array.from({length: 5})
        let second = 0
        while (pool.length > 0 || workers.reduce((acc, w) => acc || !!w, false)) {
            workers.forEach((w, index) => {
                if (w) {
                    w.remaining -= 1
                    if (w.remaining === 0) {
                        w.done = true
                        w.children.filter(c => !c.done && c.parents.reduce((acc, p) => acc && p.done, true)).forEach(c => {
                            pool.push(c)
                        })
                        workers[index] = null
                    }
                }
            })
            
            pool.sort((a, b) => a.id > b.id)

            workers.forEach((w, index) => {
                if (!workers[index] && pool.length > 0) {
                    workers[index] = pool.shift()
                    w = workers[index]
                    w.remaining = w.getInitialCost()
                }
            })

            second++
        }

        return second - 1
    }

}

module.exports = DaySolution