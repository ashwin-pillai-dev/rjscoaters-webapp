'use client'
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

interface LoginFormProps {
    callbackUrl: string;
}

const LoginForm = ({ callbackUrl }: LoginFormProps) => {
    const [data, setData] = useState({ email: "", password: "" });
    const router = useRouter();
    async function logIn(e: any) {
        e.preventDefault();
        try {
            const res: any = await signIn("credentials", {
                redirect: false,
                ...data,
            });

            if (res.error) {
                toast.error(res.error, {
                    position: toast.POSITION.TOP_LEFT,
                });
            } else {
                toast.success("Success Notification!", {
                    position: toast.POSITION.TOP_CENTER,
                });

                console.log('login res: ',res);
                router.push(callbackUrl);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (

        <form className="md:space-y-6 mb-8" onSubmit={logIn}>
            <ToastContainer />
            <input name="url" type="hidden" defaultValue={callbackUrl} />
            <div>

                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Your email
                </label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    onChange={(e) => setData({ ...data, email: e.target.value })}
                    required
                />
            </div>
            <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Password
                </label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    onChange={(e) => setData({ ...data, password: e.target.value })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                />
            </div>
            <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
                Sign in
            </button>
        </form>
    );
};

export default LoginForm;
