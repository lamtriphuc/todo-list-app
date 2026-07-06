type TodoPaginationProps = {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    onPageChange: (page: number) => void;
};

const TodoPagination = ({
    currentPage,
    totalPages,
    totalItems,
    onPageChange,
}: TodoPaginationProps) => {
    if (totalItems === 0) {
        return null;
    }

    function handlePreviousPage() {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    }

    function handleNextPage() {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    }

    return (
        <div className="flex justify-center">
            <div className="flex items-center justify-between gap-2 sm:justify-end">
                <button
                    type="button"
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    Trước
                </button>

                <span className="text-sm font-medium text-gray-700">
                    Trang {currentPage} / {totalPages}
                </span>

                <button
                    type="button"
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    Sau
                </button>
            </div>
        </div>
    )
}

export default TodoPagination