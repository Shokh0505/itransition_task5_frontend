import { useEffect, useState } from "react";
import type { Song } from "@/components/tableCard";

export const useMusic = (page: number | string, seed: string, language?: string) => {
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState<any>(null);
    const [music, setMusic] = useState<Song[]>([]);


    const fetchMusic = async () => {
        try {
            setIsPending(true);
            const response = await fetch("/api/getMusic?page=" + page + "&seed=" + seed + "&lang=" + language);
            const data = await response.json();
            setMusic(data.data);
        } catch (error) {
            setError(error);
        } finally {
            setIsPending(false);
        }
    };

    useEffect(() => {
        fetchMusic();
    }, [page, seed, language]);

    return { isPending, error, music };
}