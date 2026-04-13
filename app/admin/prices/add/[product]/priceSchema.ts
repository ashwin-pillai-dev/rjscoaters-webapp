import { z } from 'zod';

export type priceFormType = z.infer<typeof priceSchema >
export const priceSchema = z.object({
  startingQtyLimit: z.number({required_error:'Start limit is required',invalid_type_error:'Start limit is required'}).min(1,{message:'Minimum quantity 1'}),
  endingQtyLimit: z.number({required_error:'End limit is required',invalid_type_error:'End limit is required'}).min(1,{message:'Minimum quantity 1'}),
  amount: z.number({required_error:'Amount is required',invalid_type_error:'Amount is required'}), // Adjust min/max as needed
  clientTypeId: z.string({required_error:'Client type is required',invalid_type_error:'Invalid Client type'}).uuid(),
  productId: z.string({required_error:'Product is required',invalid_type_error:'Invalid Product type'}).uuid(),
});
