"use client";
import { CiBoxList } from "react-icons/ci";
import { RiGalleryView2 } from "react-icons/ri";

import { NavbarDropdown } from "./navbarDropdown";
import { NavbarLikes } from "./navbarLikes";
import { SeedGenerator } from "./seedGenerator";
import { useNavStore } from "@/store/navbar";
import { useTranslations } from "next-intl";
import { useMusic } from "@/hooks/useMusic";
import { useSeedStore } from "@/store/seedStore";

export function Navbar() {
    const { view, setView } = useNavStore();
    const { seed } = useSeedStore();
    const { averageLike } = useNavStore();
    const { refresh } = useMusic(seed, averageLike);
    const t = useTranslations("Navbar");

    function handleClick (viewType: "list" | "gallery") {
        setView(viewType);
        refresh();
    }

    return (
        <nav className="bg-slate-100 px-4 py-4 flex justify-between items-center">
            <div className="flex items-center justify-start gap-4">
                <div className="flex items-center gap-4">
                    <div className="text-sm">{t("language")}: </div>
                    <NavbarDropdown />
                </div>
                <div className="flex items-center gap-4">
                    <div className="text-sm">{t("seed")}:</div>
                    <SeedGenerator />
                </div>
                <NavbarLikes />
            </div>
            <div className="flex items-center justify-between gap-2">
                <div className={`${view === 'list' ? "bg-white" : ""} p-2 rounded-md cursor-pointer`}
                    onClick={() => handleClick('list')}
                >
                    <CiBoxList size={24} />
                </div>
                <div className={`${view === 'gallery' ? "bg-white" : ""} p-2 rounded-md cursor-pointer`}
                    onClick={() => handleClick('gallery')}
                >
                    <RiGalleryView2 size={24} />
                </div>

            </div>
        </nav>
    )
}