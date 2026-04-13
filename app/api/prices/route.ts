import prisma from '../../../lib/prisma';

export const dynamic = 'force-dynamic'
export const revalidate = 0


export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const productId:any = searchParams.get('productId')


    try {
        const res = await prisma.prices.findMany({
            include: {
                clientType: true
            },

            where: {
                productId: productId, 
            },
        });
        return Response.json(res)
    } catch (error) {
        return Response.error()


    }
}

