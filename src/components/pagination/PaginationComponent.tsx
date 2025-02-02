import { useSearchParams } from "react-router-dom";
import "../../css/PaginationStyle.css";

export const PaginationComponent = () => {
    const [query, setQuery] = useSearchParams();
    const currentPage = parseInt(query.get('page') || '1');
    const handlePrev = () => {
        if (currentPage > 1) {
            setQuery({ page: (currentPage - 1).toString() });
        }
    };

    const handleNext = () => {
        setQuery({ page: (currentPage + 1).toString() });
    };

    return (
        <div className="pagination">
            <button onClick={handlePrev} disabled={currentPage === 1}>
                Prev
            </button>
            <button onClick={handleNext}>
                Next
            </button>
        </div>
    );
};
