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

export function seededRandom(seed: number) {
    let s = seed;
    return () => {
        s = (s * 1664525 + 1013904223) & 0xffffffff;
        return (s >>> 0) / 0xffffffff;
    };
}
const NOTES = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];

export function generateNotes(seed:number, length: number) {
    const rnd = seededRandom(seed);
    const scale = [0,2,4,5,7,9];

    return Array.from({ length }, () => {
        if (rnd() < 0.15) return null;
        return NOTES[scale[Math.floor(rnd() * scale.length)]] + '4'; 
    })
}


export function averageLike(avgLikes: number, faker: Faker) {
    const whole = Math.floor(avgLikes);
    const fraction = avgLikes - whole;

    const additionalChanceOfIncrease =
        faker.number.float({ min: 0, max: 1 }) < fraction ? 1 : 0;

    return whole + additionalChanceOfIncrease;
}
