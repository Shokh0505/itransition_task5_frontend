import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Faker } from "@faker-js/faker";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function hashSeed(seed: string) {
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
        hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
    }
    return hash;
}

export function averageLike(avgLikes: number, faker: Faker) {
    const whole = Math.floor(avgLikes);
    const fraction = avgLikes - whole;

    const additionalChanceOfIncrease =
        faker.number.float({ min: 0, max: 1 }) < fraction ? 1 : 0;

    return whole + additionalChanceOfIncrease;
}
