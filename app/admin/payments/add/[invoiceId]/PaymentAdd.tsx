// components/InventoryUpdateFormItems.tsx
'use client';
import { Button, Datepicker, Label, Textarea } from 'flowbite-react';
import { addPayment } from './actions';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { useForm } from 'react-hook-form';
import { paymentFormType, paymentSchema } from './paymentSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { succesToastMessage } from '@/utils/toastMessages';




export default function PaymentAddForm(props: { invoiceId: string }) {
    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors, isSubmitting } } = useForm<paymentFormType>({
            resolver: zodResolver(paymentSchema),
            defaultValues: {
                invoiceId: props.invoiceId
            }
        })

    const router = useRouter()


    async function onsubmit(data: paymentFormType) {
        try {
            console.log('payment data: ', data);
            const res = await addPayment(data);
            console.log('payment res: ', res);
            if (res) {
                succesToastMessage({message:'Payment added successfully'});
                router.push(`/admin/payments/list/${props.invoiceId}`);
            }

        } catch (error) {
            Swal.fire({
                position: "top-end",
                icon: "error",
                alert: true,
                title: `Failed Saving category`,
                showConfirmButton: false,
                timer: 1500,
                heightAuto: false,
                width: "500px",       // Set the dialog width
                padding: "1em",
                customClass: {
                    icon: 'small-icon'  // Add a custom class to the icon
                }
            });
        }
    }

    return (
        <form className="space-y-4 md:space-y-6"
            onSubmit={handleSubmit(onsubmit)}
        >

            {/* date */}
            <div className="max-w-lg">
                <label htmlFor="paymentDate">Select Date <span className="text-red-500"> *</span></label>
                <input
                    {...register('paymentDate',{valueAsDate:true})}
                    type="date"
                    id="paymentDate"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                {errors.paymentDate
                    && <span className="text-red-500">{errors.paymentDate.message}</span>}
            </div>
            <div>
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Amount <span className="text-red-500">*</span>
                </label>
                <input
                    {...register('amount',{valueAsNumber:true})}
                    type="number"
                    id="amount"
                    className={`bg-gray-50 border ${errors.amount ? 'border-red-500' : 'border-gray-300'
                        } text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                    placeholder="Amount"
                />
                {errors.amount && <p className="mt-2 text-sm text-red-600">{errors.amount.message}</p>}
            </div>


            {
                <Button
                    size="xs"
                    type="submit"
                    // onClick={onsubmitCheck}
                    disabled={isSubmitting}
                    isProcessing={isSubmitting}
                    className="w-full bg-primary-600 hover:bg-primary-700  focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg  px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                    <p className='text-white font-medium  text-sm'>
                        Add Payment
                    </p>
                </Button>

            }

        </form>
    )
}


