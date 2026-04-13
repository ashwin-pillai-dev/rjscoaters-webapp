import { getPayments, } from "./service";
import Pagination from "../../../components/pagination/Pagination";
import SearchBar from "../../../components/seacrhBar/SearchBar";
import { InventoryUpdate } from "@prisma/client";

export default async function Page({params}:{params:{invoiceId:string}}){
    const invoiceId = params.invoiceId as string;


    const routeUrl = `/admin/inventory-updates/${invoiceId}?search=${''}`;
    const response = await getPayments({ page: 1, limit: 10, filters:[{field:'invoiceId',cond:'equals',value:invoiceId}],fullTextSearch:'',orderBy:'id,DESC' });
    console.log('response: ',response)
    const payments = response.data;
    const { total } = response;

    return (
        <section className="bg-gray-50 dark:bg-gray-900 sm:p-5">
            <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
                <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                    <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                        {/* <SearchBar routeUrl={routeUrl} searchText={''} /> */}
                        <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                            <a href={`/admin/payments/add/${invoiceId}`} className="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
                                <svg className="h-3.5 w-3.5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                    <path clipRule="evenodd" fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                                </svg>
                                Add payment
                            </a>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-4 py-3">Date</th>
                                    <th scope="col" className="px-4 py-3">Amount</th>

                                </tr>
                            </thead>
                            <tbody>
                                {
                                    payments.map((payment) => {
                                        return (
                                            <tr className="border-b dark:border-gray-700" key={payment.id}>
                                                <td className="px-4 py-3">{new Date(payment.paymentDate).toLocaleDateString()}</td>
                                                <td className="px-4 py-3">{payment.amount}</td>

                                            </tr>
                                        );
                                    }
                                )
                                }


                            </tbody>
                        </table>
                    </div>
                    {/* <Pagination limit={limit} page={page} total={total} route={routeUrl} /> */}
                </div>
            </div>
        </section>
    );
}
