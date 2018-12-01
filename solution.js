const fs = require('fs')
const path = require('path')

class Solution {
    constructor(folder, useTraining, transform) {

        if (!folder) {
            throw 'No folder provided'
        }

        try {
            this.input = fs.readFileSync(path.join(folder, useTraining ? 'training.txt' : 'input.txt'), 'utf8')

            if (transform && typeof transform === 'function') {
                this.input = transform(this.input)
            }

        } catch (e) {
            console.log(e)
            throw 'Failed to read input file!'
        }
    }

    getPart1() {
        console.error('This part of the day has not been solved yet.');
    }

    getPart2() {
        console.error('This part of the day has not been solved yet.');
    }

    getParts() {
        console.log('Part 1: ', this.getPart1())
        console.log('Part 2: ', this.getPart2())
    }

    static splitByLine(input) {
        return input.split(/\n/).slice(0, -1)
    }
}

module.exports = Solution