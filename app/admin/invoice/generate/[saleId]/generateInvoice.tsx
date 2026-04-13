'use client';
import { Label, Button, Spinner } from 'flowbite-react';
import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { Prisma } from '@prisma/client';
import { updateInvoiceAndInventory } from '@/app/admin/sales/actions';

type InvoiceProp = {
    invoice: Prisma.InvoiceGetPayload<{
        include: {
            client: true;
            sale: true;
        };
    }>;
    invoiceItems: Prisma.InvoiceItemGetPayload<{
        include: {
            product: true;
        };
    }>[];
};

const InvoiceUpdateForm: React.FC<InvoiceProp> = ({ invoice, invoiceItems }) => {
    const { client } = invoice;
    const [updatedItems, setUpdatedItems] = useState(invoiceItems.map(item => ({
        ...item,
        updatedQty: item.quantity // Initialize updatedQty with the current quantity
    })));
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    function handleQtyChange(e: React.ChangeEvent<HTMLInputElement>, itemId: string) {
        const updatedList = updatedItems.map(item =>
            item.id === itemId ? { ...item, updatedQty: Number(e.target.value),isUpdated:true } : item
        );
        setUpdatedItems(updatedList);
    }

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        try {
            // setLoading(true);    
            // const itemsToUpdate = updatedItems.filter(item => item.quantity !== item.updatedQty);

            console.log('items to update :',updatedItems);

            await updateInvoiceAndInventory(invoice,updatedItems);
            

            // Perform the update invoice operation with updatedItems
            setLoading(false);
            router.push('/admin/sales/list');
        } catch (error: any) {
            setLoading(false);
            toast.error(error.message, {
                position: toast.POSITION.TOP_CENTER,
            });
        }
    }

    return (
        <section className="bg-white dark:bg-gray-900">
            <ToastContainer />
            {loading && (
                <div className="fixed top-0 left-0 w-full h-full bg-gray-300 opacity-75 flex items-center justify-center z-50">
                    <Spinner aria-label="Info spinner example" color="info" />
                </div>
            )}

            <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                    Generate Invoice
                </h2>

                <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Client Details:</h3>
                    <p>Name: {client.name}</p>
                    <p>Email: {client.email}</p>
                    <p>Address: {client.address}</p>
                    <p>Contact Number: {client.contactNumber}</p>
                </div>

                <form className="space-y-4 md:space-y-6" onSubmit={onSubmit}>
                    <div className="space-y-4">
                        {updatedItems.map((item, index) => (
                            <div key={index} className="flex justify-between items-center py-2">
                                <div className="flex-1">
                                    <p className="text-lg font-semibold">{item.product?.name}</p>
                                    <Label htmlFor={`qty-${item.id}`} value="Enter Quantity" />
                                    <input
                                        type="number"
                                        name={`qty-${item.id}`}
                                        id={`qty-${item.id}`}
                                        value={item.updatedQty}
                                        onChange={(e) => handleQtyChange(e, item.id)}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Quantity"
                                    />
                                </div>
                                <div className="flex-1 text-right">
                                    {/* <p className="text-lg font-semibold">{`Price: ₹${item.amount} + ${item.product.gst}% G.S.T X ${item.quantity} = ₹${(item.amount + (item.product.gst / 100) * item.amount) * item.quantity}`}</p> */}
                                    <p className="text-lg font-semibold">{`Price: ₹${item.amount} + ${item.product.gst}% G.S.T X ${item.quantity} = ₹${item.total}`}</p>
                                    <p className="text-sm text-gray-500">New Quantity: {item.updatedQty}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <Button
                        size="xs"
                        type="submit"
                        className="w-full bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    >
                        <p className="text-white font-medium text-sm">Generate Invoice</p>
                    </Button>
                </form>
            </div>
        </section>
    );
};

export default InvoiceUpdateForm;
