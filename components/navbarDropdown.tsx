"use client"

import { IoLanguageOutline } from "react-icons/io5";
import { useState } from "react"
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

export function NavbarDropdown() {
    const [language, setLanguage] = useState("Uzbek");

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-28 justify-start bg-white text-black hover:bg-gray-100 dark:bg-white dark:text-black dark:hover:bg-gray-100 cursor-pointer rounded-sm">
                    <IoLanguageOutline className="mr-2" />
                    {language}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-32">
                <DropdownMenuGroup>
                    <DropdownMenuLabel>Choose the language:</DropdownMenuLabel>
                    <DropdownMenuRadioGroup value={language} onValueChange={setLanguage}>
                        <DropdownMenuRadioItem value="English">English</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="Uzbek">Uzbek</DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
