import { get } from "@/utils/queryHelper/queryHelper";
import { PaginatedResponse, requestParams } from "@/utils/queryHelper/queryHelper.types";
import { Payment, Prisma } from "@prisma/client";

export async function getPayments(params: requestParams): Promise<PaginatedResponse<Prisma.PaymentGetPayload<{
    include: {
        invoice: true
    }
}>>> {
    try {
        const response = await get('/payments', params)
        if (response.ok) {
            const data = await response.json();
            const pageResponse: PaginatedResponse<Prisma.PaymentGetPayload<{
                include: {
                    invoice: true
                }
            }>> = {
                page: params.page,
                total: data.total,
                limit: params.limit,
                data: data.data
            }
            return pageResponse;
        } else {
            console.error('Error fetching payments:', response.statusText);
            throw (Error('Error fetching payments'))

        }
    } catch (error) {
        console.error('Error fetching payments:', error);
        throw (Error('Error fetching payments'))
    }
}