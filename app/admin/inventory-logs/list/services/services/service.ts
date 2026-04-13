// services/inventory.ts
import { requestParams, Filter } from '@/utils/queryHelper/queryHelper.types';
import { get } from '@/utils/queryHelper/queryHelper';

interface InventoryUpdateParams {
    query?: string;
    page: string;
    limit: string;
    inventoryId: string;
}

export async function getInventoryUpdates(props: InventoryUpdateParams) {
    const { query, page, limit, inventoryId } = props;
    const filter: Filter[] = [
        { field: 'inventoryId', cond: 'equals', value: inventoryId },
    ];

    if (query) {
        if (query.length > 0) {
            filter.push({ field: 'notes', cond: 'contains', value: query });
        }
    }

    const params: requestParams = {
        page: typeof (page) === 'string' ? Number(page) : 1,
        limit: typeof (limit) === 'string' ? Number(limit) : 10,
        filters: filter,
        orderBy: 'updateDate,ASC',
        fullTextSearch: ''
    };

    try {
        const response = await get('/inventory-logs', params);

        if (response.ok) {
            const res = await response.json();
            console.log(res);
            return res;
            
        } else {
            console.error('Response not ok:', response.statusText);
            return { data: [], total: 0 }; // Return empty data in case of error
        }
    } catch (error) {
        console.error('Error fetching inventory updates:', error);
        return { data: [], total: 0 }; // Return empty data in case of error
    }
}


