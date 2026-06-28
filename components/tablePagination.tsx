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
import { useNavStore } from "@/store/navbar";
import { usePageStore } from "@/store/pageStore";

export const TablePagination = () => {
    const { page: currentPage, setPage } = usePageStore();
    const { view } = useNavStore();

    if (view === 'gallery') return null;

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    }

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
