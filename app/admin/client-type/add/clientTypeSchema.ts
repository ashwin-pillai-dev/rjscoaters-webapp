import { z } from "zod";

export const ClientTypeSchema = z.object({
  name: z.string().min(1,{message:'Name is required'}),
});

// Validation
export type clientTypeForm = z.infer<typeof ClientTypeSchema>
