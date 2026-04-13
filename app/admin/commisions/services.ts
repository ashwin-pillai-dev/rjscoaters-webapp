import { get } from "@/utils/queryHelper/queryHelper";

export async function getCommissions(partnerId:string) {
    try {
      
      const response = await  get(`/commissions?partnerId=${partnerId}`,{limit:1000,page:1,filters:[],fullTextSearch:'',orderBy:'createdAt,DESC'});
      if (response.ok) {        
        const data = await response.json();
        console.log(`commsision data:`);
        console.log(data);
        
        return data;
      } else {
        console.error('Error fetching commssions:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching commssions:', error);
    }
  }