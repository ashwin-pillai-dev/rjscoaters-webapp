import { z } from "zod";
import { ClientTypeSchema } from "../../client-type/add/clientTypeSchema";


export const ClientSchema = z.object({
  name: z.string().min(1,{message:'Name is required'}),
  email: z.union( [
    z.literal( '' ),
    z.string().email(),
] ),
  address: z.string().min(6,{message:'address is required'}),
  contactNumber: z.string().min(10,{message:'contact number is required'}), // Add any further validations if needed
  // clientType: ClientTypeSchema,
  cityId: z.string({ required_error: 'Please select a city',invalid_type_error:'Please select a city' })
  .uuid({ message: 'Client ID must be a valid UUID' }),
  clientTypeId:z.string().min(1,{message:'please select client'})
});
export type clientForm = z.infer<typeof ClientSchema>