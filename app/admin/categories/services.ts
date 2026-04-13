import { get } from "@/utils/queryHelper/queryHelper";
import {Category} from '@prisma/client'
import { PaginatedResponse, requestParams } from "@/utils/queryHelper/queryHelper.types";

export async function getCategories(params:requestParams):Promise<PaginatedResponse<Category>> {
  try {
    const response = await get('/categories', params)
    if (response.ok) {
      const data = await response.json();
      const pageResponse:PaginatedResponse<Category> = {
        page:params.page,
        total:data.total,
        limit:params.limit,
        data:data.data
      }
      return pageResponse;
    } else {
      console.error('Error fetching categories:', response.statusText);
      throw( Error('Error fetching categories'))

    }
  } catch (error) {
    console.error('Error fetching admin data:', error);
    throw( Error('Error fetching categories'))
  }
}