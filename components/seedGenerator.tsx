import { Button } from "@/components/ui/button"
import { Field } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useTranslations } from "next-intl";

export function SeedGenerator() {
    const t = useTranslations("Navbar");
    return (
        <Field orientation="horizontal" className="w-auto">
            <Input type="number" placeholder={t("seedPlaceholder")} className="w-48 bg-white text-black dark:bg-white dark:text-black" />
            <Button className="bg-white text-black dark:bg-white dark:text-black hover:bg-gray-100 dark:hover:bg-gray-100 cursor-pointer rounded-sm">{t("generateSeed")}</Button>
        </Field>
    )
}
