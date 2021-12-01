import AdventOfCode from "./AdventOfCode.js";

(async() => {
    const lines = await AdventOfCode.getLinesInput(1, 2021);
    // Part 1
    console.log(lines.map(Number).reduce((total: number, current: number, i: number, a: number[]) => i > 0 ? current > a[i - 1] ? total + 1 : total : total, 0));

    // Part 2
    console.log(lines.map(Number).reduce((total: number, _: number, i: number, a: number[]) => (i > 0 && i < a.length - 2) ? a[i] + a[i + 1] + a[i + 2] > a[i - 1] + a[i] + a[i + 1] ? total + 1 : total : total, 0));
})();