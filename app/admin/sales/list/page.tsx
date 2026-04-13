import { getSales } from "../services";
import Pagination from "../../components/pagination/Pagination";
import { getClients } from "../../clients/services";
import { getAgents } from "../../partners/services";
import FilterSearch from "../../components/FilterSearch/FilterSearch";
import { Filter, requestParams } from "@/utils/queryHelper/queryHelper.types";
import { Client, Partner, Prisma } from "@prisma/client";
import Link from "next/link";
import DropDownFilter from "@/app/components/DropDownFilter";
import PaginationComp from "@/app/components/PaginationComp";

type VistType = {
    name: string,
    id: string
}




export default async function page({ searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | undefined }>
}) {

    const { page = '1', limit = '10', sort = 'asc', category = '', client = '', partner = '' } = await searchParams
    const reqParams: requestParams = {
        page: Number(page),
        limit: Number(limit),
        filters: [],
        orderBy: 'id,ASC',
        fullTextSearch: ''
    }


    const cientReqParams: requestParams = {
        page: 1,
        limit: Number(1000),
        filters: [],
        orderBy: 'id,ASC',
        fullTextSearch: ''
    }
    if (client) {
        reqParams.filters.push({ field: 'invoice.clientId', cond: 'equals', value: client })
    }
    if (partner) {
        reqParams.filters.push({ field: 'partnerId', cond: 'equals', value: partner })
    }
    const clientsData = getClients(cientReqParams)
    const partnersData = getAgents()
    const [clients, partners] = await Promise.all([clientsData, partnersData])
    const response: any = await getSales(reqParams)
    console.log('sales response');
    console.log(response);


    const sales: Prisma.SaleGetPayload<{
        include: {
            invoice: {
                include: {
                    client: true
                }
            },
            admin: true
        }

    }>[] = response.data
    const { total } = response;
    let amountTotal = 0;
    let paidTotal = 0;
    let remainingTotal = 0;

    return (
        <section className="bg-gray-50 dark:bg-gray-900 sm:p-5">
            <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
                {/* <!-- Start coding here --> */}
                <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                    <div className="flex flex-col md:flex-row justify-between items-center p-4 space-y-3 md:space-y-0 md:space-x-4">
                        <DropDownFilter options={clients.data} field="id" placeholder="Client" />
                        <DropDownFilter options={partners} field="id" placeholder="Partner" />
                        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                            <a href="/admin/sales/add" className="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
                                <svg className="h-3.5 w-3.5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                    <path clipRule="evenodd" fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                                </svg>
                                New Sale
                            </a>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-4 py-3">Client</th>
                                    <th scope="col" className="px-4 py-3">Partner</th>
                                    {/* <th scope="col" className="px-4 py-3">Sale/Follow Up</th> */}
                                    <th scope="col" className="px-4 py-3">Total amount</th>
                                    <th scope="col" className="px-4 py-3">Paid amount</th>
                                    <th scope="col" className="px-4 py-3">Remaining amount</th>
                                    <th scope="col" className="px-4 py-3">Invoice</th>
                                    <th scope="col" className="px-4 py-3">Payments</th>


                                </tr>
                            </thead>
                            <tbody>
                                {
                                    sales.map((sale) => {
                                        amountTotal = amountTotal + sale.invoice.total;
                                        paidTotal = paidTotal + sale.invoice.paidAmount;
                                        remainingTotal = remainingTotal + sale.invoice.remainingAmount;
                                        return (
                                            <tr className="border-b dark:border-gray-700" key={sale.id}>
                                                <td className="px-4 py-3"> {sale.invoice.client.name}</td>
                                                <td className="px-4 py-3"> {sale.admin.name}</td>
                                                <td className="px-4 py-3"> {sale.invoice.total}</td>
                                                <td className="px-4 py-3"> {sale.invoice.paidAmount}</td>
                                                <td className="px-4 py-3"> {sale.invoice.remainingAmount}</td>
                                                {
                                                    sale.invoice.invoiceIsuuesd == false ?
                                                        <td className="px-4 py-3"><Link target="_blank" href={`/admin/invoice/generate/${sale.invoice.id}`}>Generate Invoice</Link></td> :
                                                        <td className="px-4 py-3"><Link href={`/admin/invoice/${sale.invoice.id}`}>{sale.invoice.invoiceNumber}</Link></td>
                                                }
                                                <td className="px-4 py-3"><Link href={`/admin/payments/list/${sale.invoice.id}`}>Payments</Link></td>

                                            </tr>

                                        )
                                    })
                                }
                                <tr>
                                    <td className="px-4 py-3 font-semibold">Total</td>
                                    <td className="px-4 py-3" />
                                    <td className="px-4 py-3 font-semibold">{amountTotal}</td>
                                    <td className="px-4 py-3 font-semibold">{paidTotal}</td>
                                    <td className="px-4 py-3 font-semibold">{remainingTotal}</td>
                                    <td className="px-4 py-3" />

                                </tr>
                            </tbody>
                        </table>
                    </div>{
                        sales?.length > 0 ? <PaginationComp total={total} /> : null
                    }
                </div>
            </div>
        </section>
    )

}
