import {z} from 'zod'


export const categorySchema = z.object({

    name:z.string().min(1,{message:'Name is required'}),
    image: z
    .instanceof(File)
    .optional(),   
     desc:z.string().optional()
})

export type categoryFormType = z.infer<typeof categorySchema>
