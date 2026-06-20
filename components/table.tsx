"use client";

import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { TableCollapse } from "./tableCollapse";
import { Fragment, useState } from "react";
import { useTranslations } from "next-intl";

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
                    {SONGS.map(song => (
                        <Fragment key={song.id}>
                            <tr onClick={() => handleSelectSong(song.id)}>
                                <td className="px-4 py-3">
                                    {songID === song.id && isCollapsed ? <IoIosArrowUp /> : <IoIosArrowDown />}
                                </td>
                                <td className="px-4 py-3">{song.id}</td>
                                <td className="px-4 py-3">{song.name}</td>
                                <td className="px-4 py-3">{song.artist}</td>
                                <td className="px-4 py-3">{song.album}</td>
                                <td className="px-4 py-3">{song.genre}</td>
                            </tr>
                            <TableCollapse isOpen={isCollapsed && songID === song.id} />
                        </Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    )
}