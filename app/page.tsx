import Image from 'next/image';
import Link from 'next/link';
import DefaultNavbar from './components/DefaultNavbar';
import DefaultFooter from './components/footer';

export default function Home() {
  const SERVICES = [
    { title: 'Precision Surface Preparation', desc: 'We begin by cleaning and preparing metal surfaces to remove impurities, ensuring maximum coating adhesion and long-lasting results.', src: '/surface.preparation.png' },
    { title: 'Advanced Powder Coating', desc: 'Using electrostatic spray technology, we apply a uniform powder coating layer that ensures durability, corrosion resistance, and a flawless finish.', src: '/surface.coating.png ' },
    { title: 'Rigorous Quality Inspection', desc: 'Every product undergoes strict quality checks to ensure consistency, strength, and a premium finish before delivery.', src: '/surface.insecption.png' },
  ];

  const CLIENTS = [
    "TechCorp Builders", "Global Infrastructure", "Prime Real Estate", "AquaTech Systems",
    "Urban Developments", "Metro Planners", "Apex Engineering", "SteelCore Ltd."
  ];

  const COLLAGE_IMAGES = [
    '/premium.powder.coating.png', '/close.up.adv.png', '/corrosion.png', '/Hero section.png',
    '/service5.png', '/service6.png', '/largescale.png', '/service7.png'
  ];

  return (
    <div className="font-sans text-gray-900 bg-[#f4f5f7]">
      <DefaultNavbar />

      {/* Inline Styles for Left-to-Right Marquee */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes marqueeLtr {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0%); }
        }
        .animate-marquee-ltr {
          display: flex;
          width: 200%;
          animation: marqueeLtr 25s linear infinite;
        }
        .marquee-item {
          flex: 1;
          display: flex;
          justify-content: space-around;
          align-items: center;
        }
      `}} />


      {/* Hero Section: Our Story */}
      <section className="relative w-full h-[600px] lg:h-[700px] flex items-center">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/about.full.png"
            alt="Construction Vision"
            layout="fill"
            objectFit="cover"
            quality={100}
            priority
          />
          {/* Dark gradient overlay to make the text pop */}
          <div className="absolute inset-0 bg-gray-900/60 mix-blend-multiply"></div>
        </div>

        {/* Content Layer */}
        <div className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            <p className="text-sm text-[#FF6A00] font-bold mb-4 tracking-widest uppercase">
              Welcome to RJS Coaters,
            </p>
            <h1 className="text-4xl lg:text-5xl font-semibold text-white mb-6 leading-tight">
              Coating Innovation for Modern Industries
            </h1>
            <p className="text-gray-200 mb-8 leading-relaxed text-lg">
              where industrial expertise meets advanced coating technology Our core focus is powder coating, a high-performance solution that ensures superior surface protection, corrosion resistance, and enhanced product longevity for metal components.
            </p>
            <Link href="/About">
              <button className="bg-[#FF6A00] text-white text-xs font-bold tracking-widest uppercase px-8 py-4 shadow-md hover:bg-white hover:text-gray-900 transition-colors duration-300">
                READ MORE
              </button>
            </Link>
          </div>
        </div>
      </section>
      {/* Client Marquee Section (Flows Left to Right) */}
      <section className="bg-white py-10 border-b border-t border-gray-200 overflow-hidden">
        <h3 className="text-center text-sm font-bold text-[#FF6A00] uppercase tracking-widest mb-8">Our Trusted Clients</h3>
        <div className="animate-marquee-ltr">
          {/* First set of items */}
          <div className="marquee-item space-x-8 px-4">
            {CLIENTS.map((client, index) => (
              <span key={index} className="text-xl font-bold text-gray-300 hover:text-gray-400 transition-colors cursor-default whitespace-nowrap">{client}</span>
            ))}
          </div>
          {/* Duplicated set for seamless loop */}
          <div className="marquee-item space-x-8 px-4">
            {CLIENTS.map((client, index) => (
              <span key={`dup-${index}`} className="text-xl font-bold text-gray-300 hover:text-gray-400 transition-colors cursor-default whitespace-nowrap">{client}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* --- UPDATED HEADER SECTION --- */}
          <div className="flex justify-between items-end mb-10">

            {/* Grouping the titles in a column so they stack */}
            <div className="flex flex-col">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                How Our Coating Process Works !
              </h2>
              {/* Styled as a subscript/subtitle and colored orange */}
              <p className="text-[#FF6A00] text-base lg:text-lg font-calibri mt-1">
                Precision. Protection. Performance.
              </p>
            </div>

            <div className="flex space-x-2">
              <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-[#FF6A00] hover:text-white hover:border-[#FF6A00] transition-colors duration-200">&larr;</button>
              <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-[#FF6A00] hover:text-white hover:border-[#FF6A00] transition-colors duration-200">&rarr;</button>
            </div>
          </div>
          {/* ------------------------------ */}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SERVICES.map((service, idx) => (
              <div key={idx} className="flex flex-col border border-gray-100 bg-white hover:shadow-lg transition-shadow duration-300 group">
                <div className="relative h-64 w-full bg-gray-200 overflow-hidden">
                  <Image
                    src={service.src}
                    alt={service.title}
                    layout="fill"
                    objectFit="cover"
                    className="group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-[#FF6A00] transition-colors duration-200">{service.title}</h3>
                  <p className="text-sm text-gray-500 mb-6 min-h-[40px]">{service.desc}</p>
                  {/* <button className="bg-[#f0f2f5] text-[10px] font-bold tracking-widest uppercase text-gray-700 px-4 py-2 hover:bg-[#FF6A00] hover:text-white transition-colors duration-300">
              READ MORE
            </button> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones Section */}
      <section className="bg-white py-16 lg:py-24 border-t border-gray-100">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="max-w-md">
            <p className="text-sm text-[#FF6A00] font-bold mb-4 tracking-widest uppercase">Our Core Services</p>
            <h2 className="text-4xl font-semibold text-gray-900 mb-6 leading-tight">
              Superior Finishes for Every Industry
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Explore our comprehensive range of high-quality finishing services, including advanced powder coating, precise liquid painting, professional blasting, and specialized wood finishes tailored to your industrial needs.
            </p>
            <Link href={'/services'}>
              <button className="bg-gray-900 text-white text-xs font-bold tracking-widest uppercase px-8 py-4 hover:bg-[#FF6A00] shadow-md transition-colors duration-300">
                EXPLORE OUR SERVICES
              </button>
            </Link>

          </div>

          {/* Image Collage Grid */}
          <div className="grid grid-cols-3 gap-2">
            {COLLAGE_IMAGES.map((imgSrc, idx) => (
              <div
                key={idx}
                className={`relative bg-gray-200 w-full overflow-hidden ${idx === 4 || idx === 7 ? 'row-span-2 h-64' : 'h-32'}`}
              >
                <Image
                  src={imgSrc}
                  alt={`Project ${idx}`}
                  layout="fill"
                  objectFit="cover"
                  className="hover:scale-110 transition-transform duration-500 cursor-pointer"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Timeline Line */}
        <div className="max-w-screen-xl mx-auto px-4 mt-12 flex items-center justify-between text-sm font-bold text-[#FF6A00]">
          <span></span>
          <div className="flex-1 border-t-2 border-dashed border-gray-200 mx-4 relative">
            {/* Optional: Add a small decorative dot to the timeline */}
            <div className="absolute top-[-5px] left-1/2 w-2 h-2 bg-[#FF6A00] rounded-full transform -translate-x-1/2"></div>
          </div>
          <span></span>
        </div>
      </section>

      <DefaultFooter />
    </div>
  )
}