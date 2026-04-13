import DefaultNavbar from "../components/DefaultNavbar";
import DefaultFooter from "../components/footer";
import Image from "next/image";
import Link from "next/link";

export default function ServicesPage() {
    const benefits = [
        { title: "Superior Durability", desc: "Resists chipping, scratching, and fading far better than traditional liquid paint." },
        { title: "Corrosion Resistance", desc: "Creates an impenetrable barrier against moisture, chemicals, and extreme weather." },
        { title: "Eco-Friendly", desc: "Contains zero Volatile Organic Compounds (VOCs), making it safe for the environment." },
        { title: "Cost-Effective", desc: "High transfer efficiency and minimal waste reduce overall project costs." }
    ];

    return (
        <div className="bg-[#f4f5f7] min-h-screen font-sans">
            <DefaultNavbar />

            {/* Internal Page Hero */}
            <header className="relative bg-gray-900 py-24 px-4 overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-30">
                    <Image 
                        src="/close.up.adv.png" 
                        alt="Powder Coating Process" 
                        fill 
                        className="object-cover"
                        priority
                    />
                </div>
                <div className="relative z-10 max-w-screen-xl mx-auto text-center">
                    <p className="text-sm text-[#FF6A00] font-bold mb-4 tracking-widest uppercase">
                        Our Expertise
                    </p>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
                        Advanced Powder Coating
                    </h1>
                    <div className="w-20 h-1 bg-[#FF6A00] mx-auto mb-6"></div>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto font-light leading-relaxed">
                        We deliver high-performance surface protection designed to withstand the harshest industrial environments. Discover why powder coating is the superior choice for modern metal components.
                    </p>
                </div>
            </header>

            <main className="container mx-auto px-4 py-16 lg:py-24">
                
                {/* Two-Column Detail Section */}
                <section className="max-w-screen-xl mx-auto mb-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="relative h-[400px] lg:h-[500px] w-full rounded-xl overflow-hidden shadow-xl">
                        <Image 
                            src="/premium.powder.coating.png" 
                            alt="High Quality Finish" 
                            fill 
                            className="object-cover"
                        />
                        {/* Orange Accent Border */}
                        <div className="absolute inset-0 border-4 border-[#FF6A00]/20 rounded-xl pointer-events-none"></div>
                    </div>
                    
                    <div>
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                            Beyond Traditional Paint
                        </h2>
                        <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                            Unlike conventional liquid paint, which relies on evaporating solvents, powder coating is applied electrostatically as a dry powder and then cured under heat. This allows it to form a "skin" that is tougher, thicker, and much more resilient.
                        </p>
                        <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                            At RJS Coaters, we utilize state-of-the-art equipment to ensure uniform coverage, even on complex geometries, providing a flawless finish that enhances both the aesthetic and functional lifespan of your products.
                        </p>
                        
                        {/* Benefits Grid inside the column */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {benefits.map((benefit, idx) => (
                                <div key={idx} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 border-l-4 border-l-[#FF6A00]">
                                    <h4 className="font-bold text-gray-900 mb-2">{benefit.title}</h4>
                                    <p className="text-sm text-gray-500">{benefit.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Full Width CTA Banner */}
                {/* <section className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 max-w-screen-xl mx-auto">
                    <div className="flex flex-col md:flex-row items-center justify-between p-8 md:p-12">
                        <div className="mb-6 md:mb-0 md:mr-8 text-center md:text-left">
                            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                                Ready to protect your assets?
                            </h3>
                            <p className="text-gray-600 text-lg">
                                Contact our team to discuss your project requirements and get a custom quote.
                            </p>
                        </div>
                        <Link href="/contact" className="bg-[#FF6A00] text-white text-sm font-bold tracking-widest uppercase px-10 py-4 shadow-md hover:bg-gray-900 transition-colors duration-300 flex-shrink-0 text-center">
                            Request a Quote
                        </Link>
                    </div>
                </section> */}

            </main>

            <DefaultFooter />
        </div>
    );
}