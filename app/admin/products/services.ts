import { get } from '@/utils/queryHelper/queryHelper'
import { PaginatedResponse, requestParams } from '@/utils/queryHelper/queryHelper.types';
import { Product,type Prisma } from '@prisma/client';

export async function getProducts(params:requestParams):Promise<PaginatedResponse<Prisma.ProductGetPayload<{include:{category:true}}>>> {
  try {
    const response = await get('/products', params)
    if (response.ok) {
      const data = await response.json();
      console.log('product data: ',data);
      
      const pageResponse:PaginatedResponse<Prisma.ProductGetPayload<{include:{category:true}}>> = {
        page:params.page,
        total:data.total,
        limit:params.limit,
        data:data.data
      }
      return pageResponse;
    } else {
      console.error('Error fetching products:', response.statusText);
      throw( Error('Error fetching products'))

    }
  } catch (error) {
    console.error('Error fetching products:', error);
    throw( Error('Error fetching products'))
  }
}