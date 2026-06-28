import Image from "next/image"
import { AiOutlineLike } from "react-icons/ai";
import { BiSolidLike, BiPlay, BiPause } from "react-icons/bi";
import { useTranslations } from "next-intl";
import { useEffect, useRef } from "react";
import type { Song } from "./tableCard";
import { generateAlbumCover } from "@/lib/colorGenerator";
import * as Tone from "tone";
import { generateNotes, hashSeed } from "@/lib/utils";
import { useSeedStore } from "@/store/seedStore";

interface TableCollapseProps {
    isOpen: boolean;
    song: Song;
}

export const TableCollapse = ({ isOpen, song }: TableCollapseProps) => {
    const isLiked = true;
    const audioRef = useRef<HTMLAudioElement>(null);
    const { seed } = useSeedStore();
    const seqRef = useRef<any>(null);
    const t = useTranslations("Table");

    const handlePlay = async () => {
        await Tone.start();
        const synth = new Tone.Synth().toDestination();

        const notes = generateNotes(hashSeed(seed + song.artist), 240)

        seqRef.current = new Tone.Sequence((time, note) => {
            if (note) synth.triggerAttackRelease(note, '8n', time);
        }, notes, '8n');

        seqRef.current.loop = false;
        seqRef.current.start(0);
        Tone.getTransport().start();
    };

    const handlePause = () => {
        seqRef.current?.stop();
        Tone.getTransport().stop();
    };

    useEffect(() => {
        if (!isOpen) {
            handlePause();
        }
    }, [isOpen]);

    return (
        <tr>
            <td colSpan={6} className="p-0 border-0">
                <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                    <div className="overflow-hidden">
                        <div className="flex justify-start p-4">
                            {/* Left side - cover/likes */}
                            <div className="flex-1 flex flex-col items-center justify-center">
                                <div dangerouslySetInnerHTML={{ __html: generateAlbumCover(song) }} />
                                {/* <Image src="/cover.png" alt="cover" width={350} height={350} /> */}
                                <div className="mt-2 flex justify-end">
                                    <div className="flex w-fit items-center gap-2 py-3 px-6 bg-slate-100 rounded-lg">
                                        {
                                            isLiked ? <BiSolidLike size={24} /> : <AiOutlineLike size={24} />
                                        }
                                        <div className="w-px bg-black h-full" />
                                        <span className="text-sm">{song.likes} likes</span>
                                    </div>
                                </div>
                            </div>
                            {/* Right side - title, artist, album */}
                            <div className="flex-2 flex flex-col justify-center gap-4">
                                <div>
                                    <h4 className="text-2xl font-bold text-slate-900 mb-1">
                                        {song.id}. {song.name}
                                    </h4>
                                    <div className="text-slate-600 mb-1">
                                        {t("from")} <span className="font-semibold text-slate-800">{song.album}</span> {t("by")} <span className="font-semibold text-slate-800">{song.artist}</span>
                                    </div>
                                    <div className="text-slate-600 text-sm">
                                        {t("tags")}: <span className="font-medium bg-slate-100 px-2 py-1 rounded-md ml-1">{song.genre}</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 mt-2">
                                    <button
                                        onClick={handlePlay}
                                        className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-slate-900 text-white hover:bg-slate-800 transition-all active:scale-95 shadow-md font-medium"
                                    >
                                        <BiPlay size={22} /> Play
                                    </button>
                                    <button
                                        onClick={handlePause}
                                        className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 transition-all active:scale-95 font-medium"
                                    >
                                        <BiPause size={22} /> Pause
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </td>
        </tr>
    )
}

