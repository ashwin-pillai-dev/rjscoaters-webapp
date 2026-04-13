import { requestParams,Filter} from '@/utils/queryHelper/queryHelper.types'
import {get} from '@/utils/queryHelper/queryHelper'

interface PropType{
  query?:string
  page:string
  limit:string
}
export async function getPartnerRoles(props:PropType) {
  const search = props.query;
  const {page,limit} = props;
  const filter:Filter[]=[

  ];
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
    const response = await get('/partner-roles',params)

    console.log(response.ok);
    
    if (response.ok) { 
      console.log('before data');
      const res = await response.json();
      console.log('data');
      console.log(res);
      return res;
      
    } else {
      console.error('response not ok:', response.statusText);
      console.log(await response.json())
      
    }
  } catch (error) {
    console.error('in catch block');
    
    console.error('Error fetching admin data:', error);
  }

}    

 

  