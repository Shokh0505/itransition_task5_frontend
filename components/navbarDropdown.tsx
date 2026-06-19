"use client"

import { IoLanguageOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTranslations } from "next-intl";

const languageObj = {
    en: "English",
    uz: "Uzbek"
}

export function NavbarDropdown() {
    const language = Cookies.get("NEXT_LOCALE") || 'en';
    const router = useRouter();
    const t = useTranslations("Navbar");

    function handleLanguageChange(language: string) {
        Cookies.set("NEXT_LOCALE", language);
        router.refresh();
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-28 justify-start bg-white text-black hover:bg-gray-100 dark:bg-white dark:text-black dark:hover:bg-gray-100 cursor-pointer rounded-sm">
                    <IoLanguageOutline className="mr-2" />
                    {languageObj[language as keyof typeof languageObj]}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-32">
                <DropdownMenuGroup>
                    <DropdownMenuLabel>{t("chooseLanguage")}:</DropdownMenuLabel>
                    <DropdownMenuRadioGroup value={language} onValueChange={handleLanguageChange}>
                        <DropdownMenuRadioItem value="en">{t("languegeOptions.en")}</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="uz">{t("languegeOptions.uz")}</DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
