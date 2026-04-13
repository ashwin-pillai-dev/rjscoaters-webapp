'use client'
import { Button, Label } from 'flowbite-react';
import { addInventoryType } from '../actions';
import { useForm } from 'react-hook-form';
import { InventoryTypeFormType, inventoryTypeSchema } from './inventoryTypeSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { InventoryType } from '@prisma/client';
import { failToastMessage, succesToastMessage } from '@/utils/toastMessages';

export default function FormItems() {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm<InventoryTypeFormType>({
        resolver: zodResolver(inventoryTypeSchema)
    });

    async function onSubmit(data: InventoryTypeFormType) {
        try {
            const res: InventoryType = await addInventoryType(data);
            if (res) {
                succesToastMessage({ message: 'Inventory type added successfully !!' })

                router.push('/admin/inventory-type/list');
            }
            else {
                failToastMessage({ message: 'Failed adding inventory type' })
            }
        } catch (error) {
            console.error(error);
            failToastMessage({ message: 'Failed adding inventory type!!' })

        }
    }

    return (
        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)} >
            <div>
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Name <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    {...register("name")}
                    id="name"
                    className={`bg-gray-50 border ${errors.name ? 'border-red-500' : 'border-gray-300'} text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                    placeholder="Inventory type name"
                />
                {errors.name && (
                    <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
                )}
            </div>
            <div className="max-w-md" id="textarea">
                <div className="mb-2 block">
                    <Label htmlFor="desc" value="Description" />
                </div>
                <textarea
                    {...register("desc")}
                    id="desc"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Description"
                    rows={4}
                />
                {errors.desc && (
                    <p className="mt-1 text-xs text-red-500">{errors.desc.message}</p>
                )}
            </div>
            <Button
                size="xs"
                type="submit"
                className="w-full bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
                <p className='text-white font-medium text-sm'>Create Inventory type</p>
            </Button>
        </form>
    );
}
