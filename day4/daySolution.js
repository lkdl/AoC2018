const Solution = require('../solution')

class Event {
    constructor(y, m, d, h, min, event, guard) {
        this.day = Number(d);
        this.month = Number(m);
        this.year = Number(y);
        this.hour = Number(h);
        this.minute = Number(min);
        switch (event) {
            case 'falls asleep':
                this.type = 'ASLEEP'
                break
            case 'wakes up':
                this.type = 'AWAKES'
                break
            default:
                this.type = 'GUARD_INFO'
        }
        this.guard = guard;
    }
}

class Guard {
    constructor(id) {
        this.id = id
        this.sleeping = []
    }

    sleeps(from, to) {
        for (let i = from; i < to; i++) {
            this.sleeping[i] = (this.sleeping[i]  || 0) + 1
        }
    }

    sleepMinutes() {
        return this.sleeping.reduce((sum, a) => sum + a, 0)
    }

    mostSleepingMinute() {
        let max = 0
        let index = 0
        for (let i = 0; i < this.sleeping.length; i++) {
            if ((this.sleeping[i] || 0) > max) {
                max = this.sleeping[i]
                index = i
            }
        }
        return {index: index, times: max}
    }
}

class DaySolution extends Solution {
    constructor(useTraining) {
        super(__dirname, useTraining, Solution.splitByLine, function (val) {
            let parseRegex = /\[(\d+)\-(\d+)\-(\d+)\s(\d+):(\d+)\]\s(falls asleep|wakes up|Guard #(\d+) begins shift)/
            return val.map(v => {
                let match = parseRegex.exec(v)
                if (match) {
                    match.shift()
                   return new Event(...match)
                } else {
                    throw "Failed to parse event: " + val
                }
            })
        })

        this.input.sort((a, b) => {
            if (a.year === b.year) {
                if (a.month === b.month) {
                    if (a.day === b.day) {
                        if (a.hour === b.hour) {
                            return a.minute - b.minute;
                        }
                        return a.hour - b.hour;
                    }
                    return a.day - b.day;
                }
                return a.month - b.month;
            }
            return a.year - b.year
        })

        this.guards = {}
        let guard
        let sleepStart
        this.input.forEach(ev => {
            if (ev.type === 'GUARD_INFO') {
                if (!this.guards[ev.guard]) {
                    this.guards[ev.guard] = new Guard(ev.guard)
                }
                guard = this.guards[ev.guard]
            } else if (ev.type === 'ASLEEP') {
                sleepStart = ev.minute
            } else if (ev.type === 'AWAKES') {
                guard.sleeps(sleepStart, ev.minute)
            }
        })
    }

    getPart1() {
        let mostSleepingGuard = this.guards[Object.keys(this.guards).sort((a, b) => this.guards[b].sleepMinutes() - this.guards[a].sleepMinutes())[0]]
        return mostSleepingGuard.id * mostSleepingGuard.mostSleepingMinute().index
    }

    getPart2() {
        let mostSleepingGuard = this.guards[Object.keys(this.guards).sort((a, b) => this.guards[b].mostSleepingMinute().times - this.guards[a].mostSleepingMinute().times)[0]]
        return mostSleepingGuard.id * mostSleepingGuard.mostSleepingMinute().index
    }
}

module.exports = DaySolution