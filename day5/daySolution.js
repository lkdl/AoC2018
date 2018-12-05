const Solution = require('../solution')

class DaySolution extends Solution {
    constructor(useTraining) {
        super(__dirname, useTraining, val => val.trim())
        this.polymer = this.input.split('').map(e => e.charCodeAt())
    }

    react(polymer) {
        let lastLength
        do {
          lastLength = polymer.length
          polymer = polymer.reduce((red, val, index, arr) => {
              if (val === null) {
                  return red
              }
              let next = index + 1
              if (next < arr.length && Math.abs(val - arr[next]) === 32) {
                  arr[next] = null
              } else {
                  red.push(val)
              }
              return red
          }, [])
        } while (polymer.length > 0 && polymer.length < lastLength)
        return polymer
    }

    getPart1() {
        return this.react(this.polymer).length
    }

    getPart2() {
        let units = new Set(this.input.split('').map(c => c.toLowerCase()).map(e => e.charCodeAt()))
        let shortest
        units.forEach(unit => {
            let result = this.react(this.polymer.filter(u => u !== unit && u !== unit - 32))
            if (shortest === undefined || result.length < shortest) {
                shortest = result.length
            }
        })
        return shortest
    }
}

module.exports = DaySolution