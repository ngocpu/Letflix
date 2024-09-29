'use client'
import Footer from '@/components/footer'
import Navbar from '@/components/main-nav'
import MovieCard from '@/components/movie-card'
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination"
import { useLoading } from '@/hooks/useLoading'
import { seachDataApi } from '@/services/apis/searchApi'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Movie } from '../types'

const ResultsPage = () => {
    const searchParams = useSearchParams(); 
    const searchQuery = searchParams.get('search_query');
    const [results, setResults] = useState<Movie[]>([])
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)
    const {loading, startLoading, stopLoading} = useLoading()

    useEffect(() => {
        const getResults = async () => {
            startLoading()
            if (searchQuery) {
                const data = await seachDataApi(searchQuery, page.toString())
                setResults(data.results)
                setTotalPages(data.total_pages)
                stopLoading()
            }
        }
        getResults()
    }, [searchQuery, page])

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }
    };

    const renderPaginationItems = () => {
        const items = [];
        const maxPagesToShow = 2; // Number of pages to show before and after the current page

        // Add previous button if not on the first page
        if (page > 1) {
            items.push(
                <PaginationItem key="prev">
                    <PaginationPrevious onClick={() => handlePageChange(page - 1)} />
                </PaginationItem>
            );
        }

        // Always show page 1
        items.push(
            <PaginationItem key={1}>
                <PaginationLink isActive={page === 1} onClick={() => handlePageChange(1)}>1</PaginationLink>
            </PaginationItem>
        );

        // If we are on the first page, show pages 2 and 3, and then ellipsis if more pages exist
        if (page === 1) {
            if (totalPages > 1) {
                items.push(
                    <PaginationItem key={2}>
                        <PaginationLink onClick={() => handlePageChange(2)}>2</PaginationLink>
                    </PaginationItem>
                );
            }
            if (totalPages > 2) {
                items.push(
                    <PaginationItem key={3}>
                        <PaginationLink onClick={() => handlePageChange(3)}>3</PaginationLink>
                    </PaginationItem>
                );
            }
            if (totalPages > 3) {
                items.push(<PaginationItem key="ellipsis-end">...</PaginationItem>);
            }
            if (totalPages > 3) {
                items.push(
                    <PaginationItem key={totalPages}>
                        <PaginationLink onClick={() => handlePageChange(totalPages)}>
                            {totalPages}
                        </PaginationLink>
                    </PaginationItem>
                );
            }
        } else {
            // For other pages
            let startPage = Math.max(2, page - maxPagesToShow);
            let endPage = Math.min(totalPages - 1, page + maxPagesToShow);

            // If there are pages before the current page
            if (startPage > 2) {
                items.push(<PaginationItem key="ellipsis-start">...</PaginationItem>);
            }

            for (let i = startPage; i <= endPage; i++) {
                items.push(
                    <PaginationItem key={i}>
                        <PaginationLink
                            isActive={page === i}
                            onClick={() => handlePageChange(i)}
                        >
                            {i}
                        </PaginationLink>
                    </PaginationItem>
                );
            }

            // If there are pages after the current page
            if (endPage < totalPages - 1) {
                items.push(<PaginationItem key="ellipsis-end">...</PaginationItem>);
            }

            // Always show the last page
            if (totalPages > 1) {
                items.push(
                    <PaginationItem key={totalPages}>
                        <PaginationLink isActive={page === totalPages} onClick={() => handlePageChange(totalPages)}>
                            {totalPages}
                        </PaginationLink>
                    </PaginationItem>
                );
            }
        }

        // Add next button if not on the last page
        if (page < totalPages) {
            items.push(
                <PaginationItem key="next">
                    <PaginationNext onClick={() => handlePageChange(page + 1)} />
                </PaginationItem>
            );
        }

        return items;
    };

    return (
        <div className='relative w-full h-full text-xs'>
            <Navbar />
            <main className='mt-16 mx-10 md:mx-16'>
                <p className='text-xs text-gray-500'>All results for: <span className='text-white'>{searchQuery}</span></p>
                {/* <div className="flex gap-5 items-center flex-wrap w-full my-10">
                    {results?.map(item => (
                        <div className="h-[200px]" key={item?.id}>
                            <MovieCard data={item} loading={loading} />
                        </div>
                    ))}
                </div> */}
                <div className="flex flex-col items-center gap-12 md:gap-5 my-10 md:flex-row md:flex-wrap">
                    {results?.map(item => (
                        <div className="w-full h-full md:w-auto" key={item?.id}>
                            <MovieCard data={item} loading={loading} />
                        </div>
                    ))}
                </div>
                <div className="flex justify-center mb-10 items-center text-xs">
                    <Pagination className='text-xs'>
                        <PaginationContent>
                            {renderPaginationItems()}
                        </PaginationContent>
                    </Pagination>
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default ResultsPage;
