// pages/inventory-update.tsx
import { ToastContainer } from 'react-toastify';
import PaymentAddForm from './PaymentAdd';

export default async function Page({params}:{params:{invoiceId:string}}) {


    return (
        <section className="bg-white dark:bg-gray-900">
            <ToastContainer />
            <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                    Add New Payment
                </h2>
                    <PaymentAddForm invoiceId={params.invoiceId} />
            </div>
        </section>
    );
}
