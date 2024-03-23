import { useDispatch, useSelector } from "react-redux";
import { ITEMS_PER_PAGE } from "../../utils/commonConst";
import { setPaginationData } from "../../features/pagination/paginateSlice";
const { v4: uuidv4 } = require('uuid');

const listItemCommonClasses = ' inline-block py-2 rounded ';
const pageSize = 5;

export default function Pagination() {
    const dispatch = useDispatch();

    const { currentPage, count: totalRecordsCount } = useSelector(state => state.paginate) || {};

    const currentPageNo = Number(currentPage) + 1;
    let totalPages = Math.ceil(totalRecordsCount / ITEMS_PER_PAGE);

    // console.log('my current page no : currentPageNo', currentPageNo)


    const handleonChangePage = (e) => {
        e.preventDefault();

        const { pageno = 0 } = e.target?.dataset || {};
        // console.log('eeeeeeeeeeeeeee', pageno);

        if (!isNaN(pageno) && pageno != currentPageNo) {
            dispatch(setPaginationData({ currentPage: Number(pageno) - 1 }));
        }
    }

    const handleOnClickBackword = (e) => {
        e.preventDefault();

        if (currentPageNo > 1 && currentPageNo <= totalPages) {
            dispatch(setPaginationData({ currentPage: Number(currentPage) - 1 }));
        }
    }

    const handleOnClickForword = (e) => {
        e.preventDefault();

        if (currentPageNo >= 1 && currentPageNo < totalPages) {
            dispatch(setPaginationData({ currentPage: Number(currentPage) + 1 }));
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
            pageNumbers.push(<button key={uuidv4()} data-pageno={1} onClick={handleonChangePage} className={`${listItemCommonClasses} px-2`}>1</button>);

            if (startPage > 1) {
                pageNumbers.push(<button key={uuidv4()} data-pageno="" className={`${listItemCommonClasses}`}>. . .</button>);
            }

            startPage += 1;
        }

        // Add the page numbers to display
        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(<button key={i} data-pageno={i} onClick={handleonChangePage} className={i == currentPageNo ? `${listItemCommonClasses} px-2 bg-ogs-yellow-nomal text-[#133483] ` : `${listItemCommonClasses} px-2 cursor-pointer`}>{i}</button>);
        }

        // Add ellipsis if necessary
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                pageNumbers.push(<button key={uuidv4()} data-pageno="" className={`${listItemCommonClasses}`}>. . .</button>);
            }

            pageNumbers.push(
                <button key={uuidv4()} data-pageno={totalPages} onClick={handleonChangePage} className={`${listItemCommonClasses} px-2`}>
                    {totalPages}
                </button>
            );
        }

        return pageNumbers;
    };


    return (
        <>
            {/*<div className="text-center text-sm font-normal text-white footer-left">
                <p>データ件数 : {totalRecordsCount}件</p>
            </div>*/}

            <div className="grow text-center text-white">
                {totalRecordsCount > 0 && (
                    <div className="text-sm font-normal">
                        <button disabled={currentPageNo == 1} onClick={handleOnClickBackword} className={`${listItemCommonClasses} px-2 ${currentPageNo == 1 ? 'text-[#D5D5D5] cursor-default' : 'text-[#FFFFFF] cursor-pointer'}`}>&lt;</button>
                        {renderPageNumbers()}
                        <button disabled={currentPageNo == totalPages} onClick={handleOnClickForword} className={`${listItemCommonClasses} px-2 ${currentPageNo == totalPages ? 'text-[#D5D5D5] cursor-default' : 'text-[#FFFFFF] cursor-pointer'}`}>&gt;</button>
                    </div>
                )}
            </div>
        </>
    )
}