const Solution = require('../solution')

class DaySolution extends Solution {
    constructor(useTraining) {
        super(__dirname, useTraining, Solution.splitByLine, function (val) {
            let parseRegex = /(\d+), (\d+)/
            let id = 0
            return val.map(v => {
                let match = parseRegex.exec(v)
                if (match) {
                    return {id: id++, x: Number(match[1]), y: Number(match[2])}
                } else {
                    throw "Failed to parse point: " + val
                }
            })
        })


        let minX = 0
        let maxX = 0
        let minY = 0
        let maxY = 0
        this.input.forEach(p => {
            if (p.x < minX) {
                minX = p.x
            }
            if (p.x > maxX) {
                maxX = p.x
            }
            if (p.y < minY) {
                minY = p.y
            }
            if (p.y > maxY) {
                maxY = p.y
            } 
        });

        if (minX < 0) {
            let diffX = Math.abs(minX)
            this.input = this.input.map(p => ({id: p.id, x: p.x + diffX, y: p.y}))
            minX = 0
        }

        if (minY < 0) {
            let diffY = Math.abs(minY)
            this.input = this.input.map(p => ({id: p.id, x: p.x, y: p.y + diffY}))
            minY = 0
        }

        this.field = Array.from({length: maxY + 1}).map(() => Array.from({length: maxX + 2}))
    }

    getMinimumDistance(dists) {
        let min
        dists.forEach(d => {
            if (min === undefined || d.dist < min.dist) {
                min = d
            }
        })
        return min
    }

    getPart1() {
        for (let y = 0; y < this.field.length; y++) {
            for (let x = 0; x < this.field[y].length; x++) {
                let dists = this.input.map(p => ({id: p.id, dist: Math.abs(x - p.x) + Math.abs(y - p.y)}))
                let closestPoint = this.getMinimumDistance(dists)
                this.field[y][x] = dists.filter(d => d.dist === closestPoint.dist).length > 1 ? null : closestPoint.id
            }
        }

        let areas = {}
        for (let y = 0; y < this.field.length; y++) {
            for (let x = 0; x < this.field[y].length; x++) {
                let cell = this.field[y][x]
                if (cell === null || areas[cell] && areas[cell] === Infinity) {
                    continue
                }
                areas[cell] = (areas[cell] || 0) + 1
                if (x === 0 || y === 0 || x === (this.field[y].length - 1) || y === (this.field.length - 1)) {
                    areas[cell] = Infinity
                }
            }
        }
        return Math.max(...Object.values(areas).filter(v => v !== Infinity))
    }

    getPart2() {
        let regionSize = 0
        for (let y = 0; y < this.field.length; y++) {
            for (let x = 0; x < this.field[y].length; x++) {
                let distSum = this.input.reduce((sum, p) => sum + Math.abs(x - p.x) + Math.abs(y - p.y), 0)
                regionSize += distSum < 10000 ? 1 : 0
            }
        }
        return regionSize
    }
}

module.exports = DaySolution