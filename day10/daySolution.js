const Solution = require('../solution')

class DaySolution extends Solution {
    constructor(useTraining) {
        super(__dirname, useTraining, Solution.splitByLine, function (val) {
            let parseRegex = /position=<\s*(\-?\d+),\s*(\-?\d+)> velocity=<\s*(\-?\d+),\s*(\-?\d+)>/
            let id = 0
            let m = new Map()
            val.forEach(v => {
                let match = parseRegex.exec(v)
                if (match) {
                    match.shift()
                    match = match.map(Number)
                    m.set(id++ , {x: match[0], y: match[1], vX: match[2], vY: match[3]})
                } else {
                    throw "Failed to parse node: " + val
                }
            })
            return m
        })
    }

    getPoint(x, y) {
        return `${x},${y}`
    }

    getBoardScore() {
        let d = this.getDimensions()
        return Math.abs(d.maxX - d.minX) * Math.abs(d.maxY - d.minY)
    }

    getDimensions() {
        let dimensions = {}
        this.input.forEach((p) => {
            if (dimensions.minX === undefined || p.x < dimensions.minX) {
                dimensions.minX = p.x
            }
            if (dimensions.maxX === undefined || p.x > dimensions.maxX) {
                dimensions.maxX = p.x
            }
            if (dimensions.minY === undefined || p.y < dimensions.minY) {
                dimensions.minY = p.y
            }
            if (dimensions.maxY === undefined || p.y > dimensions.maxY) {
                dimensions.maxY = p.y
            }
        })
        return dimensions
    }

    print() {
        let dimensions = this.getDimensions()
        let height = (dimensions.maxY - dimensions.minY) + 1
        let width = (dimensions.maxX - dimensions.minX) + 1
        let f = Array.from({length: height}).map(() => Array.from({length: width},  () => '.'))
        this.input.forEach((p) => {
            f[p.y - dimensions.minY][p.x - dimensions.minX] = '#'
        })

        f.forEach((row) => {
            console.log(row.join(''))
        })
    }

    getMessage() {
        let minScore
        let minI
        const ITERATIONS = 20000
        for(let i = 0; i < ITERATIONS; i++) {
            this.input.forEach((p) => {
                p.x = p.x + p.vX
                p.y = p.y + p.vY
            })
            let score = this.getBoardScore()
            if (minScore === undefined || score < minScore) {
                minScore = score
                minI = i
            } 
        }
        for (let i = 0; i < (ITERATIONS - minI - 1); i++) {
            this.input.forEach((p) => {
                p.x = p.x - p.vX
                p.y = p.y - p.vY
            })
        }
        return minI
    }

    getPart1() {
        this.getMessage()
        this.print()
        return ''
    }
    
    getPart2() {
        return this.getMessage() + 1
    }

}

module.exports = DaySolution