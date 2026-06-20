"use client";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { useSearchParams, useRouter } from "next/navigation";

export const TablePagination = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const page = searchParams.get("page") || '1';
    const currentPage = parseInt(page, 10) || 1;

    const handlePageChange = (newPage: number) => {
        const params = new URLSearchParams(searchParams);
        if (newPage) {
            params.set("page", newPage.toString());
        } else {
            params.delete("page");
        }
        router.push(`?${params.toString()}`);
    };

    let pages = [];
    if (currentPage <= 2) {
        pages = [1, 2, 3];
    } else {
        pages = [currentPage - 1, currentPage, currentPage + 1];
    }

    return (
        <div>
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious 
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                handlePageChange(Math.max(1, currentPage - 1));
                            }}
                        />
                    </PaginationItem>

                    {currentPage > 2 && (
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                    )}

                    {pages.map((p) => (
                        <PaginationItem key={p}>
                            <PaginationLink 
                                href="#"
                                isActive={currentPage === p}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handlePageChange(p);
                                }}
                            >
                                {p}
                            </PaginationLink>
                        </PaginationItem>
                    ))}

                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>

                    <PaginationItem>
                        <PaginationNext 
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                handlePageChange(currentPage + 1);
                            }}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
};
