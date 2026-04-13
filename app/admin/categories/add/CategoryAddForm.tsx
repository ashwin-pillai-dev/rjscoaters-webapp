'use client'
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, FileInput, Label } from 'flowbite-react'
import React, { FormEvent } from 'react'
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { categoryFormType, categorySchema } from './categorySchema';
import { addCategory, updateCategory } from '../actions';
import { useRouter } from 'next/navigation';

interface categoryProps {
    isEdit: boolean,
    categoryId?: string,
    categoryData?: categoryFormType
}


export default function CategoryAddForm({ isEdit, categoryId, categoryData }: categoryProps) {
    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors, isSubmitting } } = useForm<categoryFormType>({
            defaultValues: isEdit ? categoryData : {},
            resolver: zodResolver(categorySchema)
        })

    const router = useRouter()


    async function onsubmit(data: categoryFormType) {
        try {
            console.log('category data: ', data);

            if (isEdit) {
                const res = await updateCategory(data, categoryId);
                console.log('category res: ', res);
                if (res) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your category has been updated",
                        showConfirmButton: false,
                        timer: 1500,
                        heightAuto: false,
                        width: "500px",       // Set the dialog width
                        padding: "1em",
                        customClass: {
                            icon: 'small-icon'  // Add a custom class to the icon
                        }
                    });
                    router.push('/admin/categories/list');
                }
            }
            else {
                const res = await addCategory(data);
                console.log('category res: ', res);
                if (res) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your category has been saved",
                        showConfirmButton: false,
                        timer: 1500,
                        heightAuto: false,
                        width: "500px",       // Set the dialog width
                        padding: "1em",
                        customClass: {
                            icon: 'small-icon'  // Add a custom class to the icon
                        }
                    });
                    router.push('/admin/categories/list');
                }
            }


        } catch (error) {
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: `Failed ${isEdit?'updating':'saving'} category`,
                showConfirmButton: false,
                timer: 1500,
                heightAuto: false,
                width: "500px",       // Set the dialog width
                padding: "1em",
                customClass: {
                    icon: 'small-icon'  // Add a custom class to the icon
                }
            });
        }
    }

    return (
        <form className="space-y-4 md:space-y-6"
            onSubmit={handleSubmit(onsubmit)}
        >
            <div>
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Name <span className="text-red-500">*</span>
                </label>
                <input
                    {...register('name')}
                    type="text"
                    id="name"
                    className={`bg-gray-50 border ${errors.name ? 'border-red-500' : 'border-gray-300'
                        } text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                    placeholder="Category Name"
                />
                {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>}
            </div>

            <div>
                <Label htmlFor="file" value="Upload file" />
                <FileInput
                    // {...register('image')}
                    id="file"
                    name="file"
                />
                {errors.image && <p className="mt-2 text-sm text-red-600">{errors.image.message}</p>}
            </div>

            {
                <Button
                    size="xs"
                    type="submit"
                    // onClick={onsubmitCheck}
                    disabled={isSubmitting}
                    isProcessing={isSubmitting}
                    className="w-full bg-primary-600 hover:bg-primary-700  focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg  px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                    <p className='text-white font-medium  text-sm'>
                        {`${isEdit ? "Edit" : "Add"} Category`}
                    </p>
                </Button>

            }

        </form>
    )
}
