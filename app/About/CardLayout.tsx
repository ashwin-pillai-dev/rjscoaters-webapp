import React from 'react';
import Image from 'next/image';

const CardLayout = () => {
    return (
        <div className="xs:flex-col md:flex justify-center">
            {/* Left card */}
            <div className="md:w-1/3 p-4 mt-8">
                <div className="bg-gray-300 shadow  rounded-lg flex flex-col items-center justify-center">
                    <div className="relative w-full h-52 mb-4 rounded-lg overflow-hidden">
                        <Image
                            src="/our.approch.test.png"
                            alt="Image"
                            fill={true}
                            style={{ objectFit: "cover" }}
                        />
                    </div>
                    <h3 className="text-primary-700 text-xl font-bold">Our Approach</h3>
                    <p className="text-gray-600 text-center text-base px-2 pb-3">
                        Our approach is based on precision and consistency, following a structured process that includes surface preparation, advanced powder coating, and strict quality inspection to ensure durable and high-performance results.
                    </p>
                </div>
            </div>
            {/* Center card */}
            <div className="md:w-1/3 p-4">
                <div className="bg-gray-300 shadow  rounded-lg flex flex-col items-center justify-center">
                    <div className="relative w-full h-52 mb-4 rounded-lg overflow-hidden">
                        <Image
                            src="/our.vision.test.png"
                            alt="Image"
                            fill={true}
                            style={{ objectFit: "cover" }}
                        />
                    </div>
                    <h3 className="text-primary-700 text-xl text-center font-bold">Our Vision</h3>
                    <p className="text-gray-600  text-center text-base px-2 pb-3">
                       Our vision is to become a trusted, digitally empowered leader in the powder coating industry by integrating modern technology with operational excellence.
                    </p>
                </div>
            </div>
            {/* Right card */}
            <div className="md:w-1/3 p-4 mt-8">
                <div className="bg-gray-300 shadow  rounded-lg flex flex-col items-center justify-center">
                    <div className="relative w-full h-52 mb-4 rounded-lg overflow-hidden">
                        <Image
                            src="/our.commitment.test.png"
                            alt="Image"
                            fill={true}
                            style={{ objectFit: "cover" }}
                        />
                    </div>
                    <h3 className="text-primary-700  text-center text-xl font-bold">Our Commitment</h3>
                    <p className="text-gray-600  text-center pb-3">
                       Our commitment is to maintain high standards of quality, reliability, and customer satisfaction. We strive to deliver long-lasting coating solutions while adopting innovative practices that improve productivity, reduce errors, and support sustainable industrial growth.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CardLayout;
