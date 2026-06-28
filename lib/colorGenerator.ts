import { hashSeed, seededRandom } from "./utils";
import type { Song } from "@/components/tableCard";

export function generateCoverData(song: Song) {
    const rand = seededRandom(hashSeed(song.name) + song.id * 9999);

    // colors
    const hue1 = Math.floor(rand() * 360);
    const hue2 = (hue1 + 150) % 360;
    const bg = `hsl(${hue1}, 50%, 12%)`;
    const accent1 = `hsl(${hue1}, 80%, 60%)`;
    const accent2 = `hsl(${hue2}, 70%, 50%)`;

    // shapes
    const style = Math.floor(rand() * 3);
    const shapeCount = 5 + Math.floor(rand() * 6);
    const shapes = [];

    for (let i = 0; i < shapeCount; i++) {
        shapes.push({
            x: rand() * 300,
            y: rand() * 300,
            size: 20 + rand() * 80,
            color: rand() > 0.5 ? accent1 : accent2,
            opacity: 0.3 + rand() * 0.5,
        });
    }

    return { bg, accent1, accent2, style, shapes };
}

export function generateAlbumCover(song: Song): string {
    const { bg, accent1, shapes, style } = generateCoverData(song);

    const svgShapes = shapes
        .map((s) => {
            if (style === 0) {
                return `<circle cx="${s.x}" cy="${s.y}" r="${s.size}" fill="${s.color}" opacity="${s.opacity}"/>`;
            } else if (style === 1) {
                return `<rect x="${s.x}" y="${s.y}" width="${s.size}" height="${s.size}" fill="${s.color}" opacity="${s.opacity}" rx="4"/>`;
            } else {
                // triangle — polygon needs 3 points
                const x2 = s.x + s.size;
                const y2 = s.y + s.size;
                return `<polygon points="${s.x},${s.y} ${x2},${s.y} ${s.x},${y2}" fill="${s.color}" opacity="${s.opacity}"/>`;
            }
        })
        .join("");

    return `
        <svg width="100%" height="100%" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
            <rect width="300" height="300" fill="${bg}"/>
            ${svgShapes}
            <rect y="220" width="300" height="80" fill="black" opacity="0.6"/>
            <text x="16" y="255" font-family="sans-serif" font-size="16" font-weight="700" fill="white">${song.name}</text>
            <text x="16" y="278" font-family="sans-serif" font-size="12" fill="${accent1}">${song.artist}</text>
        </svg>
    `;
}
