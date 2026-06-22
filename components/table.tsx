"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { TableCard } from "./tableCard";
import { TableList } from "./tableList";
import { useNavStore } from "@/store/navbar";
import { useMusic } from "@/hooks/useMusic";
import { useSearchParams } from "next/navigation";
import { useSeedStore } from "@/store/seedStore";

const SONGS = [
    {
        id: 1,
        name: "Alif elfs go",
        artist: "Elton Smith",
        album: "Oh, my god",
        genre: "Rock",
    },
    {
        id: 2,
        name: "Alif elfs go",
        artist: "Elton Smith",
        album: "Oh, my god",
        genre: "Rock",
    },
    {
        id: 3,
        name: "Alif elfs go",
        artist: "Elton Smith",
        album: "Oh, my god",
        genre: "Rock",
    },
    {
        id: 4,
        name: "Alif elfs go",
        artist: "Elton Smith",
        album: "Oh, my god",
        genre: "Rock",
    },
    {
        id: 5,
        name: "Alif elfs go",
        artist: "Elton Smith",
        album: "Oh, my god",
        genre: "Rock",
    },
    {
        id: 6,
        name: "Alif elfs go",
        artist: "Elton Smith",
        album: "Oh, my god",
        genre: "Rock",
    },
    {
        id: 7,
        name: "Alif elfs go",
        artist: "Elton Smith",
        album: "Oh, my god",
        genre: "Rock",
    },
    {
        id: 8,
        name: "Alif elfs go",
        artist: "Elton Smith",
        album: "Oh, my god",
        genre: "Rock",
    },
    {
        id: 9,
        name: "Alif elfs go",
        artist: "Elton Smith",
        album: "Oh, my god",
        genre: "Rock",
    },
    {
        id: 10,
        name: "Alif elfs go",
        artist: "Elton Smith",
        album: "Oh, my god",
        genre: "Rock",
    },
    {
        id: 11,
        name: "Alif elfs go",
        artist: "Elton Smith",
        album: "Oh, my god",
        genre: "Rock",
    },
]

export function Table() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [songID, setSongID] = useState<null | number>(null)
    const t = useTranslations("Table");
    const { view } = useNavStore();
    const params = useSearchParams();
    const page = params.get("page") || 1;
    const { seed } = useSeedStore();
    const language = params.get("lang") || "en";
    const { averageLike } = useNavStore();
    const { isPending, error, music } = useMusic(page, seed, averageLike, language);

    const handleSelectSong = (id: number) => {
        if (songID === id) {
            setIsCollapsed(false);
            setSongID(null);
        } else {
            setSongID(id);
            setIsCollapsed(true);
        }
    }


    return (
        <div>
            <table className="w-full table-auto border-collapse text-left">
                <thead>
                    <tr className="border-b border-gray-200 text-sm text-gray-500">
                        <th className="w-10 px-4 py-3 font-medium"></th>
                        <th className="px-4 py-3 font-medium">#</th>
                        <th className="px-4 py-3 font-medium">{t("song")}</th>
                        <th className="px-4 py-3 font-medium">{t("artist")}</th>
                        <th className="px-4 py-3 font-medium">{t("album")}</th>
                        <th className="px-4 py-3 font-medium">{t("genre")}</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        isPending && (
                            <tr>
                                <td colSpan={6}>
                                    <div className="px-4 py-3">
                                        <div className="text-center text-gray-500">Loading...</div>
                                    </div>
                                </td>
                            </tr>
                        )
                    }
                    {
                        !isPending && !error && view === 'list' && (
                            (
                                music.map((song) => (
                                    <TableList key={song.id} song={song} songID={songID} isCollapsed={isCollapsed} handleSelectSong={handleSelectSong} />
                                ))
                            )
                        )
                    }
                    <tr>
                        <td colSpan={6}>
                            <div className="px-4 py-3 grid grid-cols-3 gap-4">
                                {
                                    !isPending && !error && view === 'gallery' && (
                                        music.map((song) => (
                                            <TableCard key={song.id} song={song} isActive={song.id === songID} onClick={() => handleSelectSong(song.id)} />
                                        ))
                                    )
                                }
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}