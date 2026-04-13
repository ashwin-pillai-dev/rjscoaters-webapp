import {z} from 'zod'


export const paymentSchema = z.object({
    id: z.string().optional(),                        // Validates UUID format for the ID
    amount: z.number({required_error:'Amount is required',invalid_type_error:'Amount is required'}).positive(),                // Validates that amount is a positive number
    paymentDate: z.date({required_error:'Date is required',invalid_type_error:'Date is required'}),                        // Validates DateTime type for paymentDate
    invoiceId: z.string().uuid(),                 // Validates UUID format for the invoiceId
  });

export type paymentFormType = z.infer<typeof paymentSchema>
