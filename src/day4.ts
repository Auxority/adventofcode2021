import AdventOfCode from "./AdventOfCode.js";

type BingoRow = [number, number, number, number, number];
type BingoCard = [BingoRow, BingoRow, BingoRow, BingoRow, BingoRow];
type BingoInput = {
    numbersDrawn: number[];
    bingoCards: BingoCard[];
}
type BingoResult = {
    numbersDrawn: number[];
    bingoCard: BingoCard;
}

const getNumbersDrawn = (lines: string[]): number[] => lines[0].split(",").map(Number);

const getBingoCards = (lines: string[]): BingoCard[] => {
    const bingoCards: BingoCard[] = [];

    for (let i = 2; i < lines.length; i += 6) {
        const bingoCard: BingoCard = [
            getBingoRow(lines[i]),
            getBingoRow(lines[i + 1]),
            getBingoRow(lines[i + 2]),
            getBingoRow(lines[i + 3]),
            getBingoRow(lines[i + 4]),
        ];
        bingoCards.push(bingoCard);
    }

    return bingoCards;
}

const checkRow = (row: BingoRow, numbersDrawn: number[]): boolean => row.reduce((total: number, bingoCardNumber: number): number => numbersDrawn.some((numberDrawn: number): boolean => numberDrawn === bingoCardNumber) ? total + 1 : total, 0) === row.length;

const isBingo = (bingoCard: BingoCard, numbersDrawn: number[]): boolean => {
    return bingoCard.some((row: BingoRow, index: number) => {
        const column: BingoRow = bingoCard.map((row: BingoRow) => row[index]) as BingoRow;
        return checkRow(row, numbersDrawn) || checkRow(column, numbersDrawn);
    });
}

const getBingoRow = (line: string): BingoRow => {
    const numberMatches = line.match(/[0-9]+/g) as RegExpMatchArray;
    return numberMatches.map(Number) as BingoRow;
}

const readInput = async(): Promise<BingoInput> => {
    const lines: string[] = await AdventOfCode.getLinesInput(4, 2021);
    return {
        numbersDrawn: getNumbersDrawn(lines),
        bingoCards: getBingoCards(lines)
    }
}

const calculateFinalScore = (bingoResult: BingoResult | void): number => {
    if (!bingoResult) {
        throw new Error("Could not find any valid bingo cards!");
    }

    const bingoCard: BingoCard = bingoResult.bingoCard;
    const numbersDrawn: number[] = bingoResult.numbersDrawn;

    const unmarkedNumbers: number[] = [];
    bingoCard.forEach((row: BingoRow): void => {
        row.forEach((bingoCardNumber: number): void => {
            if (typeof numbersDrawn.find((drawnNumber: number): boolean => drawnNumber === bingoCardNumber) !== "number") {
                unmarkedNumbers.push(bingoCardNumber);
            }
        });
    });

    const sum: number = unmarkedNumbers.reduce((total: number, current: number) => total + current, 0);
    const lastDrawn: number = numbersDrawn[numbersDrawn.length - 1];

    return sum * lastDrawn;
}

const findFirstBingo = (input: BingoInput): BingoResult | void => {
    const numbersDrawn: number[] = [];
    for (let i = 0; i < input.numbersDrawn.length; i++) {
        numbersDrawn.push(input.numbersDrawn[i]);
        const bingoCard: BingoCard | undefined = input.bingoCards.find((currentBingoCard: BingoCard): boolean => isBingo(currentBingoCard, numbersDrawn));
        if (bingoCard) {
            return {
                bingoCard: bingoCard,
                numbersDrawn: numbersDrawn
            };
        }
    }
}

const findLastBingo = (input: BingoInput): BingoResult | void => {
    const numbersDrawn: number[] = [];
    const foundBingoNumbers: number[] = [];
    let lastBingo: BingoCard | unknown;
    let lastNumbersDrawn: number[] = [];

    for (let i = 0; i < input.numbersDrawn.length; i++) {
        numbersDrawn.push(input.numbersDrawn[i]);
        input.bingoCards.forEach((bingoCard: BingoCard, cardIndex: number) => {
            if (foundBingoNumbers.find((foundBingoNumber: number): boolean => foundBingoNumber === cardIndex) === undefined && isBingo(bingoCard, numbersDrawn)) {
                foundBingoNumbers.push(cardIndex);
                lastNumbersDrawn = numbersDrawn.slice();
                lastBingo = bingoCard;
            }
        });
    }

    return {
        bingoCard: lastBingo as BingoCard,
        numbersDrawn: lastNumbersDrawn
    }
}

const part1 = (input: BingoInput): void => {
    const firstBingoResult: BingoResult | void = findFirstBingo(input);
    const finalScore: number = calculateFinalScore(firstBingoResult);

    console.log(finalScore);
}

const part2 = (input: BingoInput): void => {
    const lastBingoResult: BingoResult | void = findLastBingo(input);
    const finalScore: number = calculateFinalScore(lastBingoResult);

    console.log(finalScore);
}

(async() => {
    const input: BingoInput = await readInput();

    part1(input);
    part2(input);
})();