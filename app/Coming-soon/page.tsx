import DefaultNavbar from "../components/DefaultNavbar";
import DefaultFooter from "../components/footer";
import Image from "next/image";

export default function ComingSooon() {
    return (
        <div className="container">
            <DefaultNavbar />
            <section className="bg-white dark:bg-gray-900">
                <div className="grid max-w-screen-xl px-4 py-4 mx-auto lg:gap-8 xl:gap-0 lg:py-8 lg:grid-cols-12">
                    <div className="mx-auto place-self-center lg:col-span-7">
                        <h1 className="max-w-2xl text-center text-primary-700 mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">COMING SOON</h1>
                        <p className="max-w-2xl text-center mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">Work in progress</p>

                    </div>
                    <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
                        <Image
                            src="/coming-soon.jpg"
                            alt="coming soon"
                            width={500}
                            height={400}
                        />
                    </div>
                </div>
            </section>
            <DefaultFooter />

        </div>

    )

}