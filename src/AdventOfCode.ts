import * as dotenv from "dotenv";
import fetch from "node-fetch";
import * as fs from "fs";
dotenv.config();

type AdventDate = {
    year: number;
    day: number;
}

export default class AdventOfCode {
    private static readonly BASE_URL: string = "https://adventofcode.com";
    private static readonly INPUT_DIR: string = "./inputs";
    private static readonly MIN_YEAR: number = 2015;
    private static readonly MIN_DAY: number = 1;
    private static readonly MAX_DAY: number = 31;

    public static async getLinesInput(day?: number, year?: number): Promise<string[]> {
        const input: string = await AdventOfCode.getRawInput(day, year);
        return input.split(/\n|\r|\r\n/);
    }

    public static async getRawInput(day?: number, year?: number): Promise<string> {
        const adventDate: AdventDate = AdventOfCode.getAdventDate(day, year);
        const input: string | void = await AdventOfCode.readFileInput(adventDate);
        return input ? input : await AdventOfCode.fetchInput(adventDate);
    }

    private static async fetchInput(adventDate: AdventDate): Promise<string> {
        const url: string = `${AdventOfCode.BASE_URL}/${adventDate.year}/day/${adventDate.day}`;
        const res = await fetch(`${url}/input`, {
            "method": "GET",
            "headers": {
                "cookie": `session=${process.env.SESSION_TOKEN}`,
                "referer": url
            }
        });
        const body = await res.text();
        const input = body.trimEnd();
        await AdventOfCode.writeFileInput(adventDate, input);
        return input;
    }

    private static getAdventDate(inputDay?: number, inputYear?: number): AdventDate {
        const now = new Date();
        const currentYear: number = now.getUTCFullYear();
        const currentDay: number = now.getUTCDate();
        return {
            year: Math.max(AdventOfCode.MIN_YEAR, Math.min(currentYear, inputYear || currentYear)),
            day: Math.max(AdventOfCode.MIN_DAY, Math.min(AdventOfCode.MAX_DAY, inputDay || currentDay))
        }
    }

    private static async writeFileInput(adventDate: AdventDate, input: string): Promise<void> {
        const path: string = AdventOfCode.generateFilePath(adventDate);
        return new Promise((resolve) => {
            fs.promises.access(AdventOfCode.INPUT_DIR).catch(async() => {
                await fs.promises.mkdir(AdventOfCode.INPUT_DIR);
            }).then(async() => {
                await fs.promises.writeFile(path, input, { encoding: "utf-8" });
                return resolve();
            });
        });
    }

    private static async readFileInput(adventDate: AdventDate): Promise<string | void> {
        const path: string = AdventOfCode.generateFilePath(adventDate);
        return new Promise((resolve) => {
            fs.promises.readFile(path, { encoding: "utf-8" }).then((content: string) => {
                return resolve(content);
            }).catch(() => {
                return resolve();
            });
        });
    }

    private static generateFilePath(adventDate: AdventDate): string {
        return `${AdventOfCode.INPUT_DIR}/day${adventDate.day}_${adventDate.year}.txt`;
    }
}