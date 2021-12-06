import AdventOfCode from "./AdventOfCode.js";

function getInternalTimers(lanternFish: number[]): number[] {
    const timers: number[] = new Array(9).fill(0);
    lanternFish.forEach((internalTimer) => timers[internalTimer]++);
    return timers;
}

function simulateDay(internalTimers: number[]): number[] {
    const newTimers: number[] = new Array(9).fill(0).map((_, index) => internalTimers[(index + 1) % internalTimers.length]);
    newTimers[6] += internalTimers[0];
    return newTimers;
}

function countTotalFish(internalTimers: number[]): number {
    return internalTimers.reduce((total, current) => total + current, 0);
}

function part1(internalTimers: number[]) {
    for (let i = 0; i < 80; i++) {
        internalTimers = simulateDay(internalTimers);
    }
    console.log(countTotalFish(internalTimers));
}

function part2(internalTimers: number[]) {
    for (let i = 0; i < 256; i++) {
        internalTimers = simulateDay(internalTimers);
    }
    console.log(countTotalFish(internalTimers));
}

(async() => {
    const input: string = await AdventOfCode.getRawInput(6, 2021);
    const lanternFish: number[] = input.split(",").map(Number);

    const internalTimers: number[] = getInternalTimers(lanternFish);
    part1(internalTimers);
    part2(internalTimers);
})();