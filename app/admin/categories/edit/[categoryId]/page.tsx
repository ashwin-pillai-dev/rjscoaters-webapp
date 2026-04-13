import { ToastContainer } from 'react-toastify';
import CategoryAddForm from '../../add/CategoryAddForm';
import { requestParams } from '@/utils/queryHelper/queryHelper.types';
import { getCategories } from '../../services';
import { categoryFormType } from '../../add/categorySchema';
export default async function page({params}:{params:{categoryId:string}}) {
    const reqParams: requestParams = {
        page:1,
        limit: 100,
        filters: [{field:'id',cond:'equals',value:params.categoryId}],
        orderBy: 'id,ASC',
        fullTextSearch: ''
      }

    const categoryRes = await getCategories(reqParams)
    const category:categoryFormType = {
        name:categoryRes.data[0].name
    }
    return (
        <section className="bg-white dark:bg-gray-900">
            <ToastContainer />
            <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                    Edit Category
                </h2>
                <CategoryAddForm isEdit={true} categoryId={params.categoryId} categoryData={category} />
            </div >
        </section >
    )
}