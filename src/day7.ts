import AdventOfCode from "./AdventOfCode.js";

type Costs = {
    fuelCost: number;
    alignPosition: number;
}

function sortCostsAscending(a: Costs, b: Costs): number {
    if (a.fuelCost < b.fuelCost) {
        return -1;
    } else if (a.fuelCost > b.fuelCost) {
        return 1;
    }
    return 0;
}

function calculateFuelCostPart1(crabPosition: number, alignPosition: number): number {
    return Math.abs(alignPosition - crabPosition);
}

function calculateFuelCostsPart1(crabs: number[]): Costs {
    const fuelCosts: Costs[] = [];

    const min: number = Math.min(...crabs);
    const max: number = Math.max(...crabs);

    for (let alignPosition = min; alignPosition < max; alignPosition++) {
        const fuelCost: number = crabs.reduce((total: number, crabPosition: number) => {
            return total + calculateFuelCostPart1(crabPosition, alignPosition);
        }, 0);
        fuelCosts.push({
            fuelCost: fuelCost,
            alignPosition: alignPosition
        });
    }

    const sortedFuelCosts = fuelCosts.sort(sortCostsAscending);
    return sortedFuelCosts[0];
}

function calculateFuelCost(crabPosition: number, alignPosition: number): number {
    let addition = 0;
    const delta = Math.abs(alignPosition - crabPosition);
    for (let i = 0; i <= delta; i++) {
        addition += i;
    }
    return addition;
}

function calculateFuelCosts(crabs: number[]): Costs {
    const fuelCosts: Costs[] = [];

    const min: number = Math.min(...crabs);
    const max: number = Math.max(...crabs);

    for (let alignPosition = min; alignPosition < max; alignPosition++) {
        const fuelCost: number = crabs.reduce((total: number, crabPosition: number) => {
            return total + calculateFuelCost(crabPosition, alignPosition);
        }, 0);
        fuelCosts.push({
            fuelCost: fuelCost,
            alignPosition: alignPosition
        });
    }

    const sortedFuelCosts = fuelCosts.sort(sortCostsAscending);
    return sortedFuelCosts[0];
}

function part2(crabs: number[]) {
    const fuelCosts = calculateFuelCosts(crabs);
    console.log(fuelCosts);
}

function part1(crabs: number[]) {
    const fuelCosts = calculateFuelCostsPart1(crabs);
    console.log(fuelCosts);
}

(async() => {
    const input = await AdventOfCode.getRawInput(7, 2021);
    const crabs = input.split(",").map(Number);
    part1(crabs);
    part2(crabs);
})();