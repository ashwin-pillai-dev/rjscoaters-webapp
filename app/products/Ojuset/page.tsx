import DefaultNavbar from "../../components/DefaultNavbar";
import DefaultFooter from "../../components/footer";
import Image from "next/image";
import BenefitCard from "./components/BenefitCard";


export default function page() {
    const BENEFITS = [
        {
            image: '/muscle-fitness.png',
            title: 'Lifesyle & Fitness',
            link: '/Products/Ojuset/benefits/1'
        },

        {
            image: '/sexual.png',
            title: 'Sexual Wellness',
            link: '/Products/Ojuset/benefits/2'
        },

        {
            image: '/old-man.png',
            title: 'Geriatrics - Care for elderly',
            link: '/Products/Ojuset/benefits/3'
        },
        {
            image: '/weakened.png',
            title: 'Ageless Wellness Companion',
            link: '/Products/Ojuset/benefits/4'
        },
    ]
    return (
        <div>
            <DefaultNavbar />
            <div className="container mx-auto">

                <section className="dark:bg-gray-900 mt-10">


                    <div>
                        {/* Sex booster */}
                        <h2 className="text-4xl  text-gray-600 pb-4">OJUSET CAPSULE</h2>

                        <div className="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-12 md:space-y-0 mb-4 mt-2">
                            {
                                BENEFITS.map((benefit, index) => {
                                    return <BenefitCard title={benefit.title} image={benefit.image} link={benefit.link} key={index} />
                                })
                            }


                        </div>

                        <div className="md:grid md:grid-cols-2 justify-between">


                            <div className="md:order-1 p-4 ">
                                {/* <h2 className="text-4xl  text-gray-600 pb-4">OJUSET CAPSULE</h2>

                                <div className="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-12 md:space-y-0">
                                    {
                                        BENEFITS.map((benefit, index) => {
                                            return <BenefitCard title={benefit.title} image={benefit.image} link={benefit.link} key={index} />
                                        })
                                    }


                                </div> */}


                                <div className=" flex flex-col h-full justify-around">

                                    <div className="">
                                        <h1 className="text-4xl font-bold mb-4 font-serif text-primary-700">Welcome to Ojuset Capsule: Your Path to Total Wellness</h1>

                                        <p className="text-primary-600 mb-6">
                                            At Ayur Arogyam, we believe that wellness is not just an absence of illness, but a state of vitality and balance that allows you to live life to the fullest. With this philosophy at heart, we introduce you to Ojuset Capsule, a total wellness product that encompasses the essence of health, vitality, and rejuvenation.                                        </p>
                                        {/* <p className="text-primary-600">
                                            Our line of Ayurvedic products for sexual enhancement is formulated to address these concerns naturally.
                                            Using traditional herbs and ingredients known for their aphrodisiac properties, our products can help improve stamina, vitality, and overall sexual performance.
                                            Rediscover the joy of intimate moments with our safe and effective solutions.
                                        </p> */}

                                    </div>

                                    <div className="lg:mb-16">
                                        <h2 className="mb-4 text-4xl font-bold mb-4 font-serif text-primary-700 dark:text-white">Boosting Stamina, Elevating Energy:</h2>
                                        <p className="text-primary-600">
                                            Ojuset Capsule is your steadfast companion in the quest for boundless energy and unwavering stamina. Whether you're striving for peak performance at the gym, seeking to regain your vitality with age, or simply looking to infuse your days with vigor, Ojuset Capsule is here to empower you.
                                        </p>
                                    </div>

                                </div>

                            </div>

                            <div className="md:order-2  flex justify-center p-5 md:p-0  justify-self-center self-center">
                                <Image
                                    src="/PUNARJITH- OJUSET Capsules.jpg"
                                    alt="Kurol Tablet"
                                    width={400}
                                    height={300}
                                    className="rounded-lg"
                                />
                            </div>
                        </div>

                        {/* <section className="bg-white dark:bg-gray-900">
                            <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">

                                <div className="w-full  flex  justify-center">
                                    <h2 className="text-4xl self-center   font-bold mb-4 font-serif text-primary-700 dark:text-white">Benefits of Ojuset</h2>

                                </div>



                            </div>
                        </section> */}
                    </div>



                </section>

            </div>
            <DefaultFooter />

        </div>
    )
}