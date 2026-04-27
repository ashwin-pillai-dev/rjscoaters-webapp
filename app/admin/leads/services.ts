import { get } from "@/utils/queryHelper/queryHelper";
import { PaginatedResponse, requestParams } from "@/utils/queryHelper/queryHelper.types";
import { Prisma } from "@prisma/client";

export async function getContacts(params: requestParams): Promise<
  PaginatedResponse<
    Prisma.ContactGetPayload<{}>
  >
> {
  try {
    // Make sure your backend route matches this endpoint (e.g., '/api/contact' or just '/contact')
    const response = await get('/contact', params);
    
    if (response.ok) {
      const data = await response.json();
      console.log('contact data: ', data);

      const pageResponse: PaginatedResponse<
        Prisma.ContactGetPayload<{}>
      > = {
        page: params.page,
        total: data.total,
        limit: params.limit,
        data: data.data
      };
      
      return pageResponse;
    } else {
      console.error('Error fetching contacts:', response.statusText);
      throw new Error('Error fetching contacts');
    }
  } catch (error) {
    console.error('Error fetching contacts:', error);
    throw new Error('Error fetching contacts');
  }
}