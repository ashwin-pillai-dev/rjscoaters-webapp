import DefaultNavbar from "../components/DefaultNavbar";
import DefaultFooter from "../components/footer";
import Image from "next/image";

export default function CompanyJourney() {
    // Storing the history data in an array makes it very easy to add new milestones later
    const milestones = [
        {
            era: "The Beginning",
            title: "Laying the Foundation",
            description: "Operating out of MIDC Kudavali, Maharashtra, RJS Coaters began as a dedicated small-scale manual powder coating unit. Our primary focus was solving industrial corrosion through meticulous manual processes. By prioritizing precision and customer trust over pure volume, we built a loyal client base ranging from local builders to heavy engineering firms.",
            image: "/about.test.jpeg",
        },
        {
            era: "Growth & Innovation",
            title: "Scaling Operations & Technology",
            description: "To meet the growing demands of modern industries, we upgraded our infrastructure. RJS Coaters integrated advanced electrostatic spray technology and thermal curing processes. This shift from manual to semi-automated systems allowed us to ensure maximum durability, uniform flawlessness, and strict quality control for high-volume orders.",
            image: "/our.approch.test.png", // Replace with an actual factory/machinery image if you have one
        },
        {
            era: "Looking Forward",
            title: "Digital Transformation",
            description: "A modern industrial company cannot rely on legacy systems alone. Today, RJS Coaters is moving towards complete digital transformation to enhance efficiency, track inventory, and monitor quality control in real-time. We are committed to using eco-friendly materials and smart tracking to drive industrial excellence.",
            image: "/our.vision.test.png",
        }
    ];

    return (
        <div className="bg-[#f4f5f7] min-h-screen font-sans">
            <DefaultNavbar />
            
            {/* Page Header */}
            <header className="bg-gray-900 text-white py-20 px-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-brand opacity-10 pointer-events-none"></div>
                <div className="container mx-auto max-w-5xl relative z-10 text-center">
                    <p className="text-brand font-bold tracking-widest uppercase mb-4 text-sm">
                        Our Heritage
                    </p>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
                        The RJS Coaters Journey
                    </h1>
                    <div className="w-24 h-1 bg-brand mx-auto mb-6"></div>
                    <p className="text-lg md:text-xl text-gray-300 font-light max-w-3xl mx-auto leading-relaxed">
                        From manual processes to digital transformation. Discover how we built a legacy of 
                        precision, protection, and performance in the surface finishing industry.
                    </p>
                </div>
            </header>

            {/* Timeline Section */}
            <main className="py-16 lg:py-24 px-4 container mx-auto max-w-5xl">
                <div className="relative">
                    
                    {/* The Vertical Line (Desktop only, hidden on mobile for better stacking) */}
                    <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-200"></div>

                    {/* Timeline Items */}
                    <div className="space-y-16 md:space-y-24">
                        {milestones.map((milestone, index) => {
                            // Alternate layout: Even indexes have text on the left, Odd have text on the right
                            const isEven = index % 2 === 0;

                            return (
                                <div key={index} className="relative flex flex-col md:flex-row items-center justify-between w-full group">
                                    
                                    {/* Center Timeline Node */}
                                    <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-brand rounded-full border-4 border-white shadow-md z-10 items-center justify-center transition-transform duration-300 group-hover:scale-125">
                                        <div className="w-2 h-2 bg-white rounded-full"></div>
                                    </div>

                                    {/* Text Content Block */}
                                    <div className={`w-full md:w-[45%] ${isEven ? 'md:pr-12 md:text-right' : 'md:pl-12 md:order-last'}`}>
                                        <div className="mb-8 md:mb-0">
                                            <span className="inline-block px-4 py-1 rounded-full bg-brand/10 text-brand font-bold text-xs tracking-widest uppercase mb-4">
                                                {milestone.era}
                                            </span>
                                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                                                {milestone.title}
                                            </h2>
                                            <p className="text-gray-600 leading-relaxed text-lg">
                                                {milestone.description}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Image Block */}
                                    <div className={`w-full md:w-[45%] ${isEven ? 'md:order-last' : ''}`}>
                                        <div className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden shadow-lg border border-gray-100">
                                            <Image
                                                src={milestone.image}
                                                alt={milestone.title}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                            {/* Subtle gradient overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </main>

            <DefaultFooter />
        </div>
    );
}