import { addAgent } from '../actions'
import { ToastContainer } from 'react-toastify';
import { PartnerRole } from '@prisma/client';
import { getPartnerRoles } from '../../partner-roles/services';
import PartnerForm from './PartnerForm';



export default async function page() {

    const patnerRoles: any = await getPartnerRoles({ page: '1', limit: '1000' })


    return (
        <section className="bg-white dark:bg-gray-900">
            <ToastContainer />
            <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                    Add New Execuitve
                </h2>
                <PartnerForm partnerRoles={patnerRoles.data} addPartner={addAgent}/>
            </div>
        </section>
    )
}