import { ToastContainer } from 'react-toastify';
import { editPrices } from '../../actions';
import FormItems from '../../add/[product]/formItems';
import { getClientTypes } from '../../../client-type/services';
import { Filter } from '@/utils/queryHelper/queryHelper.types';
import { getPriceById } from '../../services';
import { priceFormType } from '../../add/[product]/priceSchema';

export default async function Page({
  params,
}: {
  params: { price: string };
}) {
  const priceId: any = params.price;

  try {
    const filters: Filter[] = [{ field: 'id', cond: 'equals', value: priceId }];
    
    // Using Promise.all to fetch data concurrently
    const [clientTypesResponse, priceResponse] = await Promise.all([
      getClientTypes({ page: '1', limit: '1000' }),
      getPriceById({ query: null, page: '1', limit: '10', filters }),
    ]);

    const clientTypes = clientTypesResponse;
    const priceRes = priceResponse[0];

    // Constructing the default price form data
    const price: priceFormType = {
      startingQtyLimit: priceRes.startingQtyLimit,
      endingQtyLimit: priceRes.endingQtyLimit,
      amount: priceRes.amount,
      productId: priceRes.productId,
      clientTypeId: priceRes.clientTypeId,
    };

    return (
      <section className="bg-white dark:bg-gray-900">
        <ToastContainer />
        <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
          <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
            Edit Price
          </h2>
          <FormItems
            priceId={priceId}
            priceDefault={price}
            isEdit={true}
            editPrices={editPrices}
            productId={priceRes.productId}
            clientTypes={clientTypes}
          />
        </div>
      </section>
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    // Handle the error, or return a fallback UI
    return (
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
          <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
            Error Loading Data
          </h2>
          <p className="text-red-600">Unable to load price data. Please try again later.</p>
        </div>
      </section>
    );
  }
}
