import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';
export const dynamic = 'force-dynamic'
export const revalidate = 0



export async function GET(request: NextRequest) {

    let res;
    try {
        const searchParams = request.nextUrl.searchParams
        const pageParam = searchParams.get('page');
        const limitParam = searchParams.get('limit');
        console.log(`page${pageParam} limit ${limitParam}`);

        const page = pageParam != null ? Number(pageParam) : 1;
        const limit = limitParam != null ? Number(limitParam) : 10;

        const skip = Number(page) == 1 ? 0 : Number(page - 1) * Number(limit)
        let filters: any = {}
        searchParams.forEach((value, key) => {
            if (key.startsWith('filter')) {
                const parts = value.split('||');
                if (parts.length === 3) {
                    const [field, cond, value] = parts;
                    if (cond == 'contains') {
                        filters[field] = {
                            [cond]: value,
                            mode: 'insensitive'
                        }
                    }
                    else {
                        filters[field] = {
                            [cond]: value,
                        }
                    }
                }
            }
        })
        res = await prisma.clientType.findMany();
        console.log('res', res);



    } catch (error) {
        return Response.error()


    }
    // console.log(`Revalidate URL`);
    // console.log(`${process.env.API_URL}/client-types`);
    // `${process.env.API_URL}/client-types`

    // revalidatePath(`${process.env.API_URL}/client-types`);   
    return Response.json(res);

}

