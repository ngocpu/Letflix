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
import { seachDataApi } from '@/services/apis/searchApi'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

const ResultsPage = () => {
    const searchParams = useSearchParams(); // Get search parameters
    const searchQuery = searchParams.get('search_query');
    const [results, setResults] = useState<any[]>([])
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)

    useEffect(() => {
        const getResults = async () => {
            if (searchQuery) {
                const data = await seachDataApi(searchQuery, page.toString())
                console.log(data)
                setResults(data.results)
                setTotalPages(data.total_pages)
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
    return (
        <div className='relative w-full h-full text-xs'>
            <Navbar />
            <main className='mt-16 ml-6 md:mx-16'>
                <p className='text-xs text-gray-500'>All results for: <span className='text-white'>{searchQuery}</span></p>
                <div className="flex gap-5 items-center flex-wrap w-full my-10">
                    {results?.map(item => (
                        <div className="h-[200px]" key={item?.id}>
                            <MovieCard data={item} />
                        </div>
                    ))}
                </div>
                <div className="flex justify-center mb-10 items-center text-xs">
                    <Pagination className='text-xs'>
                        <PaginationContent>
                            <PaginationItem className='text-xs'>
                                {page > 1 && (
                                    <PaginationPrevious
                                        className='text-xs'
                                        onClick={() => handlePageChange(page - 1)}
                                    />
                                )}
                            </PaginationItem>
                            {[...Array(totalPages)].map((_, index) => (
                                <PaginationItem key={index + 1}>
                                    <PaginationLink
                                        isActive={page === index + 1}
                                        onClick={() => handlePageChange(index + 1)}
                                        className={`text-xs`}
                                    >
                                        {index + 1}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}
                            <PaginationItem>
                                {page < totalPages && (
                                    <PaginationNext
                                        onClick={() => handlePageChange(page + 1)}
                                    />
                                )}
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default ResultsPage