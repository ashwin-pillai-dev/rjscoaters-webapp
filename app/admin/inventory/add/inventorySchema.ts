import {z} from 'zod'

export const inventorySchema = z.object({
    name: z.string().min(1, 'Name is required.'),
    productId: z.string().min(1, 'Product is required.'),
    inventoryTypeId: z.string().min(1, 'Inventory type is required.'),
    qty: z.number({
        required_error: "Quantity is required",
        invalid_type_error: "Quantity is required",
      }),

})

export type InventoryFormType = z.infer<typeof inventorySchema >