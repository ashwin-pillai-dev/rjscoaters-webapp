'use client'
import { Label, Button, Datepicker, Select } from 'flowbite-react';
import { ProductWithPrices, addSales } from '../actions'
import { Client, Product, Partner, Admin } from '@prisma/client'
import SearchAbleSelect from '../../components/SearchAbleSelect/SearchAbleSelect'
import React, { useRef, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { Spinner } from 'flowbite-react';
import { useRouter } from 'next/navigation';

type PropType = {
    clients: Client[]
    products: Product[]
    partners: Partner[]
}
type VistType = {
    label: string,
    value: string
}


const SalesForm: React.FC<PropType> = (props) => {
    const { clients, products, partners } = props;
    const [addedItems, setAddedItems] = useState<ProductWithPrices[]>([]);
    const [qty, setQty] = useState(''); // Use state for qty
    const [product, setProduct] = useState<Product | null>(null); // Use state for product
    const [client, setClient] = useState<Client | null>(null);
    const [partner, setPartner] = useState<Admin | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const visitTypes: VistType[] = [
        { label: 'Sale', value: '0' },
        { label: 'follow-up', value: '1' },
    ]
    const qtyRef = useRef(null);
    const router = useRouter()

    function onProductSelect(prod: any) {
        setProduct(prod); // Update product state
    }

    function onClientSelect(value: any) {
        setClient(value); // Update client state
    }

    function onPartnerSelect(value: any) {
        console.log(value);
        
        setPartner(value); // Update client state
    }

    async function getFilteredPrices() {
        setLoading(true)
        try {
            if (product && qty) {  
                
                

                console.log(`${process.env.NEXT_PUBLIC_API_URL}/filteredPrices?productId=${product?.id}&clientTypeId=${client?.clientTypeId}&qty=${qty}`);
                
                
               const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/filteredPrices?productId=${product?.id}&clientTypeId=${client?.clientTypeId}&qty=${qty}`, { cache: 'no-cache' });
                console.log('prices fetched',response);
                
               if (response.ok) {
                    const data = await response.json();
                    console.log(`response filtered prices: ${data}`);
                    const item = {
                        product,
                        productId: product.id,
                        price: Number(data.amount),
                        total: data.amount * Number(qty),
                        qty: Number(qty),
                    };
                    setAddedItems([...addedItems, item]);
                    console.log('items added to cart: ',addedItems);
                    
                    setQty('');
                    setProduct(null);
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
            console.log('filteres prices',error);
            
            toast.error("Error adding items!", {
                position: toast.POSITION.TOP_CENTER
            });
        }
    }

    async function onSubmit(params: FormData) {

        const { client, date, visitType, remarks } = Object.fromEntries(params);
        const salesInput = {
            clientId: client.toString(),
            visitType: visitType.toString(),
            remarks: remarks.toString(),
            date: date.toString(),
            partnerId: partner?partner.id:'',
            partner:partner,
            addedItems: addedItems
        }

        console.log(`sales Input:`);
        console.log(salesInput.partner);
        

        try {
            setLoading(true)
            console.log('sales add call');
            
            const response = await addSales(salesInput)
            if (response != undefined) {
                setLoading(false)
                router.push('/admin/sales/list')

            }
        } catch (error: any) {
            setLoading(false)
            toast.error(error.message, {
                position: toast.POSITION.TOP_CENTER
            });

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

            <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                    New Sale /  Follow - up
                </h2>
                <form className="space-y-4 md:space-y-6 " action={onSubmit}>
                    <div
                        className="max-w-lg"
                        id="selectDate" >
                        <div >
                            <Label
                                htmlFor="date"
                                value="Select Date"
                                id='date'
                            />
                        </div>
                        <Datepicker name='date' id='date' required={true} />
                    </div>

                    <div
                        className="max-w-lg"
                        id="client" >
                        <Label
                            htmlFor="client"
                            value="Select Client"
                            id='client'
                        />
                        <SearchAbleSelect id='client' name='client' value={client} options={clients} getLabel={(option: any) => `${option.name}`} getValue={(option: any) => `${option.id}`} onChange={onClientSelect} ></SearchAbleSelect>

                    </div>

                    <div
                        className="max-w-lg"
                        id="partner" >
                        <Label
                            htmlFor="partner"
                            value="Select Partner"
                            id='partner'
                        />
                        <SearchAbleSelect id='partner' name='partner' value={partner} options={partners} getLabel={(option: any) => `${option.name}`} getValue={(option: any) => `${option}`} onChange={onPartnerSelect}  ></SearchAbleSelect>

                    </div>

                    <div
                        className="max-w-lg"
                        id="visitType"
                    >

                        <div>
                            <Label
                                htmlFor="visitType"
                                value="Select Visit Type"
                            />
                        </div>
                        <Select
                            id="visitType"
                            name='visitType'
                            required
                        >
                            {
                                visitTypes.map((visitType: VistType) => {
                                    return (
                                        <option key={visitType.value} value={visitType.value}>
                                            {visitType.label}
                                        </option>
                                    );

                                })
                            }
                        </Select>
                    </div>
                    <div
                        className="max-w-lg"
                        id="remarks" >
                        <Label
                            htmlFor="remarks"
                            value="remarks"
                            id='remarks'
                        />
                        <textarea
                            name="remarks"
                            rows={4}
                            id="remarks"
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Remarks"
                        />

                    </div>

                    <div className="grid grid-cols-1 gap-y-2 md:gap-x-2 md:grid-cols-3 justify-between  max-w-xl">
                        <div className='max-w-md' >
                            <Label
                                htmlFor="product"
                                value="Select Product"
                                id='product'
                            />
                            <SearchAbleSelect
                                name='product'
                                id='product'
                                options={products}
                                getLabel={(option: any) => `${option.name}`}
                                getValue={(option: any) => `${option['id']}`}
                                onChange={onProductSelect}
                                value={product}
                            />

                        </div>

                        <div className='max-w-md' >
                            <Label
                                htmlFor="qty"
                                value="Enter Quantity"
                                id='qty'
                            />
                            <input
                                type="text"
                                name="qty"
                                onChange={(e) => setQty(e.target.value)}
                                value={qty}
                                id="qty"
                                ref={qtyRef}
                                className="bg-gray-50  max-w-md border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Quantity" />

                        </div>
                        <Button
                            size="xs"
                            // type="submit"
                            onClick={getFilteredPrices}
                            className=" w-1/4 md:w-full bg-primary-600 hover:bg-primary-700 self-end  focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg h-10  px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                        >
                            <p className='text-white font-medium  text-sm'>
                                Add Item
                            </p>
                        </Button>
                    </div>
                    <div>
                        <ul className="divide-y divide-gray-200">
                            {addedItems.map((item, index) => {
                                return (<li key={index} className="py-2">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="text-lg font-semibold">{item.product?.name}</p>
                                            <p>Qty: {item.qty.toString()}</p>
                                        </div>
                                        <div>
                                            <p className="text-lg font-semibold">{`${item.price * item.qty} + ${item.product.gst} % G.S.T = ₹  ${(item.price + (item.product.gst/100) * item.price)*item.qty } `}</p>
                                        </div>
                                    </div>
                                </li>)

                            }

                            )}
                        </ul>
                    </div>
                    <Button

                        size="xs"
                        type="submit"
                        className="w-full bg-primary-600 hover:bg-primary-700  focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg  px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    >
                        <p className='text-white font-medium  text-sm'>
                            Add Sale
                        </p>
                    </Button>
                </form>
            </div >
        </section >
    );

}

export default SalesForm;