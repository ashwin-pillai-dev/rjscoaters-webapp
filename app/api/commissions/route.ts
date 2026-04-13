import prisma from '../../../lib/prisma';

export const dynamic = 'force-dynamic'
export const revalidate = 0


export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const partnerId:any = searchParams.get('partnerId')


    try {
        const res = await prisma.commission.findMany({
            include: {
                partner: true,
                sales:{
                    include:{
                        invoice:true
                    }
                }
            },

            where: {
                partnerId: partnerId, 
            },
        });
        return Response.json(res)
    } catch (error) {
        return Response.error()


    }
}

