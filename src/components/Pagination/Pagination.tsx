import { useEffect } from "react";
import { useMovieStore } from "../../store/useMovieStore";
import { scrollToTop } from "../../utils/ScrollToTop";
import "./Pagination.css";

export const Pagination = () => {
    const { page, setPage, totalPages } = useMovieStore();

    const handlePageChange = (selectedPage: number) => {
        if (selectedPage >= 1 && selectedPage <= totalPages) {
            setPage(selectedPage);
        }
    };

    const handleNext = () => {
        if (page < totalPages) {
            setPage(page + 1);
        }
    };

    const handlePrev = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    const handleFirst = () => setPage(1);
    const handleLast = () => setPage(totalPages);

    const pagesToShow = 5;
    const startPage = Math.max(1, page - Math.floor(pagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + pagesToShow - 1);

    const pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }

    useEffect(() => {
        scrollToTop();
    }, [page])

    return (
        <div className="pagination">
            <button onClick={handleFirst} disabled={page === 1}>
                Primeiro
            </button>
            <button onClick={handlePrev} disabled={page === 1}>
                {"<"}
            </button>

            {pageNumbers.map((pageNumber) => (
                <button
                    key={pageNumber}
                    onClick={() => handlePageChange(pageNumber)}
                    className={page === pageNumber ? "active" : ""}
                >
                    {pageNumber}
                </button>
            ))}

            <button onClick={handleNext} disabled={page === totalPages}>
                {">"}
            </button>
            <button onClick={handleLast} disabled={page === totalPages}>
                Último
            </button>
        </div>
    );
};