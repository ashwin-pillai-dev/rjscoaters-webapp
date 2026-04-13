import { getClients } from "../services";
import {s3bucketurl} from '../../../constants'
import Image from "next/image";
import {Client} from '@prisma/client'
import { requestParams } from "@/utils/queryHelper/queryHelper.types";
import { getClientTypes } from "../../client-type/services";
import DropDownFilter from "@/app/components/DropDownFilter";
import SeachBox from "@/app/components/SeachBox";
import PaginationComp from "@/app/components/PaginationComp";



export default async function  page({ searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | undefined }>
}) {


    const { page = '1', limit = '10', sort = 'asc', type = '',name='' } = await searchParams
    const reqParams: requestParams = {
        page: Number(page),
        limit: Number(limit),
        filters: [],
        orderBy: 'id,ASC',
        fullTextSearch: ''
    }

    if (type) {
        reqParams.filters.push({ field: 'clientTypeId', cond: 'equals', value: type })
    }
    if (name) {
        reqParams.filters.push({ field: 'name', cond: 'contains', value: name })
    }
    const response:any= await getClientTypes({query:'',page:'1',limit:'1000'})
    const clientTypes:any= response

    const clients = await getClients(reqParams)

    return (
        <section className="bg-gray-50 dark:bg-gray-900 sm:p-5">
            <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
                {/* <!-- Start coding here --> */}
                <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                    <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                    <SeachBox name="name" placeholder="Client name"/>
                    <DropDownFilter options={clientTypes} field="id" placeholder="Type" />
                        <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                            <a href="/admin/clients/add" className="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
                                <svg className="h-3.5 w-3.5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                    <path clipRule="evenodd" fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                                </svg>
                                Add Clients
                            </a>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-4 py-3">Name</th>
                                    <th scope="col" className="px-4 py-3">Email</th>
                                    <th scope="col" className="px-4 py-3">Contact Number</th>
                                    <th scope="col" className="px-4 py-3">City</th>
                                    <th scope="col" className="px-4 py-3">Address</th>
                                    <th scope="col" className="px-4 py-3">Client Type</th>
                                    {/* <th scope="col" className="px-4 py-3">
                                        <span className="sr-only">Actions</span>
                                    </th>  */}
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    clients.data.map((client) => {
                                        return (
                                            <tr className="border-b dark:border-gray-700" key={client.id}>
                                                <th scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{client.name}</th>
                                                <td className="px-4 py-3">{client.email}</td>
                                                <td className="px-4 py-3">{client.contactNumber}</td>
                                                <td className="px-4 py-3">{client.city.name}</td>
                                                <td className="px-4 py-3">{client?.address}</td>
                                                <td className="px-4 py-3">{client.clientType.name}</td>
                                            </tr>
                                        )
                                    })
                                }

                            </tbody>
                        </table>
                        <PaginationComp  total={clients.total}  />
                    </div>

                </div>
            </div>
        </section>
    )

}