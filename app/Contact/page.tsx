import DefaultNavbar from "../components/DefaultNavbar";
import DefaultFooter from "../components/footer";
import Map from '../components/Map';


export default function page() {
    return (
        <div>
            <DefaultNavbar />
            <div className="container mx-auto ">
                <section className="bg-white dark:bg-gray-900">
                    <h1 className="text-primary-700 text-4xl font-bold text-center">Contact Us</h1>
                    <p className="text-primary-600 font-bold text-2xl mt-5 mb-5 text-center" >Feel free to reach out to us with any questions or inquiries.</p>
                    <div className="w-full px-10">
                        <Map />
                    </div>
                    <div className='text-center mt-10 flex  flex-wrap justify-center'>
                        <div className="mb-5 mx-4 ">
                            <h2 className="text-primary-700 font-bold mb-2">Suppport</h2>
                            <p className="text-primary">rjscoaters@gmail.com</p>
                        </div>

                        <div className="mb-5 mx-4  md:w-auto ">
                            <h2 className="text-primary-700 font-bold mb-2">Address</h2>
                            <p className="text-primary md:w-82 break-words">
                                RJS Coaters, Plot no.H-57, Additional MIDC Kudavali, Maharashtra
                            </p>
                        </div>

                        <div className="mx-4 ">
                            <h2 className="text-primary-700 font-bold mb-2">Phone</h2>
                            <p className="text-primary">+91 89835 37714</p>
                        </div>
                    </div>
                </section>

            </div>
            <DefaultFooter />

        </div>
    )
}