'use client'
import { zodResolver } from '@hookform/resolvers/zod';
import { Client, Partner, Product } from '@prisma/client';
import { Spinner } from 'flowbite-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { MdDelete } from "react-icons/md";
import { toast, ToastContainer } from 'react-toastify';
import { z } from 'zod';
import SearchAbleSelect from '../../components/SearchAbleSelect/SearchAbleSelect';
import { addSales } from '../actions';
import { productSchema, saleSchema } from './SalesSchema';

type PropType = {
    clients: Client[]
    products: Product[]
    partners: Partner[]
}

const SalesForm: React.FC<PropType> = (props) => {
    type salesFormType = z.infer<typeof saleSchema>;
    type productFormType = z.infer<typeof productSchema>;

    const { clients, products } = props;
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        watch, // Added watch to trigger UI updates
        control,
        formState: { errors },
    } = useForm<salesFormType>({
        resolver: zodResolver(saleSchema),
        defaultValues: {
            addedItems: [{ productId: null, qty: 1, price: null, total: null }],
            paidAmount: 0,
            remainingAmount: 0,
            date: new Date().toISOString().split('T')[0],
            partnerId: 'admin-hitika-01'
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'addedItems',
    });

    // 1. Watch the remainingAmount to trigger a re-render when it changes
    const watchedRemainingAmount = watch('remainingAmount');

    /**
     * Helper: Calculate remaining balance
     * We pass currentPaid in directly to avoid stale state from getValues()
     */
    function calcRemainingAmount(currentPaid?: number): number {
        const paid = currentPaid !== undefined ? currentPaid : (getValues().paidAmount || 0);
        const items = getValues().addedItems;

        let totalAmount = items.reduce((sum, item) => {
            if (!item.price || !item.product) return sum;
            const taxMultiplier = 1 + (item.product.gst / 100);
            return sum + (item.price * taxMultiplier * 1);
        }, 0);

        totalAmount = totalAmount % 1 > 0.5 ? Math.ceil(totalAmount) : Math.floor(totalAmount);
        return totalAmount - paid;
    }

    async function getFilteredPrices(index: number) {
        const saleFormData = getValues();
        const productId = saleFormData.addedItems[index].productId;
        const clientId = saleFormData.clientId;

        if (!productId || !clientId) return;

        setLoading(true);
        try {
            const selectedClient = clients.find(c => c.id === clientId);
            if (!selectedClient) return;

            const url = `${process.env.NEXT_PUBLIC_API_URL}/filteredPrices?productId=${productId}&clientTypeId=${selectedClient.clientTypeId}&qty=1`;
            const response = await fetch(url, { cache: 'no-cache' });

            if (response.ok) {
                const data = await response.json();
                setValue(`addedItems.${index}.price`, data.amount);
                setValue(`addedItems.${index}.total`, Number(data.amount.toFixed()));

                // Update remaining amount after price fetch
                setValue('remainingAmount', calcRemainingAmount());
            }
        } catch (error) {
            console.error('Price Fetch Error:', error);
        } finally {
            setLoading(false);
        }
    }

    async function handleProductChange(index: number, selectedOption: any) {
        if (selectedOption) {
            setValue(`addedItems.${index}.product`, selectedOption, { shouldValidate: true });
            setValue(`addedItems.${index}.productId`, selectedOption.id, { shouldValidate: true });
            await getFilteredPrices(index);
        } else {
            setValue(`addedItems.${index}.product`, null);
            setValue(`addedItems.${index}.productId`, null);
        }
    }

    function handleClientChange(selectedOption: any) {
        if (selectedOption) {
            setValue('clientId', selectedOption.id, { shouldValidate: true });
        } else {
            setValue('clientId', null);
        }
        remove();
        append({ price: null, qty: 1, productId: null, total: null });
        setValue('remainingAmount', 0);
    }

    // 2. Updated Handler: Force update the remainingAmount state
    function onPaidAmountChange(e: React.ChangeEvent<HTMLInputElement>) {
        const val = e.target.value === '' ? 0 : Number(e.target.value);
        setValue('paidAmount', val);

        // Explicitly calculate and set the remaining amount to trigger the watch
        const newRemaining = calcRemainingAmount(val);
        setValue('remainingAmount', newRemaining);
    }

    function formatServiceCalculation(index: number) {
        const item = getValues().addedItems[index];
        if (item.product && item.price) {
            const gstAmount = Number(((item.product.gst / 100) * item.price).toFixed(2));
            const grandTotal = Number((item.price + gstAmount).toFixed(2));
            return `Rate: ₹${item.price} + Tax: ₹${gstAmount} (${item.product.gst}%) = ₹${grandTotal}`;
        }
        return '';
    }

    async function onSubmit(data: salesFormType) {
        setLoading(true);
        try {
            const response = await addSales(data);
            if (response) {
                toast.success("Service Booking Confirmed!");
                router.push('/admin/sales/list');
            }
        } catch (error: any) {
            toast.error(error.message || "Failed to add sale");
        } finally {
            setLoading(false);
        }
    }

    return (
        <section className="bg-white dark:bg-gray-900 min-h-screen">
            <ToastContainer />
            {loading && (
                <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center z-50">
                    <Spinner size="xl" color="info" />
                </div>
            )}

            <div className="py-8 px-4 mx-auto max-w-5xl lg:py-16">
                <div className="flex justify-between items-center mb-8 border-b pb-4">
                    <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
                        New Service Booking
                    </h2>
                </div>

                {/* <form className="grid grid-cols-1 gap-8" onSubmit={handleSubmit(onSubmit)}> */}
                <form className="grid grid-cols-1 gap-8" onSubmit={handleSubmit(onSubmit, (err) => console.log("Validation Errors:", err))}>
                <input type="hidden" {...register('partnerId')} />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col">
                        <label className="text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">Booking Date</label>
                        <input {...register('date')} type="date" className="bg-gray-50 border border-gray-300 rounded-lg p-3" />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">Select Client</label>
                        <SearchAbleSelect id='client' name='client' options={clients} getLabel={(o: any) => o.name} getValue={(o: any) => o.id} onChange={handleClientChange} />
                    </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl border border-gray-100">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold">Services</h3>
                        <button type="button" onClick={() => append({ price: null, qty: 1, productId: null, total: null })} className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg text-sm">+ Add Another</button>
                    </div>

                    {fields.map((field, index) => (
                        <div key={field.id} className="bg-white p-5 rounded-xl border border-gray-200 mb-4 shadow-sm">
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                                <div className="md:col-span-7">
                                    <SearchAbleSelect id='product' name='product' options={products} getLabel={(o: any) => o.name} getValue={(o: any) => o.id} onChange={(opt: any) => handleProductChange(index, opt)} />
                                </div>
                                <div className="md:col-span-4">
                                    <div className="bg-gray-100 p-2.5 rounded-lg text-xs font-mono flex items-center h-10">
                                        {formatServiceCalculation(index)}
                                    </div>
                                </div>
                                <div className="md:col-span-1 flex justify-end">
                                    <button type="button" onClick={() => { remove(index); setValue('remainingAmount', calcRemainingAmount()); }} className="text-red-500"><MdDelete size={24} /></button>
                                </div>
                                <input type="hidden" {...register(`addedItems.${index}.qty`)} />
                                <input type="hidden" {...register(`addedItems.${index}.price`)} />
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-blue-50 p-8 rounded-2xl border border-blue-100">
                    <div>
                        <label className="block text-sm font-bold text-blue-900 uppercase mb-2">Advance Payment (₹)</label>
                        <input
                            {...register('paidAmount', { valueAsNumber: true, onChange: onPaidAmountChange })}
                            type="number"
                            step="0.01"
                            className="w-full bg-white border border-blue-200 rounded-xl p-4 text-lg font-bold"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-blue-900 uppercase mb-2">Balance Due (₹)</label>
                        <div className="w-full bg-blue-100 border border-blue-200 rounded-xl p-4 text-2xl font-black text-blue-700">
                            {/* 3. Display the watched value here */}
                            ₹{watchedRemainingAmount}
                        </div>
                        <input type="hidden" {...register('remainingAmount')} />
                    </div>
                </div>

                <textarea {...register('remarks')} rows={4} className="w-full bg-gray-50 border border-gray-300 rounded-xl p-4" placeholder="Service Notes..." />

                <button type="submit" disabled={loading} className="w-full bg-blue-700 text-white font-black py-5 rounded-2xl text-xl">
                    {loading ? 'Processing...' : 'Confirm Booking'}
                </button>
            </form>
        </div>
        </section >
    );
};

export default SalesForm;