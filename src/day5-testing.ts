import AdventOfCode from "./AdventOfCode.js";

type Point = {
    x: number;
    y: number;
}

type Line = [
    Point,
    Point
];

function getPoint(rawPoint: string): Point {
    const coordinates: number[] = rawPoint.split(",").map(Number);
    return {
        x: coordinates[0],
        y: coordinates[1],
    }
}

function getLine(inputLine: string): Line {
    const rawParts: string[] = inputLine.split(/\s/);
    rawParts.splice(1, 1);
    return rawParts.map(getPoint) as Line;
}

function getLineFunction(line: Line): Function {
    const m: number = (line[1].y - line[0].y) / (line[1].x - line[0].x);
    const b: number = line[0].y - m * line[0].x;
    return (x: number) => m * x + b;
}

(async() => {
    const input = await AdventOfCode.getLinesInput(5, 2021);
    const lines: Line[] = input.map(getLine);

    const lineFunction = getLineFunction(lines[0]);
    console.log(lineFunction(0));
    console.log(lineFunction(1));
    console.log(lineFunction(2));
    console.log(lineFunction(3));

    // console.log(slope);



    // console.log(lines);
})();