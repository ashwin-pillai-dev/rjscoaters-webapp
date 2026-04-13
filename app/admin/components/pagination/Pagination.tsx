export default function Pagination({ limit, total, page ,route}: {
    limit: number,
    total: number,
    page: number,
    route:string
}) {

    const pageNumbers = [];
    for (let i = page; i <= page + 2; i++) {
        pageNumbers.push(i);
    }


    return (
        <nav className="flex flex-col items-start justify-between p-4 space-y-3 md:flex-row md:items-center md:space-y-0" aria-label="Table navigation">
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                Showing
                <span className="font-semibold text-gray-900 dark:text-white">{` ${page==1?1: (page-1) * limit +1} - ${limit * page}`} </span>
                of
                <span className="font-semibold text-gray-900 dark:text-white"> {total}</span>
            </span>
            <ul className="inline-flex items-stretch -space-x-px">
                <li>
                    <a href={`${route}&page=${(page - 1).toString()}&limit=${limit.toString()}`} className="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                        <span className="sr-only">Previous</span>
                        <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                    </a>
                </li>

                {pageNumbers.map((pageNumber) => (
                    <li key={pageNumber}>
                        <a href={`${route}&page=${pageNumber.toString()}&limit=${limit.toString()}`} className={`flex items-center justify-center px-3 py-2 text-sm leading-tight ${pageNumber === page ? 'text-primary-600 bg-primary-50 border-primary-300' : 'text-gray-500 bg-white border border-gray-300'} hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}>
                            {pageNumber}
                        </a>
                    </li>
                ))}

                <li>
                    <a href="#" className="flex items-center justify-center px-3 py-2 text-sm leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">...</a>
                </li>

                <li>
                    <a href={`${route}&page=${(page + 1).toString()}&limit=${limit.toString()}`} className="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                        <span className="sr-only">Next</span>
                        <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                    </a>
                </li>
            </ul>
        </nav>
    );
}