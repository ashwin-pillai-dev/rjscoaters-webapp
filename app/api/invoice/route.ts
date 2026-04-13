import prisma from '../../../lib/prisma';

export const dynamic = 'force-dynamic'
export const revalidate = 0


export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const invoiceId:any = searchParams.get('invoiceId')


    try {
        const res = await prisma.invoice.findFirst({
            include:{
                client:true,
                sale:true,
            },
            where: {
                id: invoiceId, 
            },
        });

        const invoiceItems = await prisma.invoiceItem.findMany({
            where:{
                invoiceId:{
                    equals:invoiceId
                },
            },
            include:{
                product:true
            }
        })
        console.log('Invoice: ',res);
        console.log('Invoice Items: ',invoiceItems);
        
        return Response.json({...res,invoiceItems})
    } catch (error) {
        return Response.error()
    }
}

