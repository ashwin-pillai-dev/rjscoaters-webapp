import { requestParams } from '@/utils/queryHelper/queryHelper.types';
import { getCategories } from '../../categories/services';
import ProductForm from './productForm';

const params: requestParams = {
    page:1,
    limit: 100,
    filters: [],
    orderBy: 'id,ASC',
    fullTextSearch: ''
  }
export default async function page() {
    const categories = await getCategories(params)
    return (
        <div>
            <ProductForm categories={categories.data} />
        </div>

    )
}