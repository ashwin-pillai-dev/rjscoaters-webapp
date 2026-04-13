'use client'
import { categoryType } from "../../categories/list/page"
import { ToastContainer } from 'react-toastify';
import { FileInput, Label, Button, Select } from 'flowbite-react';
import { addProduct } from '../actions'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductFormData, productSchema } from "../productSchema";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { useRouter } from "next/navigation";



type PropType = {
    categories: any[]
}

const ProductForm: React.FC<PropType> = (props) => {
    const { categories } = props
    const router = useRouter()
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<ProductFormData>({
        resolver: zodResolver(productSchema),
    });

    const onSubmit = async (data: ProductFormData) => {
        console.log("Form data", data);
        // try {

        //     const res = await addProduct(data)
        //     if (res) {
        //         Swal.fire({
        //             position: "top-end",
        //             icon: "success",
        //             title: "Your product has been added succuessfullu",
        //             showConfirmButton: false,
        //             timer: 1500,
        //             heightAuto: false,
        //             width: "500px",       // Set the dialog width
        //             padding: "1em",
        //             customClass: {
        //                 icon: 'small-icon'  // Add a custom class to the icon
        //             }
        //         });
        //         router.push('/admin/products/list');
        //     }
        // } catch (error) {
        //     Swal.fire({
        //         position: "top-end",
        //         icon: "error",
        //         title: `Failed saving category`,
        //         showConfirmButton: false,
        //         timer: 1500,
        //         heightAuto: false,
        //         width: "500px",       // Set the dialog width
        //         padding: "1em",
        //         customClass: {
        //             icon: 'small-icon'  // Add a custom class to the icon
        //         }
        //     });

        // }

    };


    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                    Add New Product
                </h2>
                <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            {...register("name")}
                            id="name"
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Product Name"
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                    </div>

                    <div className="max-w-md" id="select">
                        <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Select Category <span className="text-red-500">*</span>
                        </label>
                        <select
                            {...register("category")}
                            id="category"
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                            <option value="">Select category</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                        {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
                    </div>

                    <div className="max-w-md" id="textarea">
                        <label htmlFor="desc" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Product Description
                        </label>
                        <textarea
                            {...register("desc")}
                            id="desc"
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Details about products"
                            rows={4}
                        />
                    </div>
{/* 
                    <div>
                        <label htmlFor="file" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Upload File
                        </label>
                        <input
                            type="file"
                            {...register("file")}
                            id="file"
                            className="block w-full text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                        />
                    </div> */}

                    <div>
                        <label htmlFor="mrp" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            MRP <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="number"
                            {...register("mrp", { valueAsNumber: true })}
                            id="mrp"
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="0.0"
                        />
                        {errors.mrp && <p className="text-red-500 text-sm">{errors.mrp.message}</p>}
                    </div>

                    <div>
                        <label htmlFor="gst" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            G.S.T <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="number"
                            {...register("gst", { valueAsNumber: true })}
                            id="gst"
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="0.0"
                        />
                        {errors.gst && <p className="text-red-500 text-sm">{errors.gst.message}</p>}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    >
                        <p className="text-white font-medium text-sm">Create Product</p>
                    </button>
                </form>
            </div >
        </section >
    );

}

export default ProductForm;