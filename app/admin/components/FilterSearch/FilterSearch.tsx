'use client'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
interface PropType {
    routeUrl: string,
    value: any
    placeholder: string,
    name:string
    options: any[],
}

export default function FilterSearch(props: PropType) {
    const router = useRouter();
    const { routeUrl, value, options, placeholder,name } = props;
    const [queryParams, setQueryParams] = useState<any>({});

    useEffect(() => {
        const url = new URL(routeUrl, 'http://localhost:3000'); 
        const params = Object.fromEntries(url.searchParams.entries());
        setQueryParams(params);
    }, [routeUrl]);


    const handleChange = (newValue: any) => {
        const newParams = { ...queryParams };

        if (newValue) {
            newParams[name] = newValue.id;
        } else {
            delete newParams[name];
        }

        const updatedUrl = `${routeUrl.split('?')[0]}?${new URLSearchParams(newParams).toString()}`;
        router.push(updatedUrl);
    };

    return (
        <>

            <Select
                defaultValue={value}
                isClearable
                isSearchable
                placeholder={placeholder}
                options={options}
                getOptionLabel={(option: any) => `${option.name}`}
                getOptionValue={(option: any) => `${option.id}`}
                className='w-full'
                onChange={(value) => {
                    handleChange(value)

                }
                }
            />

        </>
    );
};