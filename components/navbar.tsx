"use client";
import { CiBoxList } from "react-icons/ci";
import { RiGalleryView2 } from "react-icons/ri";

import { NavbarDropdown } from "./navbarDropdown";
import { NavbarLikes } from "./navbarLikes";
import { SeedGenerator } from "./seedGenerator";
import { useNavStore } from "@/store/navbar";
import { useTranslations } from "next-intl";

export function Navbar() {
    const { view, setView } = useNavStore();
    const t = useTranslations("Navbar");

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
                    onClick={() => setView('list')}
                >
                    <CiBoxList size={24} />
                </div>
                <div className={`${view === 'gallery' ? "bg-white" : ""} p-2 rounded-md cursor-pointer`}
                    onClick={() => setView('gallery')}
                >
                    <RiGalleryView2 size={24} />
                </div>

            </div>
        </nav>
    )
}