import AdventOfCode from "./AdventOfCode.js";

function simulateDay(lanternFish: number[]): void {
    for (let i = 0; i < lanternFish.length; i++) {
        if (lanternFish[i] === 0) {
            lanternFish[i] = 7;
            lanternFish.push(9);
        }
        lanternFish[i]--;
    }
}

(async() => {
    const input: string = await AdventOfCode.getRawInput(6, 2021);

    const lanternFish: number[] = input.split(",").map(Number);
    for (let i = 0; i < 80; i++) {
        simulateDay(lanternFish);
    }
    console.log(lanternFish.length);
    // read & write streams
    // Maybe it's an idea to write to the end of a file
    // And read the file line by line (maybe 1,000,000 fish per line)
})();