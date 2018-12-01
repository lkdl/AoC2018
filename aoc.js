

let day = process.argv.length > 2 ? process.argv[2] : '' 
let part = process.argv.length > 3 ? process.argv[3] : 'all' 
let train = process.argv.length > 4 ? process.argv[4] === 'train' : false

if (day) {
    let DaySolution
    try {
        DaySolution = require('./' + day + '/daySolution')
    } catch (e) {
        console.error('Failed to load the solution for the specified day.')
        return
    }
    try {
        let solution = new DaySolution(train)
        switch (part) {
            case 'p1':
                console.log(solution.getPart1())
                break
            case 'p2':
                console.log(solution.getPart2())
                break
            default:
                solution.getParts()
        }
    } catch (e) {
        console.error('Something went wrong: ', e)
    }
} else {
    console.error('Please provide a day!')
}