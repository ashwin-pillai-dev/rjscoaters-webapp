import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { useFieldArray, useForm } from 'react-hook-form';
import { saleSchema } from './SalesSchema';
import { z } from 'zod';
import SearchAbleSelect from '../../components/SearchAbleSelect/SearchAbleSelect';
import { Product } from '@prisma/client';

export default function SalesItemForm({ products }: { products: Product[] }) {

    // Example Validation
    const sampleData = {
        date: '2024-10-27',
        clientId: '5e28b905-0d9b-4e47-9558-d0c3443d9f64',
        partnerId: '5e28b905-0d9b-4e47-9558-d0c3443d9f64',
        visitType: '1',
        remarks: 'Details of the sale',
        addedItems: [
            {
                productId: '5e28b905-0d9b-4e47-9558-d0c3443d9f64',
                qty: 2,
                price: 100,
                product: {
                    id: '5e28b905-0d9b-4e47-9558-d0c3443d9f64',
                    name: 'Product A',
                    price: 100,
                    gst: 18,
                },
            },
        ],
    };

    // Validate sample data



    type salesFormType = z.infer<typeof saleSchema>;

    const {
        register,
        handleSubmit,
        setValue,
        control,
        formState: { errors },
    } = useForm<salesFormType>({
        resolver: zodResolver(saleSchema),
    });

    const {
        fields,
        append,
        prepend,
        remove,
        swap,
        move,
        insert,
        replace
    } = useFieldArray({
        control,
        name: "addedItems"
    });

    const onSubmit = (data: any) => console.log("data", data);


    return (
        <div>
            items
            {
                fields.map((field, index) => {
                    return (
                        <div key={field.id}>
                            <div className='max-w-md' >

                                <label
                                    htmlFor={`addedItems.${index}.product`}
                                >Select Product</label>
                                <SearchAbleSelect
                                    name='product'
                                    id={`addedItems.${index}.product`}
                                    options={products}
                                    getLabel={(option) => `${option.name}`}
                                    getValue={(option) => `${option['id']}`}
                                    value={field.product} // Bind the value here based on the field array entry
                                />

                            </div>

                            <div className='max-w-md' >
                                <label htmlFor="qty">Enter Quantity</label>
                                <input
                                    type="text"
                                    name="qty"
                                    id="qty"
                                    {...register(`addedItems.${index}.qty`, { required: true, pattern: /^[0-9]+$/ })} // Dynamically register
                                    className="bg-gray-50  max-w-md border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

                                    placeholder="Quantity"
                                />

                            </div>

                            <button
                                type="button"
                                className=" w-1/4 md:w-full bg-primary-600 hover:bg-primary-700 self-end  focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg h-10  px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                            >
                                <p className='text-white font-medium  text-sm'>
                                    Add Item
                                </p>
                            </button>

                            {/* {errors.addedItems?.[index]?.product && <span>{errors.addedItems[index].product.message}</span>} */}
                            {errors.addedItems?.[index]?.qty && <span>{errors.addedItems[index].qty.message}</span>}



                        </div>


                    )
                }
                )
            }        <button
                type="button"
                onClick={
                    () => {
                        // append({ price: 0, qty: 0 });
                        try {
                            saleSchema.parse(sampleData);
                            console.log("Validation passed");
                        } catch (e) {
                            if (e instanceof z.ZodError) {
                                console.log(e.errors);
                            }
                        }
                    }}
            >
                append
            </button>



        </div>


    )
}
