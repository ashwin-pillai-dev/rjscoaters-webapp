import { requestParams } from "@/utils/queryHelper/queryHelper.types";
import SeachBox from "@/app/components/SeachBox";
import PaginationComp from "@/app/components/PaginationComp";
// Ensure you create a getContacts service similar to your getClients service
import { getContacts } from "./services"; 

export default async function page({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | undefined }>
}) {
    const { page = '1', limit = '10', sort = 'desc', name = '' } = await searchParams;
    
    const reqParams: requestParams = {
        page: Number(page),
        limit: Number(limit),
        filters: [],
        orderBy: 'createdAt,DESC', // Usually best to see newest contacts first
        fullTextSearch: ''
    };

    // Filter by name if the user searches
    if (name) {
        reqParams.filters.push({ field: 'name', cond: 'contains', value: name });
    }

    // Fetch contact submissions
    const contacts: any = await getContacts(reqParams);

    return (
        <section className="bg-gray-50 dark:bg-gray-900 sm:p-5">
            <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
                <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                    <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                        
                        {/* Search Box for Contacts */}
                        <div className="w-full md:w-1/2">
                            <SeachBox name="name" placeholder="Search by sender name..." />
                        </div>
                        
                        <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                            {/* Removed the 'Add' button since contacts are typically submitted by users on the frontend, not created by admins */}
                        </div>
                    </div>
                    
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-4 py-3">Date</th>
                                    <th scope="col" className="px-4 py-3">Name</th>
                                    <th scope="col" className="px-4 py-3">Email</th>
                                    <th scope="col" className="px-4 py-3">Phone</th>
                                    <th scope="col" className="px-4 py-3">Subject</th>
                                    <th scope="col" className="px-4 py-3">Message</th>
                                    {/* <th scope="col" className="px-4 py-3">Status</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    contacts?.data?.map((contact: any) => {
                                        return (
                                            <tr className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={contact.id}>
                                                <td className="px-4 py-3 whitespace-nowrap">
                                                    {new Date(contact.createdAt).toLocaleDateString()}
                                                </td>
                                                <th scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    {contact.name}
                                                </th>
                                                <td className="px-4 py-3">{contact.email}</td>
                                                <td className="px-4 py-3">{contact.phone || 'N/A'}</td>
                                                <td className="px-4 py-3 font-semibold text-gray-800 dark:text-gray-300">{contact.subject}</td>
                                                <td className="px-4 py-3 max-w-xs truncate" title={contact.message}>
                                                    {contact.message}
                                                </td>
                                                {/* <td className="px-4 py-3">
                                                    <span className={`px-2 py-1 rounded text-xs font-medium ${contact.isRead ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                                        {contact.isRead ? 'Read' : 'Unread'}
                                                    </span>
                                                </td> */}
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                        
                        {/* Pagination Component */}
                        <div className="p-4">
                            <PaginationComp total={contacts?.total || 0} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}