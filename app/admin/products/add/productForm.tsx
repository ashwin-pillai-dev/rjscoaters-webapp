'use client'
import { addProduct } from '../actions'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductFormData, productSchema } from "../productSchema";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { useRouter } from "next/navigation";

const ServiceForm = () => {
    const router = useRouter()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ProductFormData>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            gst: 18, // Hidden default
            mrp: 0,
            category: '03836875-3685-4296-8091-bfb585b1e99a' // Hidden master category
        }
    });

    const onSubmit = async (data: ProductFormData) => {
        try {
            const res = await addProduct(data)
            if (res) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Service registered successfully",
                    showConfirmButton: false,
                    timer: 1500,
                    heightAuto: false,
                    width: "400px",
                });
                router.push('/admin/products/list');
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Submission Failed",
                text: "Please check your network or Turso DB status.",
            });
        }
    };

    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                <h2 className="mb-8 text-2xl font-bold text-gray-900 dark:text-white border-b-2 border-blue-600 inline-block pb-1">
                    New Service Entry
                </h2>

                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>

                    {/* Service Name */}
                    <div>
                        <label htmlFor="name" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">
                            Service / Product Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            {...register("name")}
                            id="name"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3.5 dark:bg-gray-700 dark:border-gray-600"
                            placeholder="e.g., Ayurvedic Consultation"
                        />
                        {errors.name && <p className="mt-1 text-red-500 text-xs">{errors.name.message}</p>}
                    </div>

                    {/* Service Description */}
                    <div>
                        <label htmlFor="desc" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">
                            Service Description
                        </label>
                        <textarea
                            {...register("desc")}
                            id="desc"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3.5"
                            placeholder="Enter service details here..."
                            rows={4}
                        />
                    </div>

                    {/* Base Rate (MRP) */}
                    <div>
                        <label htmlFor="mrp" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">
                            Service Rate (₹) <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="number"
                            step="0.01"
                            {...register("mrp", { valueAsNumber: true })}
                            id="mrp"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-3.5"
                        />
                        {errors.mrp && <p className="mt-1 text-red-500 text-xs">{errors.mrp.message}</p>}
                    </div>
                    {/* <div>
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
                    </div> */}

                    {/* Hidden Inputs for Background Logic */}
                    <input type="hidden" {...register("gst")} value={18} />
                    <input type="hidden" {...register("category")} />

                    <div className="pt-6">
                        <button
                            type="submit"
                            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-bold rounded-lg text-base px-5 py-4 transition-all shadow-md"
                        >
                            Save Service to Inventory
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
}

export default ServiceForm;