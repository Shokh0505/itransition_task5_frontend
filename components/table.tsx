"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { TableCard } from "./tableCard";
import { TableList } from "./tableList";
import { useNavStore } from "@/store/navbar";
import { useMusic } from "@/hooks/useMusic";
import { useSearchParams } from "next/navigation";
import { useSeedStore } from "@/store/seedStore";
import InfiniteScroll from "react-infinite-scroll-component";

export function Table() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [songID, setSongID] = useState<null | number>(null)
    const t = useTranslations("Table");
    const { view } = useNavStore();
    const params = useSearchParams();
    const { seed } = useSeedStore();
    const language = params.get("lang") || "en";
    const { averageLike } = useNavStore();
    const { isPending, error, music, loadMore } = useMusic(seed, averageLike, language);

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
                        isPending && music.length === 0 && (
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
                        !error && view === 'list' && (
                            (
                                music.map((song) => (
                                    <TableList key={song.id} song={song} songID={songID} isCollapsed={isCollapsed} handleSelectSong={handleSelectSong} />
                                ))
                            )
                        )
                    }
                    <tr>
                        <td colSpan={6}>

                            {
                                !error && (
                                    <InfiniteScroll
                                        dataLength={music.length}
                                        next={loadMore}
                                        hasMore={true}
                                        style={{ display: view === 'gallery' ? 'block' : 'none' }}
                                        loader={isPending && music.length > 0 ? <h4>Loading...</h4> : null}
                                    >
                                        <div className="px-4 py-3 grid grid-cols-3 gap-4">
                                            {music.map((song) => (
                                                <TableCard key={song.id} song={song} isActive={song.id === songID} onClick={() => handleSelectSong(song.id)} />
                                            ))}
                                        </div>
                                    </InfiniteScroll>
                                )
                            }

                        </td>
                    </tr>
                </tbody>
            </table>
        </div >
    )
}