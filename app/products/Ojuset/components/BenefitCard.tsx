import Image from "next/image";

export default function BenefitCard(props: any) {
    const { image, title, link } = props;

    return (
        // <div>
        //     <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
        //         <svg className="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
        //     </div>
        //     <h3 className="mb-2 text-xl text-primary-700 font-bold dark:text-white">{title}</h3>
        //     <p className="text-gray-500 dark:text-gray-400">{desc}</p>
        // </div>
        <a href={link} className="text-center text-gray-500 dark:text-gray-400">
            <div className="mx-auto mb-3 w-14 h-14 rounded-full bg-primary-600 flex items-center justify-center">
                    <Image height={80} width={80} src={image}className="w-6 h-6" alt={image}/>

            </div>

            <h3 className="mb-1 underline  underline-offset-2 text-medium font-bold tracking-tight text-gray-700 dark:text-white">
                {title}
            </h3>
        </a>
    );


}