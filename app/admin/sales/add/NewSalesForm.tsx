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

    // Initializing form with all background defaults
    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        control,
        formState: { errors },
    } = useForm<salesFormType>({
        resolver: zodResolver(saleSchema),
        defaultValues: {
            addedItems: [
                {
                    productId: null,
                    qty: 1, // Default quantity for services
                    price: null,
                    total: null
                },
            ],
            paidAmount: 0,
            remainingAmount: 0,
            date: new Date().toISOString().split('T')[0], // Default to today
            partnerId: 'admin-hitika-01' // Default assigned partner
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'addedItems',
    });

    /**
     * Helper: Calculate remaining balance
     */
    function calcRemainingAmount(): number {
        const paid = getValues().paidAmount || 0;
        const items = getValues().addedItems;
        
        let totalAmount = items.reduce((sum, item) => {
            if (!item.price || !item.product) return sum;
            const taxMultiplier = 1 + (item.product.gst / 100);
            return sum + (item.price * taxMultiplier * 1); // Qty is always 1
        }, 0);

        // Standard rounding logic
        totalAmount = totalAmount % 1 > 0.5 ? Math.ceil(totalAmount) : Math.floor(totalAmount);
        return totalAmount - Number(paid);
    }

    /**
     * API Fetch: Get specific pricing for a service based on client type
     */
    async function getFilteredPrices(index: number) {
        const saleFormData = getValues();
        const productId = saleFormData.addedItems[index].productId;
        const clientId = saleFormData.clientId;

        if (!productId || !clientId) return;

        setLoading(true);
        try {
            const selectedClient = clients.find(c => c.id === clientId);
            if (!selectedClient) return;

            // Qty is always 1 for service filtered prices
            const url = `${process.env.NEXT_PUBLIC_API_URL}/filteredPrices?productId=${productId}&clientTypeId=${selectedClient.clientTypeId}&qty=1`;
            const response = await fetch(url, { cache: 'no-cache' });

            if (response.ok) {
                const data = await response.json();
                setValue(`addedItems.${index}.price`, data.amount);
                setValue(`addedItems.${index}.total`, Number(data.amount.toFixed()));
                
                // Update the global remaining amount
                setValue('remainingAmount', calcRemainingAmount());
            } else {
                toast.error("Could not fetch pricing for this service.");
            }
        } catch (error) {
            console.error('Price Fetch Error:', error);
            toast.error("Network error while fetching prices.");
        } finally {
            setLoading(false);
        }
    }

    /**
     * Handlers
     */
    async function handleProductChange(index: number, selectedOption: any) {
        if (selectedOption) {
            setValue(`addedItems.${index}.product`, selectedOption, { shouldValidate: true });
            setValue(`addedItems.${index}.productId`, selectedOption.id, { shouldValidate: true });
            setValue(`addedItems.${index}.qty`, 1); 
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
    }

    function onPaidAmountChange(e: React.ChangeEvent<HTMLInputElement>) {
        const val = e.target.value;
        setValue('paidAmount', val ? Number(val) : 0);
        setValue('remainingAmount', calcRemainingAmount());
    }

    /**
     * UI Formatter for the Total string
     */
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
                    {/* <span className="text-sm text-gray-500 font-medium italic">
                        Partner: Hitika Galrani (Default)
                    </span> */}
                </div>

                <form className="grid grid-cols-1 gap-8" onSubmit={handleSubmit(onSubmit)}>
                    
                    {/* Background Defaults */}
                    <input type="hidden" {...register('partnerId')} />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Date Selection */}
                        <div className="flex flex-col">
                            <label className="text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider" htmlFor="date">
                                Booking Date <span className="text-red-500">*</span>
                            </label>
                            <input
                                {...register('date')}
                                type="date"
                                className="bg-gray-50 border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date.message}</p>}
                        </div>

                        {/* Client Selection */}
                        <div className="flex flex-col">
                            <label className="text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider" htmlFor="clientId">
                                Select Client <span className="text-red-500">*</span>
                            </label>
                            <SearchAbleSelect
                                id='client'
                                name='client'
                                options={clients}
                                getLabel={(option: any) => `${option.name}`}
                                getValue={(option: any) => `${option.id}`}
                                onChange={handleClientChange}
                            />
                            {errors.clientId && <p className="text-red-500 text-xs mt-1">{errors.clientId.message}</p>}
                        </div>
                    </div>

                    {/* Services Array Section */}
                    <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">Requested Services</h3>
                            <button
                                type="button"
                                onClick={() => append({ price: null, qty: 1, productId: null, total: null })}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg text-sm transition-all"
                            >
                                + Add Another Service
                            </button>
                        </div>

                        {fields.map((field, index) => (
                            <div key={field.id} className="relative bg-white dark:bg-gray-700 p-5 rounded-xl border border-gray-200 mb-4 shadow-sm transition-all hover:border-blue-300">
                                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                                    
                                    {/* Service Dropdown */}
                                    <div className="md:col-span-7">
                                        <label className="text-[10px] font-bold text-gray-400 uppercase mb-1 block">Service Name</label>
                                        <SearchAbleSelect
                                            id='service'
                                            name='service'
                                            options={products}
                                            getLabel={(option: Product) => `${option.name}`}
                                            getValue={(option: Product) => `${option.id}`}
                                            onChange={(opt: any) => handleProductChange(index, opt)}
                                        />
                                    </div>

                                    {/* Display Costing Breakdown */}
                                    <div className="md:col-span-4">
                                        <label className="text-[10px] font-bold text-gray-400 uppercase mb-1 block">Costing Breakdown</label>
                                        <div className="bg-gray-100 dark:bg-gray-600 p-2.5 rounded-lg text-xs font-mono text-gray-600 dark:text-gray-300 h-10 flex items-center">
                                            {formatServiceCalculation(index)}
                                        </div>
                                    </div>

                                    {/* Delete Button */}
                                    <div className="md:col-span-1 flex justify-end">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                remove(index);
                                                setValue('remainingAmount', calcRemainingAmount());
                                            }}
                                            className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                                        >
                                            <MdDelete size={24} />
                                        </button>
                                    </div>

                                    {/* Hidden Logic Fields */}
                                    <input type="hidden" {...register(`addedItems.${index}.qty`)} />
                                    <input type="hidden" {...register(`addedItems.${index}.price`)} />
                                </div>
                            </div>
                        ))}
                        {errors.addedItems?.root && <p className="text-red-500 text-sm mt-2">{errors.addedItems.root.message}</p>}
                    </div>

                    {/* Financial Summary */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-blue-50 dark:bg-blue-900/20 p-8 rounded-2xl border border-blue-100">
                        <div>
                            <label className="block text-sm font-bold text-blue-900 uppercase mb-2">Advance Payment (₹)</label>
                            <input
                                {...register('paidAmount', { valueAsNumber: true, onChange: onPaidAmountChange })}
                                type="number"
                                step="0.01"
                                className="w-full bg-white border border-blue-200 rounded-xl p-4 text-lg font-bold text-blue-900 focus:ring-blue-500"
                                placeholder="0.00"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-blue-900 uppercase mb-2">Balance Due (₹)</label>
                            <div className="w-full bg-blue-100 border border-blue-200 rounded-xl p-4 text-2xl font-black text-blue-700">
                                ₹{getValues().remainingAmount}
                            </div>
                            <input type="hidden" {...register('remainingAmount')} />
                        </div>
                    </div>

                    {/* Remarks Section */}
                    <div>
                        <label className="block text-sm font-bold text-gray-700 uppercase mb-2" htmlFor="remarks">Service Notes / Remarks</label>
                        <textarea
                            {...register('remarks')}
                            id="remarks"
                            rows={4}
                            className="w-full bg-gray-50 border border-gray-300 rounded-xl p-4 focus:ring-blue-500"
                            placeholder="Add specific instructions for this booking..."
                        />
                        {errors.remarks && <p className="text-red-500 text-xs mt-1">{errors.remarks.message}</p>}
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-700 hover:bg-blue-800 disabled:bg-gray-400 text-white font-black py-5 rounded-2xl text-xl shadow-xl transition-all transform active:scale-95"
                    >
                        {loading ? 'Processing Booking...' : 'Confirm & Generate Booking'}
                    </button>
                </form>
            </div>
        </section>
    );
};

export default SalesForm;