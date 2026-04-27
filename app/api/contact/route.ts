import prisma from '../../../lib/prisma';

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);    
        const pageParam = searchParams.get('page');
        const limitParam = searchParams.get('limit');

        const page = pageParam != null ? Number(pageParam) : 1;
        const limit = limitParam != null ? Number(limitParam) : 10;
        
        const skip = Number(page) == 1 ? 0 : Number(page - 1) * Number(limit);
        let filters: any = {};
        
        searchParams.forEach((value, key) => {
            if (key.startsWith('filter')) {
                const parts = value.split('||');                
                if (parts.length === 3) {
                    const [field, cond, val] = parts;
                    if (cond == 'contains') {
                        filters[field] = {
                            [cond]: val,
                        };
                    } else {
                        filters[field] = {
                            [cond]: val,
                        };
                    }
                }
            }
        });        

        const res = await prisma.contact.findMany({
            skip: skip,
            take: Number(limit),
            where: { ...filters },
            orderBy: {
                createdAt: 'desc',
            }
            // Removed 'include' because Contact does not have relational tables yet
        });

        // Passing the filters to the count so your frontend pagination math stays accurate
        const total = await prisma.contact.count({
            where: { ...filters }
        });

        const responseData = { 
            data: res, 
            limit: Number(limit), 
            page: pageParam != null ? Number(pageParam) : 1, 
            total: total 
        };
        
        console.log('Contact API responseData:', responseData);
        
        return Response.json(responseData);
    } catch (error) {
        console.error('Contact GET API Error:', error);
        return Response.error();
    }
}