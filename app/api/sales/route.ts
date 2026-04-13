import prisma from '../../../lib/prisma';


export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET(request: Request) {
    try {
        console.log('in route sales');
        
        const { searchParams } = new URL(request.url)
        const pageParam = searchParams.get('page');
        const limitParam = searchParams.get('limit');
        console.log(`page${pageParam} limit ${limitParam}`);

        const page = pageParam != null ? Number(pageParam) : 1;
        const limit = limitParam != null ? Number(limitParam) : 10;

        const skip = Number(page) === 1 ? 0 : (Number(page) - 1) * Number(limit);
        let filters:any = {};

        searchParams.forEach((value, key) => {
            if (key.startsWith('filter')) {
                const parts = value.split('||');
                if (parts.length === 3) {
                    const [field, cond, filterValue] = parts;

                    const [parentField, childField] = field.split('.'); // Split into parent and child fields
                    if (parentField && childField) {
                        if (cond === 'contains') {
                            // Create a nested where clause with 'mode: insensitive' for 'contains'
                            filters[parentField] = {
                                [childField]: {
                                    contains: filterValue,
                                },
                            };
                        } else {
                            // Create a nested where clause without 'mode: insensitive'
                            filters[parentField] = {
                                [childField]: filterValue,
                            };
                        }
                    } else {
                        if (cond === 'contains') {
                            // Create a where clause with 'mode: insensitive' for 'contains'
                            filters[field] = {
                                contains: filterValue,
                                mode: 'insensitive',
                            };
                        } else {
                            // Create a where clause without 'mode: insensitive'
                            filters[field] = {
                                [cond]: filterValue,
                            };
                        }
                    }
                }
            }
        });

        const res = await prisma.sale.findMany({
            skip: skip,
            take: Number(limit),
            where: { ...filters },
            include: {
                invoice: {
                    include: {
                        client: true,
                    }
                },
                admin: true
            },
            orderBy: {
                createdAt: 'desc',
            }
        });

        const total = await prisma.sale.count();

        const responseData = { data: res, limit: Number(limit), page: Number(pageParam), total: total };
        const response = Response.json(responseData);
        return response;
    } catch (error) {
        console.log('error log server');
        console.error(error);
        return Response.error();
    }
}
