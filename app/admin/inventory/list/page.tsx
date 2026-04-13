import { getInventory } from "../services";
import Image from "next/image";
import { s3bucketurl } from "@/app/constants";
import SearchBar from "../../components/seacrhBar/SearchBar";
import Pagination from "../../components/pagination/Pagination";
import PaginationComp from "@/app/components/PaginationComp";
import SeachBox from "@/app/components/SeachBox";
import { requestParams } from "@/utils/queryHelper/queryHelper.types";
import { getProducts } from "../../products/services";
import DropDownFilter from "@/app/components/DropDownFilter";
import { getInventoryTypes } from "../../inventory-type/services";



export default async function page({ searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | undefined }>
}) {

    const { page = '1', limit = '10', sort = 'asc', type = '',product='' } = await searchParams
    const reqParams: requestParams = {
        page: Number(page),
        limit: Number(limit),
        filters: [],
        orderBy: 'id,ASC',
        fullTextSearch: ''
    }

    if (type) {
        reqParams.filters.push({ field: 'inventoryTypeId', cond: 'equals', value: type })
    }
    if (product) {
        reqParams.filters.push({ field: 'productId', cond: 'equals', value: product })
    }
    const products = await getProducts({ filters: [], page: 1, limit: 1000, orderBy: 'createdAt,DESC', fullTextSearch: '' })
    const inventoryTypes = await getInventoryTypes()


    const response: any = await getInventory(reqParams)
    const inventories = response
    const { total } = response

    return (
        <section className="bg-gray-50 dark:bg-gray-900 sm:p-5">
            <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
                {/* <!-- Start coding here --> */}
                <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                    <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                        <SeachBox name="name" placeholder="Inventory name" />
                        <DropDownFilter options={products.data} field="id" placeholder="Product" />
                        <DropDownFilter options={inventoryTypes} field="id" placeholder="Type" />

                        <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                            <a href="/admin/inventory/add" className="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
                                <svg className="h-3.5 w-3.5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                    <path clipRule="evenodd" fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                                </svg>
                                Add Inventory
                            </a>
                        </div>

                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-4 py-3">Name</th>
                                    <th scope="col" className="px-4 py-3">Inventory Type</th>
                                    <th scope="col" className="px-4 py-3">Product</th>
                                    <th scope="col" className="px-4 py-3">Quantity</th>
                                    <th scope="col" className="px-4 py-3">Actions</th>

                                </tr>
                            </thead>
                            <tbody>
                                {
                                    inventories.data.map((inventory) => {
                                        return (
                                            <tr className="border-b dark:border-gray-700" key={inventory.id}>

                                                <th scope="row" className="flex items-center px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    {/* <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                                                <Image fill={true} style={{objectFit:'contain'}} src={s3bucketurl + inventory.image } alt="" className="rounded-full" />
                                                </div> */}
                                                    <span className="font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                        {inventory.name}
                                                    </span>
                                                </th>
                                                <td className="px-4 py-3">{inventory.inventoryType.name}</td>
                                                <td className="px-4 py-3">{inventory?.products?.name}</td>
                                                <td className="px-4 py-3">{inventory.qty}</td>
                                                <td className="px-4 py-3">
                                                    <a href={`/admin/inventory-logs/list/${inventory.id}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Inventory logs</a>
                                                </td>
                                                {/* <td className="px-4 py-3">{partner.contactNumber}</td> */}
                                            </tr>
                                        )
                                    })
                                }

                            </tbody>
                        </table>
                    </div>
                    <PaginationComp total={inventories.total} />
                </div>
            </div>
        </section>
    )

}
