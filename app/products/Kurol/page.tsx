import DefaultNavbar from "../../components/DefaultNavbar";
import DefaultFooter from "../../components/footer";
import Image from "next/image";

export default function page() {
    return (
        <div>
            <DefaultNavbar />
            <div className="container mx-auto">
                <section className="dark:bg-gray-900">
                    <div className="md:grid md:grid-cols-2 justify-between mt-20">

                        {/* Product 2 */}
                        <div className="md:order-2 bg-blue">
                            <h2 className="text-5xl text-primary-700 font-bold mb-4">KUROL</h2>
                            <h1 className="text-4xl text-primary-700 font-bold mb-4">Relieve the Discomfort of Piles</h1>

                            <p className="text-gray-600 mb-4">
                                If you're struggling with the discomfort and pain caused by piles, Kurol is here to provide you with much-needed relief. Kurol is an Ayurvedic tablet specially formulated to address the symptoms of piles and provide effective relief naturally.
                                Embrace the Power of Ayurveda
                                Ayurveda, the ancient Indian system of medicine, has a long history of providing natural solutions for various health concerns, including piles. Kurol draws upon the wisdom of Ayurveda and combines traditional herbs and natural ingredients known for their soothing and healing properties.
                            </p>

                            <h3 className="text-xl text-primary-700 font-bold mb-4">Experience the Effectiveness of Kurol</h3>
                            <p className="text-gray-600 mb-4">
                                Kurol's effectiveness lies in its carefully chosen ingredients, each of 
                                which plays a specific role in providing relief from piles. With regular 
                                use, Kurol aids in reducing pain, discomfort, and itching, allowing you to
                                 go about your daily activities with greater ease and comfort.
                            </p>

                        </div>
                        <div className="md:order-1 justify-self-center">
                            <Image
                                src="/kurol-banner.jpg"
                                alt="Kurol Tablet"
                                width={400}
                                height={300}
                                className="rounded-lg"
                            />
                        </div>
                    </div>


                </section>
{/* 
                <section className="bg-white dark:bg-gray-900">
                        <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
                            <div className="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 justify-self-center md:gap-12 md:space-y-0">
                                <div>
                                    <div className="flex justify-center items-center mb-4 w-10 h-10  rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                                        <svg className="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                                    </div>
                                    <h3 className="mb-2 text-xl text-primary-700 font-bold dark:text-white">Natural and Safe Solution</h3>
                                    <p className="text-gray-500 dark:text-gray-400">
                                    Kurol is a natural and safe solution for piles, free from harmful chemicals or additives. As an Ayurvedic tablet, it offers a holistic approach to healing, promoting overall rectal health and well-being.
                                    </p>
                                </div>
                                <div>
                                    <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                                        <svg className="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"></path></svg>
                                    </div>
                                    <h3 className="mb-2 text-xl font-bold text-primary-700 dark:text-white">Take Control of Your Well-being with Kurol  </h3>
                                    <p className="text-gray-500 dark:text-gray-400">
                                    Say goodbye to the discomfort and pain caused by piles and embrace a natural path to relief with Kurol. Experience the gentle yet effective benefits of Ayurveda as Kurol supports your journey to a healthier and more comfortable life.
                                    </p>
                                </div>


                            </div>
                        </div>
                    </section> */}

            </div>
            <DefaultFooter />

        </div>
    )
}