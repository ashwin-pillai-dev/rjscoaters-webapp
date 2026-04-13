import { get } from "@/utils/queryHelper/queryHelper";
import { Filter, PaginatedResponse, requestParams } from "@/utils/queryHelper/queryHelper.types";
import { Prisma } from "@prisma/client";

interface PropType {
  filter: Filter[],
  page: string
  limit: string
}
export async function getSales(params: requestParams): Promise<
  PaginatedResponse<
    Prisma.SaleGetPayload<
      {
        include: {
          Partner: true,
          invoice: {
            include: {
              client: true
            }
          }

        }
      }>
  >
> {
  // const search = props.query;




  try {
    const response = await get('/sales', params)

    console.log(response.ok);

    if (response.ok) {
      console.log('before data');
      console.log(response);

      const data = await response.json();
      const pageResponse: PaginatedResponse<
        Prisma.SaleGetPayload<
          {
            include: {
              Partner: true,
              invoice: {
                include: {
                  client: true
                }
              }

            }
          }>
      > = {
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

export async function fetchFilteredPrice(productId: string, clientTypeId: string, qty: number) {
  try {
    const response = await fetch(`${process.env.API_URL}/filteredPrices?productId=${productId}&clientTypeId=${clientTypeId}&qty=${qty}`, { cache: 'no-cache' });
    if (response.ok) {
      const result = await response.json();
      return result;
    } else {
      console.error('Error fetching data');
      throw new Error('Problem in fetching filtered priced')
    }
  } catch (error) {
    console.error('Error fetching data');
    throw new Error('Problem in fetching filtered priced')
  }
}