import { z } from "zod";

export const InventoryUpdateSchema = z.object({
    inventoryId: z.string({ required_error: 'Please select an inventory', invalid_type_error: 'Please select an inventory' }), // The inventoryId as a required string
    qty: z.number(), // Float type mapped to number
    updateDate: z.string().min(1, { message: 'Date must be selected' }),
    // Defaults to now
    supplier: z.string({required_error:'Please provide supplier details',invalid_type_error:'Please provide supplier details'}), // Nullable string for supplier
    notes: z.string().optional(), // Nullable string for notes
    invoiceNumber: z.string({required_error:'Please provide invoice number',invalid_type_error:'Please provide invoice number'}), // Required string for invoiceNumber
    inward: z.boolean(), // Nullable string for optional invoice
});

export type InventoryUpdateFormType = z.infer<typeof InventoryUpdateSchema>
