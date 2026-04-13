'use client'

import { useRouter } from "next/navigation"
import SearchAbleSelect from "../../components/SearchAbleSelect/SearchAbleSelect"
import { updatePaidStatus } from "../actions"

export default function PaidSelect({paid,commissionId,partnerId}:{paid:any,commissionId:string,partnerId:string}){
    const router = useRouter();
    async function onPaidChange(isPaid:any){
      try {
          await updatePaidStatus({paid:isPaid.value,commissionId});
          router.push(`/admin/commisions/list/${partnerId}`)
      } catch (error) {
        
      }


    }
    return(
    <SearchAbleSelect
    defaultValue={paid}
    name='paid'
    id='paid'
    options={[{ label: 'Paid', value: true }, { label: 'Pending', value: false }]}
    getLabel={(option: any) => `${option.label}`}
    getValue={(option: any) => `${option['value']}`}
    onChange={(value:any)=>onPaidChange(value)}
/>
    )
}