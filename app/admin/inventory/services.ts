import { requestParams, Filter, PaginatedResponse } from '@/utils/queryHelper/queryHelper.types'
import { get } from '@/utils/queryHelper/queryHelper'
import { Prisma } from '@prisma/client'

interface PropType {
  query?: string
  page: string
  limit: string
}
export async function getInventory(params: requestParams): Promise<PaginatedResponse<Prisma.InventoryGetPayload<
  {
    include: {
      inventoryType: true,
      products: true
    }
  }>>> {

  try {
    const response = await get('/inventory', params)


    console.log(response.ok);

    if (response.ok) {
      const data = await response.json();

      const pageResponse: PaginatedResponse<Prisma.InventoryGetPayload<
        {
          include: {
            inventoryType: true,
            products: true
          }
        }>> = {
        page: params.page,
        total: data.total,
        limit: params.limit,
        data: data.data
      }
      return pageResponse;

    } else {
      console.error('response not ok:', response.statusText);
      console.log(await response.json())

    }
  } catch (error) {
    console.error('in catch block');

    console.error('Error fetching admin data:', error);
  }

}



