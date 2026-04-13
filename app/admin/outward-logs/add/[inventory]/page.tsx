// pages/inventory-update.tsx
import { ToastContainer } from 'react-toastify';
import OutwardUpdateForm from './OutwardUpdateForm';

export default async function Page({params}:{params:{inventory:string}}) {

    return (
        <section className="bg-white dark:bg-gray-900">
            <ToastContainer />
            <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                    Add Outward Inventory Update
                </h2>
                    <OutwardUpdateForm inventoryId={params.inventory} />
            </div>
        </section>
    );
}
