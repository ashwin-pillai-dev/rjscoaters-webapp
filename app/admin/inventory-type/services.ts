import { get } from "@/utils/queryHelper/queryHelper";
import { requestParams } from "@/utils/queryHelper/queryHelper.types";

export async function getInventoryTypes() {
  try {

    const params:requestParams={
      page: 1,
      limit: 10,
      filters:[],
      orderBy:'createdAt,DESC',
      fullTextSearch:''
    }

    const response = await get(`/inventory-types`,params);



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