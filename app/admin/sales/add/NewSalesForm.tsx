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
    // Example Validation
    const sampleData = {
        addedItems: [
            {
                productId: null,
                qty: null,
                price: null,
            },
        ],
    };


    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        control,
        formState: { errors },
    } = useForm<salesFormType>({
        resolver: zodResolver(saleSchema),
        defaultValues: sampleData
    });

    const { fields, append, remove } = useFieldArray({
        control, // Pass control from useForm
        name: 'addedItems', // Name of the array field
    });

    const { clients, products, partners } = props;
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter()



    async function getFilteredPrices(index: number) {
        setLoading(true)
        try {
            const saleFormData = getValues()
            if (saleFormData.addedItems[index].productId && saleFormData.addedItems[index].qty && saleFormData.addedItems[index].qty > 0) {

                const productId = saleFormData.addedItems[index].productId;
                const qty = saleFormData.addedItems[index].qty;
                const selectedClient = clients.find(client => client.id == saleFormData.clientId);
                console.log(`${process.env.NEXT_PUBLIC_API_URL}/filteredPrices?productId=${productId}&clientTypeId=${selectedClient.clientTypeId}&qty=${qty}`);
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/filteredPrices?productId=${productId}&clientTypeId=${selectedClient.clientTypeId}&qty=${qty}`, { cache: 'no-cache' });
                console.log('prices fetched', response);

                if (response.ok) {
                    const data = await response.json();
                    console.log('response filtered prices: ', data);
                    setValue(`addedItems.${index}.price`, data.amount)
                    setValue(`addedItems.${index}.total`, Number((data.amount * qty).toFixed()))

                    //Calculating and resetting remaining amount
                    const remainingAmount = calcRemainingAmount();
                    setValue('remainingAmount', Number(remainingAmount));

                    setLoading(false)
                } else {
                    setLoading(false)

                    toast.error("Error adding items!", {
                        position: toast.POSITION.TOP_CENTER
                    });
                    console.error('Error fetching data');
                }
            }
        } catch (error) {
            setLoading(false)
            console.log('filteres prices', error);

            toast.error("Error adding items!", {
                position: toast.POSITION.TOP_CENTER
            });
        }
        finally {
            setLoading(false)

        }
    }
    // Handle product selection and populate price and product ID
    async function handleProductChange(index: number, selectedOption: productFormType) {
        console.log('index', index);
        console.log('selectedOption', selectedOption);
        if (selectedOption) {
            setValue(`addedItems.${index}.product`, selectedOption, { shouldValidate: true });
            setValue(`addedItems.${index}.productId`, selectedOption.id, { shouldValidate: true });
            await getFilteredPrices(index);
        }
        else {
            setValue(`addedItems.${index}.product`, null, { shouldValidate: true });
            setValue(`addedItems.${index}.productId`, null, { shouldValidate: true });
        }

    }

    function handleClientChange(selectedOption: any) {
        console.log('selected client', selectedOption);

        selectedOption ? setValue('clientId', selectedOption.id, { shouldValidate: true }) : setValue('clientId', null, { shouldValidate: true })
        remove(),
            append({ price: null, qty: null, productId: null, total: null });
    }

    async function onSubmit(data: salesFormType) {
        console.log('sales Input:: ', data);

        try {
            setLoading(true)
            const response = await addSales(data)
            if (response != undefined) {
                router.push('/admin/sales/list')

            }
        } catch (error: any) {
            toast.error(error.message, {
                position: toast.POSITION.TOP_CENTER
            });
        }
        finally {
            setLoading(false);
        }
    }

    function calcTotal(index: number) {
        const item = getValues().addedItems[index];
        console.log('item', item);
    
        if (item.product && item.qty && item.price) {
            // Calculate the GST amount and round it
            const gstAmount =Number(((item.product.gst / 100) * (item.price * item.qty)).toFixed(2)) ;

    
            // Calculate the item total and round it
            const itemTotal = (item.price + (item.product.gst / 100) * item.price) * item.qty;
            const roundedItemTotal =Number(itemTotal.toFixed(2)) ;
    
            return `${item.price} x ${item.qty} + ${gstAmount} (${item.product.gst}% GST) = ${roundedItemTotal}`;
        } else {
            return '';
        }
    }
    

    function calcRemainingAmount(): number {
        const amount = getValues().paidAmount
        const items = getValues().addedItems;
        let totalAmount = items.reduce(
            (sum, item) =>
                sum + (item?.price + (item?.product?.gst / 100) * item?.price) * item?.qty,
            0
        );
        totalAmount =
            totalAmount % 1 > 0.5 ? Math.ceil(totalAmount) : Math.floor(totalAmount);
        const remainingAmount = totalAmount - Number(amount);
        return remainingAmount

    }


    function onPaidAmountChange(e: React.ChangeEvent<HTMLInputElement>) {
        const amountPaid = e.target.value;
        if (amountPaid) {
            const amount = Number(amountPaid)
            setValue('paidAmount', amount)
            const items = getValues().addedItems;
            let totalAmount = items.reduce(
                (sum, item) =>
                    sum + (item?.price + (item?.product?.gst / 100) * item?.price) * item?.qty,
                0
            );
            totalAmount =
                totalAmount % 1 > 0.5 ? Math.ceil(totalAmount) : Math.floor(totalAmount); const remainingAmount = totalAmount - Number(amount);
            setValue('remainingAmount', Number(remainingAmount));
            // return remainingAmount.toString()
        }
        else {
            setValue('remainingAmount', 0);
            // return ''
        }
    }

    return (
        <section className="bg-white dark:bg-gray-900">
            <ToastContainer />
            {loading && (
                <div className="fixed top-0 left-0 w-full h-full bg-gray-300 opacity-75 flex items-center justify-center z-50">
                    <Spinner
                        aria-label="Info spinner example"
                        color="info"
                    />
                </div>
            )}

            <div className="py-8 px-4 mx-auto max-w-5xl lg:py-16">
                <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                    New Sale
                </h2>
                <form
                    className="space-y-4 md:space-y-6"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    {/* date */}
                    <div className="max-w-lg">
                        <label htmlFor="date">Select Date <span className="text-red-500"> *</span></label>
                        <input
                            {...register('date')}
                            type="date"
                            id="date"
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                        {errors.date
                            && <span className="text-red-500">{errors.date.message}</span>}
                    </div>
                    {/* client */}
                    <div className="max-w-lg">
                        <label htmlFor="clientId">Select Client <span className="text-red-500"> *</span></label>
                        <SearchAbleSelect
                            id='client'
                            name='client'
                            options={clients}
                            getLabel={(option: any) => `${option.name}`}
                            getValue={(option: any) => `${option.id}`}
                            onChange={handleClientChange}
                        >
                        </SearchAbleSelect>
                        {errors.clientId && <span className="text-red-500">{errors.clientId.message}</span>}
                    </div>
                    {/* partner */}
                    <div className="max-w-lg">
                        <label htmlFor="partnerId">Select Partner <span className="text-red-500"> *</span></label>
                        <SearchAbleSelect
                            id='partner'
                            name='partner'
                            options={partners}
                            getLabel={(option: any) => `${option.name}`}
                            getValue={(option: any) => `${option.id}`}
                            onChange={(selectedOption: any) => {
                                selectedOption ?
                                    setValue('partnerId', selectedOption.id, { shouldValidate: true })
                                    : setValue('partnerId', null, { shouldValidate: true })
                            }}  >

                        </SearchAbleSelect>
                        {errors.partnerId && <span className="text-red-500">{errors.partnerId.message}</span>}
                    </div>

                    {/* add products and quantity */}
                    <div>

                        <button
                            type="button"
                            onClick={() => {
                                append({ price: null, qty: null, productId: null, total: null });
                            }}
                            className="w-1/4 md:w-1/4 bg-primary-600 hover:bg-primary-700 self-end  focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg h-10  px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                        >
                            <p className='text-white font-medium  text-sm'>
                                Add Item
                            </p>
                        </button>
                        {<span className="mt-4">      {/* Display error when no items are added */}
                            {errors.addedItems && !Array.isArray(errors.addedItems) && (
                                <span className='text-red-500'>{errors.addedItems?.root?.message}</span> // Displays "Minimum one product required to add a sale"
                            )}</span>
                        }
                        {
                            fields.map((field, index) => {
                                return (
                                    <div key={field.id} className="border-2 md:border-none border-gray-300 p-2 md:p-0 mt-4 grid grid-cols-1 gap-y-2 md:gap-x-2 md:grid-cols-3 justify-betweenmax-w-xl">
                                        <div className='max-w-md' >

                                            <label
                                                htmlFor={`addedItems.${index}.productId`}
                                            >Select Product <span className="text-red-500"> *</span></label>
                                            <SearchAbleSelect
                                                name='product'
                                                id={`addedItems.${index}.product`}
                                                options={products}
                                                getLabel={(option: Product) => `${option.name}`}
                                                getValue={(option: Product) => `${option}`}
                                                onChange={(selectedOption: productFormType) => { handleProductChange(index, selectedOption) }}
                                            />
                                            {errors.addedItems?.[index]?.productId && (
                                                <span className="text-red-500">{errors.addedItems[index].productId.message}</span>
                                            )}
                                        </div>
                                        <div className='max-w-md flex flex-row justify-between' >
                                            <div className='pr-4'>
                                                <label htmlFor="qty">Quantity <span className="text-red-500"> *</span></label>
                                                <input
                                                    name="qty"
                                                    id="qty"
                                                    type='number'
                                                    {...register(`addedItems.${index}.qty`, { valueAsNumber: true })} // Dynamically register
                                                    className="bg-gray-50 p-2  max-w-md border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none dark:focus:border-blue-500"
                                                    placeholder="Quantity"
                                                    onBlur={() => { getFilteredPrices(index) }}
                                                />
                                                <span className="text-red-500">{errors.addedItems?.[index]?.qty && errors.addedItems[index].qty.message}</span>
                                            </div>
                                            <div className='max-w-md' >

                                                <label htmlFor="qty">Price</label>
                                                <input
                                                    type="number"
                                                    name="price"
                                                    id="price"
                                                    {...register(`addedItems.${index}.price`, { valueAsNumber: true })} // Dynamically register
                                                    className="bg-gray-300   max-w-md border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    placeholder="Price"
                                                    disabled={true}
                                                />
                                            </div>
                                        </div>


                                        <div className='max-w-md' >
                                            <label htmlFor="total">Total</label>
                                            <div >
                                                <div className="flex flex-row justify-between ">
                                                    <input
                                                        name="total"
                                                        id="total"
                                                        className="bg-gray-300 p-2   max-w-md border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                        placeholder="Total"
                                                        value={calcTotal(index)}
                                                        disabled={true}
                                                    />
                                                    <MdDelete size={30} className='max-w-md self-center text-red-800 cursor-pointer' onClick={() => {
                                                        // setValue('paidAmount', 0),
                                                        remove(index);
                                                        setValue('remainingAmount', calcRemainingAmount())
                                                    }} />
                                                </div>
                                            </div>
                                        </div>



                                    </div>
                                )
                            }
                            )
                        }
                    </div>
                    <div className="max-w-lg">
                        <label htmlFor="paidAmount">Amount Paid<span className="text-red-500"> *</span></label>
                        <input
                            name="paidAmount"
                            type='number'
                            id="paidAmount"
                            {...register('paidAmount',
                                {
                                    valueAsNumber: true,
                                    onChange: onPaidAmountChange
                                }
                            )} // Register field for validation
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                        {errors.paidAmount && <span className="text-red-500">{errors.paidAmount.message}</span>}

                    </div>

                    <div className="max-w-lg">
                        <label htmlFor="remainingAmount">Remaining Amount<span className="text-red-500"> *</span></label>
                        <input
                            name="remainingAmount"
                            type='number'
                            disabled={true}
                            {...register('remainingAmount', { valueAsNumber: true })}
                            id="remainingAmount"
                            className="bg-gray-300 p-2   max-w-md border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                        {errors.remainingAmount && <span className="text-red-500">{errors.remainingAmount.message}</span>}

                    </div>

                    {/* remarks */}
                    <div className="max-w-lg">
                        <label htmlFor="remarks">Remarks <span className="text-red-500"> *</span></label>
                        <textarea
                            name="remarks"
                            rows={4}
                            id="remarks"
                            {...register('remarks')} // Register field for validation
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                        {errors.remarks && <span className="text-red-500">{errors.remarks.message}</span>}

                    </div>

                    <button
                        type="submit"
                        className="w-full bg-primary-600 hover:bg-primary-700  focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg  px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    >
                        <p className='text-white font-medium  text-sm '>
                            Add Sale
                        </p>
                    </button>
                </form>
            </div >
        </section >
    );

}

export default SalesForm;