import DefaultNavbar from "../components/DefaultNavbar";
import DefaultFooter from "../components/footer";
import Image from "next/image";

export default function page() {
    return (
        <div>
            <DefaultNavbar />
            <div className="container mx-auto">
                <section className="dark:bg-gray-900">
                    <div className="md:grid md:grid-cols-2 justify-between   py-10 ">
                        {/* Product 1 */}
                        <div className="md:order-1  p-4">
                            <h2 className="text-xl font-medium mb-4 text-gray-600">OJUSET CAPSULE</h2>
                            <h1 className="text-4xl font-bold mb-4 font-serif text-primary-700">Revitalize Your Intimate Relationships</h1>

                            <p className="text-primary-600 mb-6">
                                Intimacy plays a vital role in maintaining a fulfilling relationship. We understand that sexual health can sometimes face challenges due to various factors, such as stress, age, or lifestyle.
                            </p>
                            <p className="text-primary-600">
                                Our line of Ayurvedic products for sexual enhancement is formulated to address these concerns naturally.
                                Using traditional herbs and ingredients known for their aphrodisiac properties, our products can help improve stamina, vitality, and overall sexual performance.
                                Rediscover the joy of intimate moments with our safe and effective solutions.
                            </p>
                        </div>

                        <div className="md:order-2 justify-self-center shadow">
                            <Image
                                src="/ojuest-insta-banner.jpg"
                                alt="Kurol Tablet"
                                width={400}
                                height={300}
                                className="rounded-lg"
                            />
                        </div>
                    </div>

                    <section className="bg-white dark:bg-gray-900">
                        <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
                            <div className="max-w-screen-md mb-8 lg:mb-16">
                                <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-primary-700 dark:text-white">Harnessing the Power of Ayurveda</h2>
                                <p className="text-gray-500 sm:text-xl dark:text-gray-400">Intimacy is an essential aspect of a fulfilling relationship, and at Ayur Arogyam, we understand the importance of sexual health. Introducing our flagship product, Ojuset –the natural solution for enhancing your intimate experiences.</p>
                            </div>
                            <div className="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
                                <div>
                                    <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                                        <svg className="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                                    </div>
                                    <h3 className="mb-2 text-xl text-primary-700 font-bold dark:text-white">Improve Stamina and Vitality</h3>
                                    <p className="text-gray-500 dark:text-gray-400">
                                        Ojuset is formulated to help you regain your youthful energy and vitality. By stimulating blood flow
                                        and promoting hormonal balance, our unique blend of ingredients can support increased stamina and
                                        endurance.
                                        Experience longer-lasting intimate moments and elevate your overall sexual performance.
                                    </p>
                                </div>
                                <div>
                                    <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                                        <svg className="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"></path></svg>
                                    </div>
                                    <h3 className="mb-2 text-xl font-bold text-primary-700 dark:text-white">Enhance Sensitivity and Pleasure</h3>
                                    <p className="text-gray-500 dark:text-gray-400">
                                        Ojuset works holistically to enhance your sensual experience.
                                        It heightens sensitivity, intensifies pleasure, and promotes a deeper connection with your partner.
                                        Our natural ingredients help create a harmonious balance between mind and body, paving the way for
                                        enhanced pleasure and intimate satisfaction.
                                    </p>
                                </div>
                                <div>
                                    <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                                        <svg className="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd"></path><path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z"></path></svg>
                                    </div>
                                    <h3 className="mb-2 text-xl font-bold dark:text-white text-primary-700 ">Safe and Effective</h3>
                                    <p className="text-gray-500 dark:text-gray-400">
                                        At Ayur-Arogyam, your well-being is our top priority. Ojuset is crafted using the finest quality
                                        herbs and ingredients, carefully sourced and manufactured under strict quality control standards.
                                        Our product is free from harmful chemicals, additives, and artificial substances, ensuring a safe
                                        and effective solution for your sexual enhancement needs.

                                    </p>
                                </div>

                            </div>
                        </div>
                    </section>

                    <div className="md:grid md:grid-cols-2 justify-between mt-20">

                        {/* Product 2 */}
                        <div className="md:order-2 bg-blue">
                            <h2 className="text-xl text-primary-700 font-bold mb-4">KUROL</h2>
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
                                src="/kurol-insta.jpg"
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