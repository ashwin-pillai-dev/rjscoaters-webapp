import prisma from '../../../lib/prisma';

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url)  ;    
        const pageParam =  searchParams.get('page');
        const limitParam =  searchParams.get('limit');
        const s =  searchParams.get('s');
        console.log(`page${pageParam} limit ${limitParam}`);

        const page = pageParam != null ?Number(pageParam) : 1;
        const limit = limitParam != null ?Number(limitParam) : 10;
        
        const skip =  Number(page) ==1?0:Number(page-1) * Number (limit)
        let filters:any = {}
        searchParams.forEach((value, key) => {
            if(key.startsWith('filter')){
                const parts = value.split('||');                
                if (parts.length === 3) {
                    const [field, cond, value] = parts;
                    if(cond == 'contains'){
                        filters[field] ={
                            [cond]:value,
                        }
                    }
                    else{
                        filters[field] ={
                            [cond]:value,
                        }
                    }
                  }
            }
        })

        console.log('filters',filters);
        
        
        const res = await prisma.payment.findMany(
            {
            skip: skip,
            take: Number(limit),
            where: {...filters},
            include:{
                invoice:true
            },
            orderBy:{
                createdAt:'desc',
            }
        }
        );

        console.log('payment res: ',res);
        

        const total =  await prisma.payment.count()

        const responseData = {data:res,limit:Number(limit),page:Number(pageParam),total:total}
        console.log('responseData');
        console.log(responseData);
        

        const response = Response.json(responseData);
        console.log('response');
        console.log(response.json);
        
        return response
    } catch (error) {
        console.log('error log server');
        
        console.error(error);
        
        return Response.error()


    }
}

