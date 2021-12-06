import fs from "fs";
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
})();