import { Navbar } from "@/components/navbar";
import { NextIntlClientProvider } from "next-intl";

export default function Home() {
  return (
    <NextIntlClientProvider>
      <div className="px-10 py-4">
        <Navbar />
      </div>
    </NextIntlClientProvider>
  );
}
