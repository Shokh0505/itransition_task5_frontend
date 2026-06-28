import { useEffect, useState } from "react";
import type { Song } from "@/components/tableCard";
import { usePageStore } from "@/store/pageStore";
import { useNavStore } from "@/store/navbar";

export const useMusic = (seed: string, averageLikes: number, language?: string) => {
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState<any>(null);
    const [music, setMusic] = useState<Song[]>([]);
    const { page, setPage } = usePageStore();
    const { view } = useNavStore();
    

    const fetchMusic = async (currentPage: number) => {
        try {
            setIsPending(true);
            const response = await fetch("/api/getMusic?page=" + currentPage + "&seed=" + seed + "&lang=" + language + "&averageLikes=" + averageLikes);
            const data = await response.json();
            
            if (view === "list" || currentPage === 1) {
                setMusic(data.data);
            } else {
                setMusic((prev) => {
                    const existingIds = new Set(prev.map(s => s.id));
                    const uniqueData = data.data.filter((s: Song) => !existingIds.has(s.id));
                    return [...prev, ...uniqueData];
                });
            }
        } catch (error) {
            setError(error);
        } finally {
            setIsPending(false);
        }
    };

    const refresh = () => {
        setPage(1);
        setMusic([]);
        fetchMusic(1);
    };

    useEffect(() => {
        setPage(1);
    }, [seed, language, averageLikes, setPage]);

    useEffect(() => {
        fetchMusic(page);
    }, [page, seed, language, averageLikes]);

    const loadMore = () => setPage(page + 1);

    return { isPending, error, music, refresh, loadMore };
}