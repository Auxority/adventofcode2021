import AdventOfCode from "./AdventOfCode.js";

const bin2dec = (bytes: number[]): number => bytes.reduce((total: number, bit: number, index: number) => total + bit * Math.pow(2, index), 0);
// const binStr2dec = (strBytes: string): number => bin2dec(strBytes.split("").map(Number));

function calculateTotalBitCounts(lines: string[]): number[] {
    const totals = new Array(lines[0].length).fill(0);
    lines.forEach((line: string) => {
        const byte: number[] = line.split("").map(Number);
        byte.forEach((bit, index) => {
            totals[index] += bit;
        });
    });
    return totals;
}

async function part1(): Promise<void> {
    const lines = await AdventOfCode.getLinesInput(3, 2021);
    const totals = calculateTotalBitCounts(lines);

    const gammaRate = bin2dec(totals.map((total) => total > lines.length * 0.5 ? 1 : 0));
    const epsilonRate = bin2dec(totals.map((total) => total < lines.length * 0.5 ? 1 : 0));

    const powerConsumption = gammaRate * epsilonRate;
    console.log(powerConsumption);
}

// function findMatches(raw: string, prefix: string, character?: "0" | "1" | ""): number {
//     const regex: RegExp = new RegExp(prefix + character, "gm");
//     const matches: RegExpMatchArray | null = raw.match(regex);
//     return matches ? matches.length : 0;
// }

// function findFinalBinaryNumber(raw: string, prefix: string): string {
//     const matches = raw.match(new RegExp(`${prefix}[0-9]*`, "gm")) as RegExpMatchArray;
//     return matches[0];
// }

// function findOxygenRating(raw: string, regexPrefix?: string): string {
//     let prefix: string = regexPrefix ? regexPrefix : "^";
//     const count1: number = findMatches(raw, prefix, "1");
//     const count2: number = findMatches(raw, prefix, "0");

//     prefix += (count1 >= count2 ? "0" : "1");

//     if (count1 <= 1 && count2 <= 1) {
//         return findFinalBinaryNumber(raw, prefix);
//     }

//     return findOxygenRating(raw, prefix);
// }

// function findCO2Rating(raw: string, regexPrefix?: string): string {
//     let prefix: string = regexPrefix ? regexPrefix : "^";
//     const count1: number = findMatches(raw, prefix, "1");
//     const count2: number = findMatches(raw, prefix, "0");

//     prefix += (count1 < count2 ? "1" : "0");

//     if (count1 <= 1 && count2 <= 1) {
//         return findFinalBinaryNumber(raw, prefix);
//     }

//     return findCO2Rating(raw, prefix);
// }

// async function part2(): Promise<void> {
//     const raw = await AdventOfCode.getRawInput(3, 2021);
//     const oxygenRating: number = binStr2dec(findOxygenRating(raw));
//     const CO2Rating: number = binStr2dec(findCO2Rating(raw));
//     console.log(oxygenRating, CO2Rating);
//     console.log(oxygenRating * CO2Rating);
// }

(async() => {
    // part1();
    // TODO: part2(); // (I manually did this by using regex search in VSCode, using ^0 and ^1, constantly checking which one gives more/less results (depending on the rating). Once you only have 1 result left, that's the rating you need.)
})();