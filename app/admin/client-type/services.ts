import { get } from "@/utils/queryHelper/queryHelper";
import { Filter, requestParams } from "@/utils/queryHelper/queryHelper.types";

interface PropType{
  query?:string
  page:string
  limit:string
}



export async function getClientTypes(props:PropType) {


    try {

      const search = props.query;
      const {page,limit} = props;
      const filter:Filter[]=[
    
      ];
      if(search){
        if(search.length > 0){
          filter.push( {field:'name',cond:'contains',value:search})
        }
      }
      
      // const response = await  fetch(`${process.env.API_URL}/client-types`,{next:{tags:['client-types']}});
      const params:requestParams={
        page: typeof(page) === 'string'?Number(page):1,
        limit:typeof(limit) === 'string'?Number(limit):10,
        filters:filter,
        orderBy:'id,ASC',
        fullTextSearch:''
      }
    const response = await get('/client-types',params)

      
      

      if (response.ok) {        
        const data = await response.json();
        console.log('data');
        console.log(data);
        
        return data;
      } else {
        console.error('Error fetching admin data:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching admin data:', error);
    }
  }