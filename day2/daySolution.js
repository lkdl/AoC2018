const Solution = require('../solution')

class DaySolution extends Solution {
    constructor(useTraining) {
        super(__dirname, useTraining, Solution.splitByLine)
    }

    getLetterCounts(str) {
        return str.split('').reduce((acc, letter) => {
            acc[letter] = (acc[letter] || 0) + 1
            return acc
        }, {})
    }

    getPart1() {
        let twoLetters = 0
        let threeLetters = 0
        this.input.map(this.getLetterCounts).forEach(inp => {
            twoLetters += Object.values(inp).filter(e => e === 2).length > 0 ? 1 : 0
            threeLetters += Object.values(inp).filter(e => e === 3).length > 0 ? 1 : 0
        })
        return twoLetters * threeLetters
    }


    getPart2() {
        var inp = this.input.map(e => e.split(''))
        for (let i = 0; i < inp.length; i++) {
            for (let j = i + 1; j < inp.length; j++) {
                let commonLetters = inp[i].filter((letter, idx) => letter === inp[j][idx]).join('')
                if (inp[i].length - commonLetters.length === 1) {
                    return commonLetters
                }
            } 
        }
       
    }
}

module.exports = DaySolution