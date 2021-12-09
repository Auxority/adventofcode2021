import AdventOfCode from "./AdventOfCode.js";

type Entry = {
    signalPatterns: string[];
    outputs: string[];
}

function doesPatternContain(a: string, b: string): boolean {
    for (let i = 0; i < b.length; i++) {
        if (!a.includes(b[i])) {
            return false;
        }
    }
    return true;
}

function patternSubtract(a: string, b: string) {
    const bArray: string[] = b.split("");
    return a.split("").filter((character: string) => {
        return bArray.find((x) => x === character) ? false : true;
    }).join("");
}

function getKnownDigits(signalPatterns: string[]): string[] {
    const uniqueDigitLengths: number[] = [2, 3, 4, 7];
    return signalPatterns
        .filter((signalPattern: string) => uniqueDigitLengths.includes(signalPattern.length))
        .sort((a, b) => a.length - b.length);
}

function handleEntry(entry: Entry) {
    const signalPatterns = entry.signalPatterns;

    const knownPatterns = getKnownDigits(signalPatterns);

    // Decimal: 18
    const digit1 = knownPatterns[0];
    // Decimal: 82
    const digit7 = knownPatterns[1];
    // Decimal: 58
    const digit4 = knownPatterns[2];
    // Decimal: 127
    const digit8 = knownPatterns[3];

    const segmentBD = patternSubtract(digit4, digit1);
    const digit9 = signalPatterns.filter((pattern) => pattern.length === 6 && doesPatternContain(pattern, digit7) && doesPatternContain(pattern, segmentBD))[0];
    const segmentE = patternSubtract(digit8, digit9);
    const digit5 = signalPatterns.filter((pattern) => pattern.length === 5 && doesPatternContain(pattern, segmentBD))[0];
    const segmentC = patternSubtract( patternSubtract(digit8, digit5), segmentE );
    const digit6 = patternSubtract(digit8, segmentC);
    const digit2 = signalPatterns.filter((pattern) => pattern.length === 5 && !doesPatternContain(pattern, digit5) && doesPatternContain(pattern, segmentE))[0];
    const digit0 = signalPatterns.filter((pattern) => pattern.length === 6 && !doesPatternContain(pattern, digit9) && !doesPatternContain(pattern, digit6))[0];
    const digit3 = signalPatterns.filter((pattern) => pattern.length === 5 && !doesPatternContain(pattern, digit5) && !doesPatternContain(pattern, digit2))[0];

    return [
        digit0,
        digit1,
        digit2,
        digit3,
        digit4,
        digit5,
        digit6,
        digit7,
        digit8,
        digit9
    ];
}

(async() => {
    const input = await AdventOfCode.getLinesInput(8, 2021);

    const part2 = input.map((line) => {
        const args = line.split(/\s/);
        return {
            signalPatterns: args.splice(0, 10),
            outputs: args.splice(1, 4)
        }
    }).map((entry: Entry) => {
        const digits = handleEntry(entry);
        const outputs: number[] = [];
        entry.outputs.forEach((output: string) => {
            digits.forEach((digit: string, index: number) => {
                if (digit.length === output.length && doesPatternContain(digit, output)) {
                    outputs.push(index);
                }
            });
        });

        return Number(outputs.join(""));
    }).reduce((total, current) => {
        return total + current;
    }, 0);

    console.log(part2);
})();