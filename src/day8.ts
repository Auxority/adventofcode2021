import AdventOfCode from "./AdventOfCode.js";

function convertOutputToDigit(outputString: string): number {
    if (outputString.length === 2) {
        return 1;
    } else if (outputString.length === 3) {
        return 7;
    } else if (outputString.length === 4) {
        return 4;
    } else if (outputString.length === 7) {
        return 8;
    }
    return 0;
}

(async() => {
    const input = await AdventOfCode.getLinesInput(8, 2021);

    const entries = input.map((line) => {
        const args = line.split(/\s/);
        return {
            signalPatterns: args.splice(0, 10),
            output: args.splice(1, 4).map(convertOutputToDigit)
        }
    });

    const total = entries.map(e => e.output).reduce((total, currentOutput) => total + currentOutput.reduce((outputTotal, current) => current > 0 ? outputTotal + 1 : outputTotal, 0), 0);
    console.log(total);
})();