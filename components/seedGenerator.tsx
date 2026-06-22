import { Button } from "@/components/ui/button"
import { Field } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useTranslations } from "next-intl";
import { useSeedStore } from "@/store/seedStore";

export function SeedGenerator() {
    const t = useTranslations("Navbar");
    const { seed, generateSeed, setSeed } = useSeedStore();
    return (
        <Field orientation="horizontal" className="w-auto">
            <Input type="text" value={seed} onChange={(e) => setSeed(e.target.value)} placeholder={t("seedPlaceholder")} className="w-48 bg-white text-black dark:bg-white dark:text-black" />
            <Button onClick={() => generateSeed()} className="bg-white text-black dark:bg-white dark:text-black hover:bg-gray-100 dark:hover:bg-gray-100 cursor-pointer rounded-sm">{t("generateSeed")}</Button>
        </Field>
    )
}
