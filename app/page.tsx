import { Navbar } from "@/components/navbar";
import { Table } from "@/components/table";
import { TablePagination } from "@/components/tablePagination";
import { NextIntlClientProvider } from "next-intl";

export default function Home() {
  return (
    <NextIntlClientProvider>
      <div className="px-10 py-4 h-screen flex flex-col">
        <div className="h-fit">
          <Navbar />
        </div>
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <Table />
        </div>
        <div className="h-fit p-2">
          <TablePagination />
        </div>
      </div>
    </NextIntlClientProvider>
  );
}
