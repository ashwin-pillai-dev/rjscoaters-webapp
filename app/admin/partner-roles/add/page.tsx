import { ToastContainer } from 'react-toastify';
import { addPartnerRole } from '../actions';
import FormItems from './formItems';

export default function page() {
    return (
        <section className="bg-white dark:bg-gray-900">
            <ToastContainer />
            <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                    Add New Partner Role
                </h2>
                <form className="space-y-4 md:space-y-6" action={addPartnerRole}>
                    <FormItems/>
                </form>
            </div >
        </section >
    )
}