import PaginationComp from "@/app/components/PaginationComp";
import { requestParams } from "@/utils/queryHelper/queryHelper.types";
import { getCategories } from "../services";
import SeachBox from "@/app/components/SeachBox";

export type categoryType ={
    name:string;
    id:string;
    image:string

}

export default async function page({ searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>
}) {

    const { page = '1',limit = '10', sort = 'asc', name = '' } = await searchParams
    const reqParams: requestParams = {
        page:Number(page),
        limit:Number(limit) ,
        filters: [],
        orderBy: 'id,ASC',
        fullTextSearch: ''
      }

      if(name){
        reqParams.filters.push({field:'name',cond:'contains',value:name})
        
      }

    const categories = await getCategories(reqParams)
    return (
        <section className="bg-gray-50 dark:bg-gray-900 sm:p-5">
            <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
                {/* <!-- Start coding here --> */}
                <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                    <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                    <SeachBox name="name" placeholder='Name'/>
                        <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                            <a href="/admin/categories/add" className="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
                                <svg className="h-3.5 w-3.5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                    <path clipRule="evenodd" fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                                </svg>
                                Add Category
                            </a>

                            {/* <pre>{JSON.stringify(session, null, 2)}</pre> */}
                            <div className="flex items-center space-x-3 w-full md:w-auto">
                                <button id="actionsDropdownButton" data-dropdown-toggle="actionsDropdown" className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" type="button">
                                    <svg className="-ml-1 mr-1.5 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                        <path clipRule="evenodd" fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                                    </svg>
                                    Actions
                                </button>
                                <div id="actionsDropdown" className="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                                    <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="actionsDropdownButton">
                                        <li>
                                            <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Mass Edit</a>
                                        </li>
                                    </ul>
                                    <div className="py-1">
                                        <a href="#" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete all</a>
                                    </div>
                                </div>
                                <div id="filterDropdown" className="z-10 hidden w-48 p-3 bg-white rounded-lg shadow dark:bg-gray-700">
                                    <h6 className="mb-3 text-sm font-medium text-gray-900 dark:text-white">Choose brand</h6>
                                    <ul className="space-y-2 text-sm" aria-labelledby="filterDropdownButton">
                                        <li className="flex items-center">
                                            <input id="apple" type="checkbox" value="" className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                            <label htmlFor="apple" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">Apple (56)</label>
                                        </li>

                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-4 py-3">Category Name</th>
                                    <th scope="col" className="px-4 py-3">Actions</th>

                                    {/* <th scope="col" className="px-4 py-3"></th>
                                    <th scope="col" className="px-4 py-3">Description</th>
                                    <th scope="col" className="px-4 py-3">Price</th>
                                    <th scope="col" className="px-4 py-3">
                                        <span className="sr-only">Actions</span>
                                    </th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    categories.data.map((category) => {                                        
                                        return (
                                            <tr className="border-b dark:border-gray-700" key={category.id}>

          
                                                <th scope="row" className="flex items-center px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {/* <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                                                <Image fill={true} style={{objectFit:'contain'}} src={s3bucketurl + category.image } alt="" className="rounded-full" />
                                                </div> */}
                                                <span className="font-medium text-gray-700 whitespace-nowrap dark:text-white">
                                                {category.name}
                                                </span>
                                                    </th>
                                                    <td className="px-4 py-3">
                                                    <a href={`/admin/categories/edit/${category.id}`} className="text-blue-400 cursor-pointer text-underline">
                                                        Edit
                                                    </a>
                                                </td>

                                            </tr>
                                        )
                                    })
                                }

                            </tbody>
                        </table>
                        
                        <PaginationComp  total={categories.total}  />
                    </div>

                </div>
            </div>
        </section>
    )

}