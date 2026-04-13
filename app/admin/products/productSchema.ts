import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  category: z.string().min(1, { message: "Category is required" }),
  desc: z.string().optional(),
//   file: z.instanceof(File).optional(),
  mrp: z.number({required_error:'MRP is required',invalid_type_error:'MRP is required'}).min(0, { message: "MRP must be a positive number" }),
  gst: z.number({required_error:'GST is required',invalid_type_error:'GST is required'}).min(0, { message: "GST must be a positive number" }),
});

export type ProductFormData = z.infer<typeof productSchema>;

