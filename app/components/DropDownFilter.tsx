'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import Select from 'react-select';

export default function DropDownFilter({ options,field,placeholder }:{options:any,field:string,placeholder:string}) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const [selectedValue,setSelectedValue] = useState<string>(searchParams.has(placeholder.toLowerCase())?searchParams.get(placeholder.toLowerCase()):'');
    const defaultOption = selectedValue?options.find(option => option[field] ==selectedValue ):null;

    useEffect(() => {
        const params = new URLSearchParams(searchParams);
        if (selectedValue) {            
            params.set(placeholder.toLowerCase(),selectedValue)
            replace(`${pathname}?${params.toString()}`);
        }
        else{
            params.delete(placeholder.toLowerCase());
            replace(`${pathname}?${params.toString()}`);
        }
    }, [selectedValue, replace]);

    return (
        <div className="w-full md:w-1/2 flex items-center bg-red-100">
            <Select
                isClearable={true}
                options={options}
                getOptionLabel={(option: any) => option.name}
                getOptionValue={(option: any) => option.id}
                onChange={(option)=>{option?setSelectedValue(option[field]):setSelectedValue('')}}
                className='w-full'
                placeholder={placeholder}
                defaultValue={defaultOption}
            />
        </div>

    )
}
