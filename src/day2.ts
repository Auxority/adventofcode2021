import AdventOfCode from "./AdventOfCode.js";

// Part 1
type CoordsPart1 = {
    x: number;
    depth: number;
}

const movesPart1: {[index: string]: Function} = {
    forward: (coords: CoordsPart1, distance: number) => {
        coords.x += distance;
    },
    down: (coords: CoordsPart1, distance: number) => {
        coords.depth += distance;
    },
    up: (coords: CoordsPart1, distance: number) => {
        coords.depth -= distance;
    }
}

function part1(lines: string[]) {
    const coords: CoordsPart1 = {
        x: 0,
        depth: 0
    };
    lines.forEach((line: string) => {
        const args: string[] = line.split(/\s/);
        const command: Function = movesPart1[args[0]];
        const distance: number = Number(args[1]);
        command(coords, distance);
    });
    console.log(`Part 1: ${coords.x * coords.depth}`);
}

// Part 2
type CoordsPart2 = {
    x: number;
    depth: number;
    aim: number;
}

const movesPart2: {[index: string]: Function} = {
    forward: (coords: CoordsPart2, distance: number) => {
        coords.x += distance;
        coords.depth += coords.aim * distance;
    },
    down: (coords: CoordsPart2, distance: number) => {
        coords.aim += distance;
    },
    up: (coords: CoordsPart2, distance: number) => {
        coords.aim -= distance;
    }
}

function part2(lines: string[]) {
    const coords: CoordsPart2 = {
        x: 0,
        depth: 0,
        aim: 0
    };
    lines.forEach((line: string) => {
        const args: string[] = line.split(/\s/);
        const command: Function = movesPart2[args[0]];
        const distance: number = Number(args[1]);
        command(coords, distance);
    });
    console.log(`Part 2: ${coords.x * coords.depth}`);
}

(async() => {
    const lines = await AdventOfCode.getLinesInput(2, 2021);
    
    part1(lines);
    part2(lines);
})();