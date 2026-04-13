'use client'
import { useEffect, useState, useRef } from "react"
import { useRouter } from 'next/navigation'
import { useDebounce } from "use-debounce";

interface PropType {
    routeUrl: string,
    searchText: string
}

export default function SearchBar(props: PropType) {
    const router = useRouter();
    const { routeUrl, searchText } = props;
    const [text, setText] = useState(searchText);


    const handleKeyPress = (e: any) => {
        e.preventDefault();
        console.log('key:' + e.key);

        if (e.key === 'Enter') {
            if (!e.target.value) {
                router.push(`${routeUrl}`)
            } else {

                router.push(`${routeUrl}?search=${e.target.value}`)
            }
        }
    };


    return (
        <div className="w-full md:w-1/2">
            <label htmlFor="simple-search" className="sr-only">Search</label>
            <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                    </svg>
                </div>
                <input
                    type="text"
                    id="simple-search"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Search"
                    value={text}
                    onChange={e => setText(e.target.value)}
                    onKeyUp={handleKeyPress}
                />
            </div>
        </div>

    )



}