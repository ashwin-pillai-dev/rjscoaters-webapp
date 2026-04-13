import { get } from "@/utils/queryHelper/queryHelper";
import { PaginatedResponse, requestParams } from "@/utils/queryHelper/queryHelper.types";
import { Prisma } from "@prisma/client";



export async function getClients(params: requestParams): Promise<
  PaginatedResponse<
    Prisma.ClientGetPayload<
      {
        include: { clientType: true,city:true }
      }>
  >
> {
  try {
    const response = await get('/clients', params)
    if (response.ok) {
      const data = await response.json();
      console.log('cleint data: ', data);

      const pageResponse: PaginatedResponse<
        Prisma.ClientGetPayload<
          {
            include: {
              clientType: true,
              city:true
            }
          }
        >
      > = {
        page: params.page,
        total: data.total,
        limit: params.limit,
        data: data.data
      }
      return pageResponse;
    } else {
      console.error('Error fetching clients:', response.statusText);
      throw (Error('Error fetching clients'))

    }
  } catch (error) {
    console.error('Error fetching clients:', error);
    throw (Error('Error fetching clients'))
  }
}

