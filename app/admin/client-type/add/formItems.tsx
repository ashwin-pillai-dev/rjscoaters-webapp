'use client'
import { Button } from 'flowbite-react';
import { useRouter } from "next/navigation"
import { addClientType } from '../actions';
import { useForm } from 'react-hook-form';
import { ClientTypeSchema, clientTypeForm } from './clientTypeSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormEvent } from 'react';



export default function FormItems() {
    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors, isSubmitting } } = useForm<clientTypeForm>({
            resolver: zodResolver(ClientTypeSchema)
        })

    const router = useRouter();

    async function onsubmit(formData: clientTypeForm) {
        try {
            console.log('formdata',formData);
            
            const res = await addClientType(formData);
            console.log('res from component',name);
            // console.log(res);

             if(res){
                 router.push(`/admin/client-type/list`)

             }
        } catch (error) {

        }

    }
    async function onsubmitCheck(event: FormEvent) {
        event.preventDefault()
        const values = getValues();
        console.log('values',values);
        const { error, data } = ClientTypeSchema.safeParse(values);
        if(error){
        console.log('error', error);
        }
        if(data){
        console.log('data', data);


        }
    }

    return (
        <div className='space-y-4 md:space-y-6'>

            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onsubmit)}>

                <div>
                    <label htmlFor="name" className={`block mb-2 text-sm font-medium text-gray-900 dark:text-white ${errors.name ? 'border-red-500' : 'border-gray-300'
                        } `}>Name</label>
                    <input {...register('name')} 
                    type="text" 
                    name="name" 
                    id="name" 
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600
                     block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                     placeholder="Client type name"
                      />

                    {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>}
                    {/* {<p className="mt-2 text-sm text-red-600">{'gchgj,mvgj,kjh'}</p>} */}
                </div>


                <Button
                    size="xs"
                    type="submit"
                    disabled={isSubmitting}
                    isProcessing={isSubmitting}
                    // onClick={onsubmitCheck}
                    className="w-full bg-primary-600 hover:bg-primary-700  focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg  px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                    <p className='text-white font-medium  text-sm'>
                        Create Client type
                    </p>
                </Button>
            </form>

        </div>

    )

}