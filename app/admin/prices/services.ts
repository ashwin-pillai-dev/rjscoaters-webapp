import { Filter, getReqProps, requestParams } from "@/utils/queryHelper/queryHelper.types";
import {get} from '@/utils/queryHelper/queryHelper'
import { Prisma } from "@prisma/client";


export async function getPrices(productId: string) {
  try {

    const response = await fetch(`${process.env.API_URL}/prices?productId=${productId}`, { cache: 'no-store' });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error('Error fetching prices:', response.statusText);
    }
  } catch (error) {
    console.error('Error fetching prices:', error);
  }
}

export async function getPriceById(props:getReqProps):Promise<Prisma.PricesGetPayload<{include:{product:true,clientType:true}}>[] | null> {
  const search = props.query;
  const {page,limit} = props;
  const filter:Filter[]=props.filters;
 
  const params:requestParams={
    page: typeof(page) === 'string'?Number(page):1,
    limit:typeof(limit) === 'string'?Number(limit):10,
    filters:filter,
    orderBy:'id,ASC',
    fullTextSearch:''
  }

    try{
    const response = await get('/price',params)
    

    console.log(response.ok);
    
    if (response.ok) { 
      console.log('before data');
      const res = await response.json();
      console.log('data');
      console.log(res);
      return res.data;
      
    } else {
      console.error('response not ok:', response.statusText);
      console.log(await response.json())
      
    }
  } catch (error) {
    console.error('in catch block');
    
    console.error('Error fetching admin data:', error);
  }
}

export async function getProductById(props:getReqProps):Promise<Prisma.ProductGetPayload<{include:{category:true}}>[] | null> {
  const search = props.query;
  const {page,limit} = props;
  const filter:Filter[]=props.filters;
  if(search){
    if(search.length > 0){
      filter.push( {field:'name',cond:'contains',value:search})
    }
  }



  const params:requestParams={
    page: typeof(page) === 'string'?Number(page):1,
    limit:typeof(limit) === 'string'?Number(limit):10,
    filters:filter,
    orderBy:'id,ASC',
    fullTextSearch:''
  }

    try{
    const response = await get('/product',params)
    

    console.log(response.ok);
    
    if (response.ok) { 
      console.log('before data');
      const res = await response.json();
      console.log('data');
      console.log(res);
      return res.data;
      
    } else {
      console.error('response not ok:', response.statusText);
      console.log(await response.json())
      
    }
  } catch (error) {
    console.error('in catch block');
    
    console.error('Error fetching admin data:', error);
  }

}  