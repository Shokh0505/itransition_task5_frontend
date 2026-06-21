import { useTranslations } from "next-intl";
import { IoIosMusicalNotes, IoIosPlayCircle } from "react-icons/io";

export interface Song {
    id: number;
    name: string;
    artist: string;
    album: string;
    genre: string;
}

interface TableCardProps {
    song: Song;
    isActive?: boolean;
    onClick?: () => void;
}

export const TableCard = ({ song, isActive, onClick }: TableCardProps) => {
    const t = useTranslations("Table");

    return (
        <div
            onClick={onClick}
            className={`h-fit group relative overflow-hidden rounded-2xl border bg-background/50 p-5 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10 cursor-pointer
                ${isActive ? 'border-primary ring-2 ring-primary/50 shadow-lg shadow-primary/20' : 'border-border'}
            `}
        >
            {/* Background decorative gradient */}
            <div className="absolute -right-10 -top-10 z-0 h-40 w-40 rounded-full bg-gradient-to-br from-primary/20 to-transparent blur-3xl transition-opacity duration-500 group-hover:opacity-100 opacity-40"></div>

            <div className="relative z-10 flex items-start gap-4">
                {/* Album Art Placeholder */}
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 text-primary shadow-inner transition-transform duration-300 group-hover:scale-105 group-hover:shadow-primary/20">
                    <IoIosMusicalNotes className="text-2xl opacity-70 transition-opacity group-hover:opacity-100" />
                </div>

                <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                        <h3 className="line-clamp-1 text-lg font-bold tracking-tight text-foreground">{song.name}</h3>
                        <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary backdrop-blur-sm">
                            {song.genre}
                        </span>
                    </div>
                    <p className="text-sm font-medium text-muted-foreground">
                        {song.artist}
                    </p>

                    <div className="mt-3 flex items-center justify-between border-t border-border/50 pt-3 text-xs text-muted-foreground">
                        <span className="max-w-[150px] truncate font-medium">
                            <span className="text-foreground/70">{t("album") || "Album"}:</span> {song.album}
                        </span>
                        <span className="font-mono rounded-md bg-muted/50 px-2 py-1 tracking-wider">#{song.id}</span>
                    </div>

                    {/* Elite Audio Player Integration */}
                    {isActive && (
                        <div className="mt-4 animate-in fade-in slide-in-from-top-2 duration-500 ease-out">
                            <audio
                                controls
                                src="/Rihanna.mp3"
                                className="h-10 w-full opacity-90 transition-opacity hover:opacity-100 focus:outline-none"
                            />
                        </div>

                    )}
                </div>
            </div>
        </div>
    );
};
