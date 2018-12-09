const Solution = require('../solution')

class Node {
    constructor(marble) {
        this.marble = marble
    }
}

class DaySolution extends Solution {
    constructor(useTraining) {
        super(__dirname, useTraining, val => val.trim(), v => {
            let parseRegex = /(\d+) players; last marble is worth (\d+) points/
            let match = parseRegex.exec(v)
            if (match) {
                return {players: Number(match[1]), lastMarble: Number(match[2])}
            } else {
                throw "Failed to parse info"
            }
        })
    }
        
    addAfterNode(node, newNode) {
        newNode.prev = node
        newNode.next = node.next
        node.next.prev = newNode
        node.next = newNode
    }

    game(highestMarble) {
        let scores = Array.from({length: this.input.players}, () => 0)
        let current = new Node(0)
        current.next = current
        current.prev = current

        let dbgStart = current
        let player = 0
        for (let i = 1; i < highestMarble; i++) {
            if (i % 23 === 0) {
                scores[player] += i
                current = current.prev.prev.prev.prev.prev.prev
                scores[player] += current.prev.marble
                current.prev.prev.next = current
                current.prev = current.prev.prev

            } else {
                let m = new Node(i)
                this.addAfterNode(current.next, m)
                current = m
            }
            player = ++player % scores.length
        }
        return Math.max(...scores)
    }

    getPart1 () {
        return this.game(this.input.lastMarble)
    }

    getPart2() {
        return this.game(this.input.lastMarble * 100)
    }
}

module.exports = DaySolution