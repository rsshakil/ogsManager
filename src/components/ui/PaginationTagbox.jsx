
import { ITEMS_PER_PAGE } from "../../utils/commonConst";
const { v4: uuidv4 } = require('uuid');

const listItemCommonClasses = ' inline-block py-2 rounded ';
const PAGE_SIZE = 5;

export default function PaginationTagbox({ currentPage = 0, totalRecordsCount = 0, handleOnPageChange = () => { }, pageSize = PAGE_SIZE, itemsPerPage = ITEMS_PER_PAGE }) {

    const currentPageNo = Number(currentPage) + 1;
    let totalPages = Math.ceil(totalRecordsCount / itemsPerPage);


    const handleonChangePage = (e) => {
        e.preventDefault();
        const { pageno = 0 } = e.target?.dataset || {};

        if (!isNaN(pageno) && pageno != currentPageNo) {
            handleOnPageChange(e, Number(pageno) - 1);
        }
    }

    const handleOnClickBackword = (e) => {
        e.preventDefault();

        if (currentPageNo > 1 && currentPageNo <= totalPages) {
            handleOnPageChange(e, Number(currentPage) - 1);
        }
    }

    const handleOnClickForword = (e) => {
        e.preventDefault();

        if (currentPageNo >= 1 && currentPageNo < totalPages) {
            handleOnPageChange(e, Number(currentPage) + 1);
        }
    }


    const renderPageNumbers = () => {
        const pageNumbers = [];

        // Calculate the start and end page numbers
        let startPage = Math.max(currentPageNo - Math.ceil(pageSize / 2), 1);
        let endPage = Math.min(startPage + pageSize - 1, totalPages);

        // Adjust the start page if there are fewer pages to display
        if (endPage - startPage + 1 < pageSize) {
            startPage = Math.max(endPage - pageSize + 1, 1);
        }

        // Add ellipsis if necessary
        if (startPage > 1) {
            pageNumbers.push(<button type="button" key={uuidv4()} data-pageno={1} onClick={handleonChangePage} className={`paginate-btn ${listItemCommonClasses} px-2`}>1</button>);

            if (startPage > 1) {
                pageNumbers.push(<button type="button" key={uuidv4()} data-pageno="" className={`paginate-btn ${listItemCommonClasses}`}>. . .</button>);
            }

            startPage += 1;
        }

        // Add the page numbers to display
        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(<button type="button" key={i} data-pageno={i} onClick={handleonChangePage} className={i == currentPageNo ? `paginate-btn ${listItemCommonClasses} px-2 bg-ogs-yellow-nomal text-[#133483] ` : `paginate-btn ${listItemCommonClasses} px-2 cursor-pointer`}>{i}</button>);
        }

        // Add ellipsis if necessary
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                pageNumbers.push(<button type="button" key={uuidv4()} data-pageno="" className={`paginate-btn ${listItemCommonClasses}`}>. . .</button>);
            }

            pageNumbers.push(
                <button type="button" key={uuidv4()} data-pageno={totalPages} onClick={handleonChangePage} className={`paginate-btn ${listItemCommonClasses} px-2`}>
                    {totalPages}
                </button>
            );
        }

        return pageNumbers;
    };


    return (
        <div className="flex count-pagination-wrapper">
            <div className="text-center text-sm font-normal text-white footer-left">
                <p>データ件数 : {totalRecordsCount}件</p>
            </div>

            {(itemsPerPage < totalRecordsCount) && (
                <div className="grow text-center text-white">
                    {totalRecordsCount > 0 && (
                        <div className="text-sm font-normal">
                            <button type="button" disabled={currentPageNo == 1} onClick={handleOnClickBackword} className={`paginate-btn ${listItemCommonClasses} px-2 ${currentPageNo == 1 ? 'text-[#D5D5D5] cursor-default' : 'text-[#FFFFFF] cursor-pointer'}`}>&lt;</button>
                            {renderPageNumbers()}
                            <button type="button" disabled={currentPageNo == totalPages} onClick={handleOnClickForword} className={`paginate-btn ${listItemCommonClasses} px-2 ${currentPageNo == totalPages ? 'text-[#D5D5D5] cursor-default' : 'text-[#FFFFFF] cursor-pointer'}`}>&gt;</button>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}