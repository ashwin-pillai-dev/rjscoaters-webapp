import { getAgents } from '../../partners/services';
import { getClients } from '../../clients/services';
import { getProducts } from '../../products/services';
import SalesForm from './SalesForm';
import NewSalesForm from './NewSalesForm';
import { requestParams } from '@/utils/queryHelper/queryHelper.types';

export default async function page() {
    const cientReqParams: requestParams = {
        page: 1,
        limit: Number(1000),
        filters: [],
        orderBy: 'id,ASC',
        fullTextSearch: ''
    }
    const clientsData =  getClients(cientReqParams)
    const productsData =  getProducts({page:1,limit:1000,filters:[],fullTextSearch:'',orderBy:'createdAt,DESC'});
    const partnersData = getAgents()
    const [clients, products,partners] = await Promise.all([clientsData, productsData,partnersData])
    
    return (
        <div>
            <NewSalesForm clients={clients.data} products={products.data} partners = {partners} />
        </div>

    )
}