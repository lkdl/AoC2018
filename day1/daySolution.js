const Solution = require('../solution')

class DaySolution extends Solution {
    constructor(useTraining) {
        super(__dirname, useTraining, (inp) => {
            return Solution.splitByLine(inp).map(Number)
        })
    }

    getPart1() {
        return this.input.reduce((a,b) => a + b, 0)
    }

    getPart2() {
        let seen = new Set()
        let i = 0
        let acc = 0
        while (!seen.has(acc)) {
            seen.add(acc)
            acc += this.input[i]
            i = ++i % this.input.length
        }
        return acc
    }
}

module.exports = DaySolution