// pages/api/agents.js
import prisma from '../../../lib/prisma';
export const dynamic = 'force-dynamic'
export const revalidate = 0


export async function GET(request: Request) {

    try {
        const res = await prisma.partner.findMany();
        console.log(res);

        console.log('partners in route:  ',res);
        
        const response =  Response.json(res)
        return response
    } catch (error) {
        return Response.error()


    }
}

// export async function GET(req: NextApiRequest, res: NextApiResponse) {
//   try {
//     console.log('hello');
//     const admins = [{ name: 'anil' }];
//     res.status(200).json(admins);
//   } catch (error) {
//     console.error('Error fetching admin data:', error);
//     res.status(500).json({ error: 'Error fetching admin data: ' + error });
//   } finally {
//     await prisma.$disconnect();
//   }
// }
