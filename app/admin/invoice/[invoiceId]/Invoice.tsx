// components/Invoice.tsx
'use client'
import React from 'react';
import Image from 'next/image';

interface InvoiceProps {
    invoice: {
        invoiceNumber: string;
        quantity: number;
        subTotal: number;
        total: number;
        invoiceDate: string;
        invoiceItems: Array<{
            id: string;
            quantity: number;
            amount: number;
            total: number;
            product: {
                name: string;
                gst: number;
            };
        }>;
        client: {
            name: string;
            address: string;
        };
    };
}

const Invoice: React.FC<InvoiceProps> = ({ invoice }) => {
    const handlePrint = () => {
        window.print();
    };
    const { invoiceNumber, subTotal, total, invoiceDate, invoiceItems, client } = invoice;
    console.log(invoiceItems);


    return (
        <div>
            <div className="flex justify-end mb-4 no-print">
                <button
                    onClick={handlePrint}
                    className=" mt-4 mx-4 px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
                >
                    Print Invoice
                </button>
            </div>
            <div className="w-full mx-auto px-4 py-2 bg-white printable">
                {/* Print Button */}


                {/* Header Section */}
                <div className="flex justify-between items-start mb-6">
                    <Image height={120} width={120} src="/rjs-logo.png" alt="Ayurarogyam" />
                    <div className="text-left max-w-[50%] flex flex-col">
                        <h1 className="text-2xl font-semibold mb-2">Systematic Solutions</h1>
                        <p className="text-gray-700 break-words">
                            Unit no: 33, 2nd Floor, GNP Galaxy Industrial Estate,
                        </p>
                        <p className="text-gray-700 break-words">Opp. Ordnance Factory,Amebrnath (w) - 421501. </p>

                        <p className="text-gray-700 break-words">GSTIN: 27AQVPP5015F1ZJ</p>
                    </div>
                </div>

                {/* Invoice Title and Date */}
                <div className="border-b border-gray-300 pb-4 mb-3">
                    <h2 className="text-2xl font-semibold">Invoice No. #{invoiceNumber}</h2>
                    <p className="text-gray-600 mt-2">Issued Date: {new Date(invoiceDate).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                    })}</p>
                </div>

                {/* Recipient Details */}
                <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-2">Recipient Details</h3>
                    <p className="text-gray-700">
                        Recipient Name: {client.name}<br />
                        Address: {client.address}<br />
                        {/* GSTIN (if applicable): Recipient GSTIN */}
                    </p>
                </div>

                {/* Invoice Table */}
                <div className="border rounded-lg overflow-hidden mb-6">
                    <table className="w-full bg-gray-50">
                        <thead className="bg-gray-200 text-gray-700">
                            <tr>
                                <th className="py-2 px-2 text-center">Sr. No.</th>
                                <th className="py-2 px-2 text-center">Description</th>
                                <th className="py-2 px-2 text-center">Unit Price (₹)</th>
                                <th className="py-2 px-2 text-center">Qty</th>
                                <th className="py-2 px-2 text-center">Sub-Total</th>

                                <th className="py-2 px-2 text-center">GST (%)</th>
                                <th className="py-2 px-4 text-center">SGST (₹)</th>
                                <th className="py-2 px-2 text-center">CGST (₹)</th>
                                <th className="py-2 px-2 text-center">Total (₹)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {invoiceItems.map((item, index) => (
                                <tr key={item.id} className="border-b border-gray-300">
                                    <td className="py-2 px-2 text-center text-sm">{index + 1}</td>
                                    <td className="py-2 px-2 text-center text-sm">{item.product.name}</td>
                                    <td className="py-2 px-2 text-center text-sm">{item.amount.toFixed(2)}</td>
                                    <td className="py-2 px-2 text-center text-sm">{item.quantity}</td>
                                    <td className="py-2 px-2 text-center text-sm">{(item.amount * item.quantity).toFixed() }</td>
                                    <td className="py-2 px-2 text-center text-sm">{item.product.gst}%</td>
                                    <td className="py-2 px-2 text-center text-sm">
                                        {(Number((((item.amount / 100) * item.product.gst) / 2)) * item.quantity).toFixed(2)}
                                    </td>
                                    <td className="py-2 px-2 text-center text-sm">
                                        {(Number((((item.amount / 100) * item.product.gst) / 2)) * item.quantity).toFixed(2)}
                                    </td>
                                    <td className="py-2 px-2 text-center text-sm">
                                        {item.total.toFixed(2)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Summary Section */}
                <div className="flex justify-end mt-6">
                    <div className="grid grid-cols-3 gap-2 text-gray-700">
                        <div className="font-semibold">Subtotal</div>
                        <div className="font-semibold">:</div>
                        <div className="text-right">{`₹${subTotal.toFixed(2)}`}</div>
                        <div className="font-semibold">GST</div>
                        <div className="font-semibold">:</div>
                        <div className="text-right"> {`₹${(total - subTotal).toFixed(2)}`}</div>
                        <div className="font-semibold">Total</div>
                        <div className="font-semibold">:</div>
                        <div className="text-right">{`₹${total.toFixed(2)}`}</div>
                    </div>
                </div>

                {/* Terms and Conditions */}
                <div className="mt-6">
                    <h3 className="text-xl font-semibold mb-2">Terms and Conditions</h3>
                    <p className="text-gray-700">
                        - Goods once sold will not be taken back if returned after two (2) days from the date of delivery.
                        <br />
                        - Please inspect the goods upon receipt. Any issues or discrepancies must be reported immediately. Claims after delivery will not be entertained.
                        <br />
                        - Payment must be made within seven (7) days of the invoice date. Any delay beyond this period will incur interest at the rate of 3% per month on the outstanding balance.
                        <br />
                        - All disputes will be subject to Kalyan jurisdiction.

                        <br /><br />

                        Please make payment to the following bank account:
                        <br />
                        Bank Name:State Bank of India<br />
                        Bank Branch: Ambernath West<br />
                        Account Number: 41675439353<br />
                        IFSC Code: SBIN0051555
                    </p>
                </div>

                {/* Footer Section */}
                <div className="mt-8 border-t border-gray-300 pt-4 text-center text-gray-600">
                    <p>For any queries, contact us at: ayurarogyam2023@gmail.com</p>
                </div>
            </div>

        </div>

    );
};

export default Invoice;
