import AdventOfCode from "./AdventOfCode.js";

type Point = {
    x: number;
    y: number;
}

type Line = [
    Point,
    Point
];

type Diagram = number[][];

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

function getLines(input: string[]): Line[] {
    return input.map(getLine);
}

function findMaxX(lines: Line[]): number {
    let highest: number = 0;
    lines.forEach((line: Line) => {
        if (line[0].x > highest) {
            highest = line[0].x;
        } else if (line[1].x > highest) {
            highest = line[1].x;
        }
    });
    return highest;
}

function findMaxY(lines: Line[]): number {
    let highest: number = 0;
    lines.forEach((line: Line) => {
        if (line[0].y > highest) {
            highest = line[0].y;
        } else if (line[1].y > highest) {
            highest = line[1].y;
        }
    });
    return highest;
}

function getDiagram(lines: Line[]): Diagram {
    const [maxX, maxY]: number[] = [findMaxX(lines) + 1, findMaxY(lines) + 1];
    const diagram: Diagram = [];
    for (let y = 0; y < maxY; y++) {
        diagram[y] = [];
        for (let x = 0; x < maxX; x++) {
            diagram[y][x] = 0;
        }
    }
    return diagram;
}

function diagramToString(diagram: Diagram): string {
    return diagram.map((diagramLine: number[]) => {
        return diagramLine.map((point: number) => point === 0 ? "." : point).join("");
    }).join("\n");
}

function printDiagram(diagram: Diagram): void {
    console.log(diagramToString(diagram));
}

function isVerticalLine(line: Line): boolean {
    return line[0].x === line[1].x;
}

function isHorizontalLine(line: Line): boolean {
    return line[0].y === line[1].y;
}

function isDiagonalLine(line: Line): boolean {
    return Math.abs(line[0].x - line[1].x) === Math.abs(line[0].y - line[1].y);
}

function drawHorizontalLine(diagram: Diagram, line: Line): void {
    const startX: number = Math.min(line[0].x, line[1].x);
    const endX: number = Math.max(line[0].x, line[1].x);
    const y: number = line[0].y;
    for (let x = startX; x <= endX; x++) {
        diagram[y][x] += 1;
    }
}

function drawVerticalLine(diagram: Diagram, line: Line): void {
    const start: number = Math.min(line[0].y, line[1].y);
    const end: number = Math.max(line[0].y, line[1].y);
    const x: number = line[0].x;
    for (let y = start; y <= end; y++) {
        diagram[y][x] += 1;
    }
}

function drawDiagonalLine(diagram: Diagram, line: Line): void {
    const delta: number = Math.abs(line[0].x - line[1].x);

    const leftPoint: Point = line[0].x < line[1].x ? line[0] : line[1];
    const rightPoint: Point = line[0].x > line[1].x ? line[0] : line[1];
    const isRightUp: boolean = leftPoint.y > rightPoint.y;

    if (isRightUp) {
        const minX: number = Math.min(leftPoint.x, rightPoint.x);
        const maxY: number = Math.max(leftPoint.y, rightPoint.y);
        for (let i = 0; i <= delta; i++) {
            diagram[maxY - i][minX + i] += 1;
        }
    } else {
        const minX: number = Math.min(leftPoint.x, rightPoint.x);
        const minY: number = Math.min(leftPoint.y, rightPoint.y);
        for (let i = 0; i <= delta; i++) {
            diagram[minY + i][minX + i] += 1;
        }
    }
}

function drawLine(diagram: Diagram, line: Line): void {
    if (isHorizontalLine(line)) {
        drawHorizontalLine(diagram, line);
    } else if (isVerticalLine(line)) {
        drawVerticalLine(diagram, line);
    } else if (isDiagonalLine(line)) {
        drawDiagonalLine(diagram, line);
    }
}

function generateDiagram(lines: Line[]): Diagram {
    const diagram = getDiagram(lines);
    lines.forEach((line) => drawLine(diagram, line));
    return diagram;
}

function countOverlappingPoints(diagram: Diagram): number {
    return diagram.reduce((total, row) => total + row.filter((num) => num > 1).length, 0);
}

(async () => {
    const input: string[] = await AdventOfCode.getLinesInput(5, 2021);
    const lines: Line[] = getLines(input);
    const diagram = generateDiagram(lines);
    const overlappingPoints = countOverlappingPoints(diagram);

    printDiagram(diagram);
    console.log(`Overlapping points: ${overlappingPoints}`);
})();