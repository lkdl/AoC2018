const Solution = require('../solution')

class Node {
    constructor() {
        this.metadata = []
        this.children = []
    }

    addChild(child) {
        this.children.push(child)
    }

    addMetadata(metadata) {
        this.metadata.push(metadata)
    }

    getValue() {
        if (this.children.length === 0) {
            return this.metadata.reduce((a, b) => a + b, 0)
        }
        let sum = 0
        this.metadata.forEach(m => {
            if (this.children[m - 1]) {
                sum += this.children[m - 1].getValue()
            }
        })
        return sum
    }
}

class DaySolution extends Solution {
    constructor(useTraining) {
        super(__dirname, useTraining, val => val.trim(), v => v.split(' ').map(Number))
    }

    parseNode(offset) {
        let children = this.input[offset++]
        let metadata = this.input[offset++]
        let node = new Node(metadata)
        for (let i = 0; i < children; i++) {
            let ci = this.parseNode(offset)
            offset = ci.offset
            node.addChild(ci.node)
        }
        for (let i = 0; i < metadata; i++) {
            node.addMetadata(this.input[offset++])
        }
        return {offset: offset, node: node}
    }

    getPart1 () {
        let root = this.parseNode(0).node
        root.visited = true
        let queue = [root]
        let sum = 0
        while (queue.length > 0) {
            let node = queue.shift()
            sum += node.metadata.reduce((a, b) => a + b, 0)
            node.children.filter(c => !c.visited).forEach(c => {
                queue.push(c)
                c.visited = true
            })
        }
        return sum
    }

    getPart2 () {
        return this.parseNode(0).node.getValue()
    }

}

module.exports = DaySolution