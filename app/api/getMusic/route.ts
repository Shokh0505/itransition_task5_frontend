import { Faker, en, ru } from "@faker-js/faker";
import { hashSeed, averageLike } from "@/lib/utils";

export async function GET(request: Request) {
    const params = new URL(request.url).searchParams;
    const seed = params.get("seed");
    const page = params.get("page");
    const language = params.get("lang") || "en";
    const averageLikes = params.get("averageLikes");

    if (!seed) {
        return Response.json({ error: "Seed is required" }, { status: 400 });
    }

    if (!averageLikes || isNaN(Number(averageLikes))) {
        return Response.json(
            { error: "Average likes must be a number" },
            { status: 400 },
        );
    }

    if (!page || isNaN(Number(page))) {
        return Response.json(
            { error: "Page must be a number" },
            { status: 400 },
        );
    }

    const hashedSeed = hashSeed(seed);

    const faker = new Faker({ locale: language === "ru" ? ru : en });
    faker.seed(hashedSeed * 123456 + Number(page));

    const songs = [];
    let songId = +page === 1 ? 0 : Number(page) * 10;
    for (let i = 0; i < 20; i++) {
        songs.push({
            id: ++songId,
            name: faker.music.songName(),
            artist: faker.person.fullName(),
            album: faker.music.album(),
            genre: faker.music.genre(),
            likes: averageLike(+averageLikes, faker),
        });
    }

    return Response.json({ data: songs }, { status: 200 });
}
