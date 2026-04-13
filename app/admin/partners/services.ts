// 'use server'

import { get } from "@/utils/queryHelper/queryHelper";

export async function getAgents() {
    try {
      
      const response = await  get('/admins',{limit:1000,page:1,filters:[],fullTextSearch:'',orderBy:'id,DESC'});
      

      if (response.ok) {        
        const data = await response.json();
        return data;
      } else {
        console.error('Error fetching admin data:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching admin data:', error);
    }
  }