import { ToastContainer } from 'react-toastify';
import { addPrices} from '../../actions';
import FormItems from './formItems';
import { getClientTypes } from '../../../client-type/services';

export default async function Page({
    params,
  }: {
    params: { product: string }
  })  {
    const clientTypes = await getClientTypes({page:'1',limit:'1000'})
    const productId:any = params.product
    
    return (
        <section className="bg-white dark:bg-gray-900">
            <ToastContainer />
            <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                    Add New Price
                </h2>
                    <FormItems isEdit={false} addPrices={addPrices} productId={productId} clientTypes={clientTypes}/>
            </div >
        </section >
    )
}