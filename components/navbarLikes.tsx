"use client"
import { Slider } from "@/components/ui/slider"
import { useTranslations } from "next-intl";
import { useNavStore } from "@/store/navbar";

export function NavbarLikes() {
    const { averageLike, setAverageLike } = useNavStore();
    const t = useTranslations("Navbar");

    return (
        <div className="flex items-center justify-around ml-4">
            <div className="mr-2">
                {t("averageLikes")}: ({averageLike.toFixed(1)})
            </div>
            <Slider
                defaultValue={[5]}
                max={10}
                min={0}
                step={0.1}
                value={[averageLike]}
                onValueChange={(averageLike) => setAverageLike(averageLike[0])}
                className="mx-auto w-32"
            />
        </div>
    )
}
