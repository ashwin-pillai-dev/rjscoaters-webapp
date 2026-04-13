import { ToastContainer } from 'react-toastify';
import { addInventory } from '../actions';
import FormItems from './formItems';
import { getProducts } from '../../products/services';
import { getInventoryTypes } from '../../inventory-type/services';

export default async function page() {
    const productData = getProducts({page:1,limit:1000,filters:[],fullTextSearch:'',orderBy:'createdAt,DESC'});
    const inventoryTypeData = getInventoryTypes()
    const [products, inventoryTypes] = await Promise.all([productData, inventoryTypeData])
    return (
        <section className="bg-white dark:bg-gray-900">
            <ToastContainer />
            <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                    Add New Inventory
                </h2>
                    <FormItems products={products.data} inventoryTypes={inventoryTypes}/>
            </div >
        </section >
    )
}