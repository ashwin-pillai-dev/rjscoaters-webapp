import { z } from 'zod';

export const productSchema = z.object({
  id: z.string({ required_error: 'Please select a product',invalid_type_error:'Please select a product' }).uuid({ message: 'Product ID must be a valid UUID' }), // Assuming product has a unique identifier
  name: z.string(),
  gst: z.number(), // Assuming product has a GST percentage
});

export const addedItemSchema = z.object({
  product: productSchema.optional(),
  productId:  z.string({ required_error: 'Please select a product',invalid_type_error:'Please select a product' })
  .uuid({ message: 'product ID must be a valid UUID' }),// Product might not be selected yet
  qty: z.number({invalid_type_error:'Invalid Quantity type',required_error:'Quantity is required'}).positive({message:'Quantity should be atleast 1'}), // Quantity must be positive
  price: z.number(), // Price should be retrieved from product
  total: z.number(), // total will be price X quantity
});

export const saleSchema = z.object({
  date: z.string().min(1,{message:'Date must be selected'}),
  clientId: z.string({ required_error: 'Please select a client',invalid_type_error:'Please select a client' })
  .uuid({ message: 'Client ID must be a valid UUID' }),
  partnerId: z.string({ required_error: 'Please select a partner',invalid_type_error:'Please select a partner' }) .uuid({ message: 'Partner ID must be a valid UUID' }),
  visitType: z.string().default('0'),
  remarks: z.string({required_error:'Please provide sale details',invalid_type_error:'Please provide sale details'}).min(1,{message:'Please provide sale details'}),
  addedItems: z.array(addedItemSchema).min(1,{message:'Minimum one product required to add a sale'}),
  paidAmount: z.number(), // Price should be retrieved from product
  remainingAmount: z.number(), // Price should be retrieved from product

});