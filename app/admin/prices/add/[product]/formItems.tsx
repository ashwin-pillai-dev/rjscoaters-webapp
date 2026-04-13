'use client'
import { Button, Label, Select } from 'flowbite-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { priceFormType, priceSchema } from './priceSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';

type PropType = {
    productId: string;
    clientTypes: any[];
    priceId?: string;
    addPrices?: (data: priceFormType) => Promise<void>; 
    editPrices?: (data: priceFormType,priceId:string) => Promise<void>; 
    priceDefault?: priceFormType; 
    isEdit:boolean
};

const FormItems: React.FC<PropType> = ({priceId,isEdit,priceDefault,editPrices,addPrices, productId, clientTypes }) => {
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<priceFormType>({
        resolver: zodResolver(priceSchema),
        defaultValues:isEdit?priceDefault: { productId: productId },
    });

    async function onSubmit(data: priceFormType) {
        setLoading(true);
        try {
            if(isEdit){
                await editPrices(data,priceId)
            }
            else{
            await addPrices(data);
            }
        } catch (error) {
            console.error("Error adding price:", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="max-w-md" id="select">
                <Label htmlFor="clientTypeId" value="Select Client Type" />
                <span className="text-red-600">*</span>
                <Select id="clientTypeId" {...register("clientTypeId")} required>
                    {clientTypes.map((clientType) => (
                        <option key={clientType.id} value={clientType.id}>
                            {clientType.name}
                        </option>
                    ))}
                </Select>
                {errors.clientTypeId && (
                    <p className="text-red-600 text-sm">{errors.clientTypeId.message}</p>
                )}
            </div>

            <div>
                <label htmlFor="startingQtyLimit" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Start Quantity Limit <span className="text-red-600">*</span>
                </label>
                <input
                    type="number"
                    id="startingQtyLimit"
                    {...register("startingQtyLimit",{valueAsNumber:true})}
                    className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter quantity limit"
                />
                {errors.startingQtyLimit && (
                    <p className="text-red-600 text-sm">{errors.startingQtyLimit.message}</p>
                )}
            </div>

            <div>
                <label htmlFor="endingQtyLimit" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Ending Quantity Limit <span className="text-red-600">*</span>
                </label>
                <input
                    type="number"
                    id="endingQtyLimit"
                    {...register("endingQtyLimit",{valueAsNumber:true})}
                    className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter quantity limit"
                />
                {errors.endingQtyLimit && (
                    <p className="text-red-600 text-sm">{errors.endingQtyLimit.message}</p>
                )}
            </div>

            <div>
                <label htmlFor="amount" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Amount <span className="text-red-600">*</span>
                </label>
                <input
                    type="number"
                    id="amount"
                    {...register("amount",{valueAsNumber:true})}
                    className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter amount"
                />
                {errors.amount && (
                    <p className="text-red-600 text-sm">{errors.amount.message}</p>
                )}
            </div>

            <Button
                size="xs"
                type="submit"
                disabled={loading}
                className="w-full bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
                {loading ? (
                    <p className="text-white font-medium text-sm">Loading...</p>
                ) : (
                    <p className="text-white font-medium text-sm">{isEdit?'Edit Price':'Add Price to product'}</p>
                )}
            </Button>
        </form>
    );
};

export default FormItems;
