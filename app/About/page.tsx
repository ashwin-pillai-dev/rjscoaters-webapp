import DefaultNavbar from "../components/DefaultNavbar"
import DefaultFooter from "../components/footer"
import Image from "next/image"
import CardLayout from "./CardLayout"

export default function page() {
    return (
        <div className="bg-[#f4f5f7] min-h-screen font-sans">
            <DefaultNavbar />

            <div className="container mx-auto px-4">
                {/* Hero Section / About Us */}
                <section className="bg-white rounded-b-xl shadow-sm overflow-hidden">
                    <div className="grid px-6 py-12 mx-auto lg:gap-12 lg:grid-cols-12 items-center">
                        <div className="lg:col-span-6 mb-8 lg:mb-0">
                            <h1 className="text-[#FF6A00] mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl">
                                <span className="text-black">RJS</span> Coaters
                            </h1>
                        </div>

                        <div className="lg:col-span-6">
                            <p className="text-[#FF6A00] font-bold mb-3 text-sm uppercase tracking-widest">
                                About us
                            </p>
                            <p className="max-w-2xl mb-6 font-light text-gray-600 md:text-lg lg:text-xl leading-relaxed">
                                RJS Coaters is a leading powder coating service provider based in MIDC Kudavali, Maharashtra.
                                We specialize in delivering high-quality surface finishing solutions for industrial metal components.
                                With a focus on durability, precision, and efficiency, we help businesses enhance the lifespan
                                and performance of their products.
                            </p>
                        </div>
                    </div>

                    {/* Feature Image */}
                    <div className="px-6 pb-12">
                        <div className="relative w-full h-[400px] lg:h-[500px]">
                            <Image
                                fill
                                className="object-cover rounded-lg shadow-md"
                                src="/about.test.jpeg"
                                alt="RJS Coaters Facility"
                                priority
                            />
                        </div>
                    </div>
                </section>

                {/* Our Journey Section */}
                <section className="py-16 lg:py-24">
                    <div className="max-w-screen-lg mx-auto">


                        {/* Card Layout Section */}
                        <div className="w-full mb-20">
                            <CardLayout />
                        </div>

                        {/* Closing Call to Action */}
                        <div className="bg-gray-900 text-white p-8 md:p-12 rounded-2xl relative overflow-hidden">
                            <div className="relative z-10">
                                <h2 className="mb-6 text-2xl md:text-3xl tracking-tight font-bold text-[#FF6A00]">
                                    Join Us in Building Stronger Surfaces
                                </h2>
                                <p className="mb-0 font-light text-gray-300 text-lg leading-relaxed">
                                    At RJS Coaters, we are not just providing coating services; we are delivering reliability,
                                    durability, and precision that industries depend on. Our commitment to quality, consistency,
                                    and performance reflects our dedication to supporting your industrial needs. As we continue
                                    to grow and embrace modern technologies, we invite you to partner with us in enhancing
                                    product strength and driving industrial excellence.
                                </p>
                            </div>
                            {/* Subtle decorative element */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF6A00] opacity-10 rounded-full -mr-16 -mt-16"></div>
                        </div>
                    </div>
                </section>
            </div>

            <DefaultFooter />
        </div>
    )
}