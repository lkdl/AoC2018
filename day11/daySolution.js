const Solution = require('../solution')

class DaySolution extends Solution {
    constructor(useTraining) {
        super(__dirname, useTraining, Solution.splitByLine, function (val) {
           return Number(val)
        })

        this.cells = Array.from({length: 300}).map(() => Array.from({length: 300}))
        for (let y = 0; y < this.cells.length; y++) {
            for (let x = 0; x < this.cells[0].length; x++) {
                this.cells[y][x] = this.getPowerLevel(x + 1, y + 1)
            }
        }
    }

    getPowerLevel(x, y) {
        let rackID = x + 10
        let powerLevel = rackID * y
        powerLevel += this.input
        powerLevel *= rackID
        let str = powerLevel.toString()
        return (str.length > 2 ? Number(str.substr(-3, 1)) : 0) - 5
    }

    getPart1() {
        let max
        let maxCoord
        for (let y = 0; y < this.cells.length - 2; y++) {
            for (let x = 0; x < this.cells[0].length - 2; x++) {
                let total = 0
                for (let j = y; j <= y + 2; j++) {
                    for (let i = x; i <= x + 2; i++) {
                        total += this.cells[j][i]
                    }
                }
                if (max === undefined || total > max) {
                    max = total
                    maxCoord = {x: x + 1, y: y + 1}
                }
            }
        }

        console.log(max)
        return `${maxCoord.x},${maxCoord.y}`
    }
    
    getPart2() {
        let max
        let maxCoord
        // Brute force algorithm...
        for (let sq = 0; sq < this.cells.length; sq++) {
            for (let y = 0; y < this.cells.length - sq; y++) {
                for (let x = 0; x < this.cells[0].length - sq; x++) {
                    let total = 0
                    for (let j = y; j <= y + sq; j++) {
                        for (let i = x; i <= x + sq; i++) {
                            total += this.cells[j][i]
                        }
                    }
                    if (max === undefined || total > max) {
                        max = total
                        maxCoord = {x: x + 1, y: y + 1, sq: sq + 1}
                    }
                }
            }
        }

        return `${maxCoord.x},${maxCoord.y},${maxCoord.sq}`
    }

}

module.exports = DaySolution