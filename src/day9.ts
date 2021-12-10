import AdventOfCode from "./AdventOfCode.js";

type Point = {y: number, x: number};

type AdjacentPoint = {
    point: Point;
    value?: number;
}

type AdjacentPoints = {
    up: AdjacentPoint;
    down: AdjacentPoint;
    left: AdjacentPoint;
    right: AdjacentPoint;
}

type AdjacentOption = "up" | "down" | "left" | "right";

function getAdjacentPoints(grid: number[][], i: number, j: number): AdjacentPoints {
    return {
        up: {
            point: {y: i - 1, x: j},
            value: grid[i - 1] ? grid[i - 1][j] : undefined
        },
        down: {
            point: {y: i + 1, x: j},
            value: grid[i + 1] ? grid[i + 1][j] : undefined
        },
        left: {
            point: {y: i, x: j - 1},
            value: grid[i][j - 1]
        },
        right: {
            point: {y: i, x: j + 1},
            value: grid[i][j + 1]
        }
    }
}

function isLowPoint(grid: number[][], i: number, j: number): boolean {
    const adjacentPoints = getAdjacentPoints(grid, i, j);
    const currentValue = grid[i][j];

    const keys = Object.keys(adjacentPoints) as AdjacentOption[];
    for (let i = 0; i < 4; i++) {
        const adjacentOption: AdjacentOption = keys[i];
        const adjacentPoint: AdjacentPoint = adjacentPoints[adjacentOption];
        const adjacentValue: number | undefined = adjacentPoint.value;
        if (adjacentValue !== undefined && currentValue >= adjacentValue) {
            return false;
        }
    }
    return true;
}

function part1(grid: number[][]): void {
    const lowPoints: number[] = [];
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (isLowPoint(grid, i, j)) {
                lowPoints.push(grid[i][j]);
            }
        }
    }

    const total: number = lowPoints.reduce((total: number, point: number) => total + point + 1, 0);
    console.log(total);
}

function floodFill(grid: number[][], i: number, j: number, basin: Point[]): Point[] {
    const adjacentPoints: AdjacentPoints = getAdjacentPoints(grid, i, j);
    const currentValue: number = grid[i][j];

    const keys = Object.keys(adjacentPoints) as AdjacentOption[];
    for (let k = 0; k < 4; k++) {
        const key: AdjacentOption = keys[k];
        const adjacentPoint: AdjacentPoint = adjacentPoints[key];
        if (adjacentPoint.value && adjacentPoint.value < 9 && adjacentPoint.value === currentValue + 1) {
            const exists = basin.find((basinPoint: Point) => basinPoint.y === adjacentPoint.point.y && basinPoint.x === adjacentPoint.point.x);
            if (!exists) {
                console.log(adjacentPoint.point, adjacentPoint.value);
                basin.push(adjacentPoint.point);
                floodFill(grid, adjacentPoint.point.y, adjacentPoint.point.x, basin);
            }
        }
    }

    return basin;
}

function part2(grid: number[][]): void {
    const height: number = grid.length;
    const width: number = grid[0].length;
    
    const basins = [];
    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            if (isLowPoint(grid, i, j)) {
                // replace with pushing a 0 instead of grid[i][j] later on. Debugging purposes rn.
                basins.push(floodFill(grid, i, j, [{y: i, x: j}]));
            }
        }
    }

    const sortedBasins = basins.sort((a, b) => b.length - a.length);

    console.log(sortedBasins[0].length * sortedBasins[1].length * sortedBasins[2].length);
}

(async() => {
    const input: string[] = await AdventOfCode.getLinesInput(9, 2021);
    const grid = input.map((e: string) => e.split("").map(Number));

    // part1(grid);
    part2(grid);
})();