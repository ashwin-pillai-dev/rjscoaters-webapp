'use client';

import { Button, Textarea } from 'flowbite-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { addOutwardUpdate } from './actions';
import { failToastMessage, succesToastMessage } from '@/utils/toastMessages';
import { InventoryUpdateFormType, InventoryUpdateSchema } from '@/app/admin/inventory-logs/add/[inventory]/inventoryUpdateSchema';

export default function OutwardUpdateForm(props: { inventoryId: string }) {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<InventoryUpdateFormType>({
        resolver: zodResolver(InventoryUpdateSchema),
        defaultValues: {
            inward: false,
            inventoryId: props.inventoryId,
            supplier: 'N/A',
            invoiceNumber:'N/A'
        }
    });

    const router = useRouter()

    async function onSubmit(data: InventoryUpdateFormType) {
        try {
            const res = await addOutwardUpdate(data);
            if (res) {
                router.push(`/admin/inventory-logs/list/${props.inventoryId}`);
                succesToastMessage({ message: 'Inventory log added successfully' })
            }
            else {
                failToastMessage({ message: 'Failed to add inventory log' })
            }

        } catch (error) {
            failToastMessage({ message: 'Failed to add inventory log' })
        }
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 md:space-y-6"
        >
            {/* Invoice Number */}
            <div className="max-w-lg">
                <label htmlFor="date">Select Date <span className="text-red-500"> *</span></label>
                <input
                    {...register('updateDate')}
                    type="date"
                    id="date"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                {errors.updateDate
                    && <span className="text-red-500">{errors.updateDate.message}</span>}
            </div>

            {/* Quantity */}
            <div>
                <label htmlFor="qty" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Quantity <span className="text-red-500">*</span>
                </label>
                <input
                    {...register('qty', { valueAsNumber: true })}
                    type="number"
                    id="qty"
                    className={`bg-gray-50 border ${errors.qty ? 'border-red-500' : 'border-gray-300'
                        } text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                    placeholder="Quantity"
                />
                {errors.qty && <p className="mt-2 text-sm text-red-600">{errors.qty.message}</p>}
            </div>

            {/* Notes */}
            <div>
                <label htmlFor="notes" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Notes
                </label>
                <Textarea
                    {...register('notes')}
                    id="notes"
                    rows={4}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Notes"
                />
            </div>



            {/* Submit Button */}
            <Button
                size="xs"
                type="submit"
                className="w-full bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                disabled={isSubmitting}
                isProcessing={isSubmitting}
            >
                <p className="text-white font-medium text-sm">Add Inventory Log</p>
            </Button>
        </form>
    );
}
