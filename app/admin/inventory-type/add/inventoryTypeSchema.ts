import {z} from 'zod'


export const inventoryTypeSchema = z.object({

    name:z.string().min(1,{message:'Name is required'}),   
     desc:z.string().optional()
})

export type InventoryTypeFormType = z.infer<typeof inventoryTypeSchema>
