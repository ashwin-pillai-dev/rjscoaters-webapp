'use client'
import { useState } from 'react';
import { Button, Label, Select } from 'flowbite-react';
import { AdminRole } from '@prisma/client';
import { PartnerFormSchema } from './partnerFormSchema'; 
import { useRouter } from "next/navigation"
import { AiOutlineLoading } from 'react-icons/ai';



type PropType = {
    partnerRoles: AdminRole[];
    addPartner: any;
};

type FormErrors = {
    name?: string[];
    roleId?: string[];
    email?: string[];
    contactNumber?: string[];
    password?: string[];
};

const PartnerForm: React.FC<PropType> = (props) => {
    const router = useRouter();
    const { partnerRoles, addPartner } = props;
    const [loading,setLoading] = useState(false)

    const [formValues, setFormValues] = useState({
        name: '',
        roleId: '',
        email: '',
        contactNumber: '',
        password: '',
    });
    const [formErrors, setFormErrors] = useState<FormErrors>({});

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {


        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        

        console.log('on submit form values');
        console.log(formValues);


        const validationResult = PartnerFormSchema.safeParse(formValues);
        console.log('validationResult');
        console.log(validationResult);
        

        if (validationResult.success) {
            console.log('Form values:');
            console.log(formValues);
            setLoading(true)
           try {
             await addPartner(formValues);
             router.push(`/admin/partners/list`)
           } catch (error) {
            
           }
           finally{
            setLoading(false)

           }
            
            // Handle successful form submission (e.g., send data to backend)
        } else {
            const errors = validationResult.error.flatten().fieldErrors;
            setFormErrors(errors);
        }
    };

    return (
        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
            {/* Name Field */}
            <div>
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Name<span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Name"
                    value={formValues.name}
                    onChange={handleInputChange}
                />
                {formErrors.name && formErrors.name.map((error, index) => (
                    <p key={index} className="text-red-500 text-xs mt-1">{error}</p>
                ))}
            </div>

            {/* Role ID Field */}
            <div>
                <div>

                    <label htmlFor="roleId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Select Partner Role <span className="text-red-500">*</span>
                    </label>
                </div>
                <Select
                    id="roleId"
                    name='roleId'
                    placeholder="-- Select a Role --" 
                    value={formValues.roleId}
                    onChange={handleInputChange}
                >
                    <option value="" className="text-sm font-medium text-gray-900 dark:text-white" disabled hidden>
                        Select a Role
                    </option>
                    {/* <option value="" className='text-sm font-medium text-gray-900 dark:text-white'>-- Select a Role --</option> */}
                    {partnerRoles.map((role: AdminRole) => (
                        <option key={role.id} value={role.id}>
                            {role.roleName}
                        </option>
                    ))}
                </Select>
                {formErrors.roleId && formErrors.roleId.map((error, index) => (
                    <p key={index} className="text-red-500 text-xs mt-1">{error}</p>
                ))}
            </div>

            {/* Email Field */}
            <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Email<span className="text-red-500">*</span>
                </label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Email"
                    value={formValues.email}
                    onChange={handleInputChange}
                //   required
                />
                {formErrors.email && formErrors.email.map((error, index) => (
                    <p key={index} className="text-red-500 text-xs mt-1">{error}</p>
                ))}
            </div>

            {/* Contact Number Field */}
            <div>
                <label htmlFor="contactNumber" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Contact Number<span className="text-red-500">*</span>
                </label>
                <input
                    type="tel"
                    name="contactNumber"
                    id="contactNumber"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Contact Number"
                    value={formValues.contactNumber}
                    onChange={handleInputChange}
                //   required
                />
                {formErrors.contactNumber && formErrors.contactNumber.map((error, index) => (
                    <p key={index} className="text-red-500 text-xs mt-1">{error}</p>
                ))}
            </div>

            {/* Password Field */}
            <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Password<span className="text-red-500">*</span>
                </label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Password"
                    value={formValues.password}
                    onChange={handleInputChange}
                //   required
                />
                {formErrors.password && formErrors.password.map((error, index) => (
                    <p key={index} className="text-red-500 text-xs mt-1">{error}</p>
                ))}
            </div>

            {/* Submit Button */}
            <Button
                isProcessing={loading}
                disabled={loading}
                processingSpinner={<AiOutlineLoading className="h-6 w-6 animate-spin" />}
                size="xs"
                type="submit"
                className="w-full bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
                <p className='text-white font-medium text-sm'>
                   { loading?'Loading...':'Create Partner'}
                </p>
            </Button>
        </form>
    );
};

export default PartnerForm;
