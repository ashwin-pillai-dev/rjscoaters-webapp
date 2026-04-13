'use client';
import { Card } from 'flowbite-react';
import Image from 'next/image';

type Category = {
    name: string;
    src: string;
    desc: string;
    link: string;
};
type PropType = {
    category: Category
};

const CategoryCard: React.FC<PropType> = (props) => {
    const { category } = props;
    return (
        <Card >
            <a href={category.link}>
                <div className='flex flex-col justify-center'>
                    <div className='h-64 w-full relative'>
                        <Image alt='' fill={true} style={{objectFit:'contain'}} src={category.src} />
                    </div>
                    <div className=''>
                        <h5 className="text-2xl text-center font-bold tracking-tight text-primary-700 dark:text-white">
                            {category.name}
                        </h5>
                    </div>

                </div>
            </a>
            {/* <p className="font-normal text-center text-gray-700 dark:text-gray-400">
                {category.desc}
            </p> */}
        </Card>
    )
}

export default CategoryCard;


