import Image from "next/image"
import { AiOutlineLike } from "react-icons/ai";
import { BiSolidLike } from "react-icons/bi";
import { useTranslations } from "next-intl";
import { useEffect, useRef } from "react";

export const TableCollapse = ({ isOpen }: { isOpen: boolean }) => {
    const isLiked = true;
    const audioRef = useRef<HTMLAudioElement>(null);
    const t = useTranslations("Table");

    useEffect(() => {
        if (!isOpen) {
            audioRef.current?.pause();
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
                                <Image src="/cover.png" alt="cover" width={350} height={350} />
                                <div className="mt-2 flex justify-end">
                                    <div className="flex w-fit items-center gap-2 py-3 px-6 bg-slate-100 rounded-lg">
                                        {
                                            isLiked ? <BiSolidLike size={24} /> : <AiOutlineLike size={24} />
                                        }
                                        <div className="w-px bg-black h-full" />
                                        <span className="text-sm">23 likes</span>
                                    </div>
                                </div>
                            </div>
                            {/* Right side - title, artist, album */}
                            <div className="flex-2">
                                <div className="flex items-center justify-start gap-2">
                                    <h4 className="text-xl font-semibold">
                                        12. Huge Ponies
                                    </h4>
                                    <audio controls ref={audioRef}>
                                        <source src="/Rihanna.mp3" />
                                        Your browser does not support the audio element.
                                    </audio>
                                </div>
                                <div>
                                    {t("from")} <span className="font-semibold">Oh, my god</span> {t("by")} <span className="font-semibold">Elton Smith</span>
                                </div>
                                <div>
                                    {t("tags")} : <span className="font-semibold">Rock</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </td>
        </tr>
    )
}
