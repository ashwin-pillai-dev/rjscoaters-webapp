'use client';
import { Button, Label, Select } from 'flowbite-react';
import { Product, InventoryType, Inventory } from '@prisma/client';
import { addInventory } from '../actions';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { InventoryFormType, inventorySchema } from './inventorySchema';
import { failToastMessage, succesToastMessage } from '@/utils/toastMessages';
import { useRouter } from 'next/navigation';

type PropType = {
    products: Product[];
    inventoryTypes: InventoryType[];
};

export default function FormItems(props: PropType) {
    const { products, inventoryTypes } = props;
    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm<InventoryFormType>({
        resolver: zodResolver(inventorySchema)
    });

    async function onSubmit(params: InventoryFormType) {
        try {
            const res: Inventory = await addInventory(params);
            if (res) {
                succesToastMessage({ message: 'Inventory added successfully !!' });
                router.push('/admin/inventory/list');
            } else {
                failToastMessage({ message: 'Failed adding inventory' });
            }
        } catch (error) {
            console.error(error);
            failToastMessage({ message: 'Failed adding inventory' });
        }
    }

    return (
        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Name <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    id="name"
                    {...register('name')}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Name"
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
            </div>

            <div className="max-w-md" id="select">
                <Label htmlFor="productId" value="Select Product" />
                <Select id="productId" {...register('productId')}>
                    <option value="" disabled hidden>Select a product</option>
                    {products.map(product => (
                        <option key={product.id} value={product.id}>
                            {product.name}
                        </option>
                    ))}
                </Select>
                {errors.productId && <p className="text-red-500 text-xs mt-1">{errors.productId.message}</p>}
            </div>

            <div className="max-w-md" id="select">
                <Label htmlFor="inventoryTypeId" value="Select the type of inventory" />
                <Select id="inventoryTypeId" {...register('inventoryTypeId')}>
                    <option value="" disabled hidden>Select an inventory type</option>
                    {inventoryTypes.map(inventoryType => (
                        <option key={inventoryType.id} value={inventoryType.id}>
                            {inventoryType.name}
                        </option>
                    ))}
                </Select>
                {errors.inventoryTypeId && <p className="text-red-500 text-xs mt-1">{errors.inventoryTypeId.message}</p>}
            </div>

            <div>
                <label htmlFor="qty" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Quantity <span className="text-red-500">*</span>
                </label>
                <input
                    type="number"
                    id="qty"
                    {...register('qty', { valueAsNumber: true })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Quantity"
                />
                {errors.qty && <p className="text-red-500 text-xs mt-1">{errors.qty.message}</p>}
            </div>

            <Button
                size="xs"
                type="submit"
                className="w-full bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
                <p className="text-white font-medium text-sm">Create Inventory</p>
            </Button>
        </form>
    );
}
