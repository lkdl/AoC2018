const Solution = require('../solution')

class Rect {
    constructor(id, x, y, width, height) {
        this.id = id;
        this.xStart = x;
        this.yStart = y;
        this.xEnd = this.xStart + width;
        this.yEnd = this.yStart + height;
    }
}

class DaySolution extends Solution {
    constructor(useTraining) {
        super(__dirname, useTraining, Solution.splitByLine, function (val) {
            let parseRegex = /#(\d+)\s@\s(\d+),(\d+):\s(\d+)x(\d+)/
            return val.map(v => {
                let match = parseRegex.exec(v)
                if (match) {
                    match.shift()
                    return new Rect(...match.map(Number))
                } else {
                    throw "Failed to parse rectangle: " + val
                }
            })
        })
    }
    getPart1() {
        let fields = {}
        this.input.forEach(r => {
            for (let y = r.yStart; y < r.yEnd; y++) {
                for (let x = r.xStart; x < r.xEnd; x++) {
                    fields[x + ',' + y] = (fields[x + ',' + y] || 0) + 1
                }
            }
        })
        
        return Object.keys(fields).filter(k => fields[k] > 1).length
    }

    getPart2() {
        let fields = {}
        this.input.forEach(r => {
            for (let y = r.yStart; y < r.yEnd; y++) {
                for (let x = r.xStart; x < r.xEnd; x++) {
                    fields[x + ',' + y] = fields[x + ',' + y] || []
                    fields[x + ',' + y].push(r.id)
                }
            }
        })
        var candidates = new Set(this.input.map(r => r.id))
        Object.keys(fields).filter(k => fields[k].length > 1).forEach(k => fields[k].forEach(c => candidates.delete(c)))
        return [...candidates][0]
    }

}

module.exports = DaySolution