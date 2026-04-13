'use client'

import { Button, FileInput, Label, Select } from 'flowbite-react';
import { City, ClientType } from '@prisma/client';
import { useForm } from 'react-hook-form';
import { clientForm, ClientSchema } from './clientsSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { addClient } from '../actions';
import SearchAbleSelect from '../../components/SearchAbleSelect/SearchAbleSelect';


type PropType = {
    clientTypes: ClientType[];
    cities: City[];
}

const ClientForm: React.FC<PropType> = (props) => {
    const {
        handleSubmit,
        register,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<clientForm>({
        resolver: zodResolver(ClientSchema),
    });

    const { clientTypes,cities } = props;

    async function onsubmit(data: clientForm) {
        try {
            await addClient(data);
        } catch (error) {
            console.error(error);
        }
    }

    function handleCityChange(selectedOption: any) {
        console.log('selected city', selectedOption);
        selectedOption ? setValue('cityId', selectedOption.id, { shouldValidate: true }) : setValue('cityId', null, { shouldValidate: true })
       
    }

    return (
        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onsubmit)}>

            <div className="max-w-md" id="select">
                <div className="flex items-center space-x-1">
                    <Label htmlFor="clientType" value="Select Client Type" />
                    <span className="text-red-500">*</span>
                </div>
                <Select
                    id="clientType"
                    {...register("clientTypeId")}
                >
                    {clientTypes.map((clientType: ClientType) => (
                        <option key={clientType.id} value={clientType.id}>
                            {clientType.name}
                        </option>
                    ))}
                </Select>
                {errors.clientTypeId && <p className="mt-2 text-sm text-red-600">{errors.clientTypeId.message}</p>}
            </div>

            <div>
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Name <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    {...register("name")}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="John Doe"
                />
                {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>}
            </div>

            <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Email
                </label>
                <input
                    // type="email"
                    {...register("email")}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                />
                {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>}
            </div>

            <div>
                <label htmlFor="contactNumber" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Contact Number <span className="text-red-500">*</span>
                </label>
                <input
                    type="tel"
                    {...register("contactNumber")}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="984566231"
                    maxLength={10}
                />
                {errors.contactNumber && <p className="mt-2 text-sm text-red-600">{errors.contactNumber.message}</p>}
            </div>

            <div className="max-w-lg">
                <label htmlFor="cityId">Select City <span className="text-red-500"> *</span></label>
                <SearchAbleSelect
                    id='client'
                    name='client'
                    options={cities}
                    getLabel={(option: any) => `${option.name}`}
                    getValue={(option: any) => `${option.id}`}
                    onChange={handleCityChange}
                >
                </SearchAbleSelect>
                {errors.cityId && <span className="text-red-500">{errors.cityId.message}</span>}
            </div>

            <div className="max-w-md" id="textarea">
                <div className="flex items-center space-x-1">
                    <Label htmlFor="address" value="Client's address" />
                    <span className="text-red-500">*</span>
                </div>
                <textarea
                    {...register("address")}
                    rows={4}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="123 Main St"
                />
                {errors.address && <p className="mt-2 text-sm text-red-600">{errors.address.message}</p>}
            </div>

            <Button
                size="xs"
                type="submit"
                isProcessing={isSubmitting}
                disabled={isSubmitting}
                className="w-full bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
                <p className="text-white font-medium text-sm">Add Client</p>
            </Button>
        </form>
    );
};

export default ClientForm;
