"use client";

import DefaultNavbar from "../components/DefaultNavbar";
import DefaultFooter from "../components/footer";
import Map from "../components/Map";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { submitContactForm } from "./action";
import { toast, ToastContainer } from "react-toastify";

// Define the validation schema using Zod
const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(5, "Message must be at least 5 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    const response = await submitContactForm(data);
    if (response.success) {
      toast.success(response.message);
      reset(); // Clear form fields
    } else {
      toast.error(response.message);
    }
  };

  return (
    <div>
      <DefaultNavbar />
      <div className="container mx-auto pb-10">
        <section className="bg-white dark:bg-gray-900 pt-10">
          <h1 className="text-primary-700 text-4xl font-bold text-center">Contact Us</h1>
          <p className="text-primary-600 font-bold text-2xl mt-5 mb-10 text-center">
            Feel free to reach out to us with any questions or inquiries.
          </p>
          
          <div className="w-full px-4 md:px-10 mb-10">
            <Map />
          </div>

          <div className="px-4 md:px-10 grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Contact Details Section */}
            <div className="flex flex-col space-y-6">
              <div>
                <h2 className="text-primary-700 font-bold text-xl mb-2">Support</h2>
                <p className="text-gray-700">rjscoaters@gmail.com</p>
              </div>

              <div>
                <h2 className="text-primary-700 font-bold text-xl mb-2">Address</h2>
                <p className="text-gray-700 md:w-82 break-words">
                  RJS Coaters, Plot no.H-57, Additional MIDC Kudavali, Maharashtra
                </p>
              </div>

              <div>
                <h2 className="text-primary-700 font-bold text-xl mb-2">Phone</h2>
                <p className="text-gray-700">+91 89835 37714</p>
              </div>
            </div>

            {/* Form Section */}
            <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-lg shadow-md">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                  <input
                    {...register("name")}
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm p-2 border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="Your Name"
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                    <input
                      {...register("email")}
                      type="email"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm p-2 border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="you@example.com"
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone (Optional)</label>
                    <input
                      {...register("phone")}
                      type="text"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm p-2 border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="+91 00000 00000"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Subject</label>
                  <input
                    {...register("subject")}
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm p-2 border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="How can we help?"
                  />
                  {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Message</label>
                  <textarea
                    {...register("message")}
                    rows={4}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm p-2 border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="Your message..."
                  ></textarea>
                  {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out disabled:opacity-50"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
      <DefaultFooter />
      {/* Toast container for notifications */}
      <ToastContainer position="bottom-right" />
    </div>
  );
}